import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ISupabaseQuery } from "components/Supabase/interfaces/ISupabaseQuery";
import dayjs from "dayjs";
import { useSupabaseStore } from "components/Supabase/stores/Supabase.store";

interface IProps {
  collectionPath?: string;
  documentPath?: string;
  queries?: ISupabaseQuery[];
  loadData?: boolean;
}

export const useSupabaseData = ({
  collectionPath,
  documentPath,
  queries = [],
  loadData = false
}: IProps = {}, deps: any[] = []) => {
  const [session, setSession] = useState<string>(uuidv4());
  const supabase = useSupabaseStore((state) => state.supabase);
  const [docs, setDocs] = useState([]);
  const [docListener, setDocListener] = useState<any>();
  const [isLoading, setIsLoading] = useState(loadData);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  const buildQuery = (query, queries: ISupabaseQuery[]) => {
    queries.forEach(({ type, field, operator, value, direction, limit }) => {
      if (!type) return;

      switch (type) {
        case 'where':
          if (operator === 'in' && Array.isArray(value)) {
            query = query.in(field, value);
          } else if (field && operator) {
            query = query.filter(field, operator, value);
          }
          break;
        case 'orderBy':
          if (field && direction) {
            query = query.order(field, { ascending: direction === 'asc' });
          }
          break;
        case 'limit':
          if (limit) {
            query = query.limit(limit);
          }
          break;
        case 'startAfter':
          if (value) {
            query = query.range(value, limit || 20); // Manejo básico para paginación
          }
          break;
        default:
          break;
      }
    });
    return query;
  };

  const getReference = (path: string) => path;

  const docWithId = async (path: string, id: string): Promise<any> => {
    if (!path || !id) return null;

    const { data, error } = await supabase
      .from(path)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching document with id=${id}: ${error.message}`);
      return null;
    }

    return data;
  };

  const getCollection = async (otherPath?: string, otherQueries?: ISupabaseQuery[]): Promise<any> => {
    try {
      const currentPath = otherPath || collectionPath;
      const currentQueries = otherQueries || queries;

      let query = supabase.from(currentPath).select('*');
      if (currentQueries) {
        query = buildQuery(query, currentQueries);
      }

      const { data, error } = await query;
      if (error) {
        console.error(`Error fetching collection: ${error.message}`);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Unexpected error fetching collection:', error);
      return [];
    }
  };

  const countCollection = async (queries: ISupabaseQuery[] = [], otherPath?: string): Promise<number> => {
    const path = otherPath || collectionPath;
    let query = supabase.from(path).select('*', { count: 'exact', head: true });

    if (queries) {
      query = buildQuery(query, queries);
    }

    const { count, error } = await query;

    if (error) {
      console.error(`Error counting collection: ${error.message}`);
      return 0;
    }

    return count ?? 0;
  };

  const fetchInitialData = async (otherPath?: string, otherQueries: ISupabaseQuery[] = []) => {
    const path = otherPath || collectionPath;
    const currentQueries = otherQueries.length ? otherQueries : queries;

    try {
      setIsLoading(true);

      let query = supabase.from(path).select('*');
      if (currentQueries) {
        query = buildQuery(query, currentQueries);
      }

      const { data, error } = await query;
      if (error) {
        console.error(`Error fetching initial data: ${error.message}`);
        return;
      }

      const arrayData = data || [];

      if (arrayData !== docs) setDocs(arrayData);
    } catch (error) {
      console.error('Unexpected error fetching initial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInitialDocument = async (otherDocumentPath?: string) => {
    setIsLoading(true);

    const [path, id] = otherDocumentPath ? otherDocumentPath.split('/') : documentPath.split('/');

    if (!path || !id) {
      console.error('Invalid document path');
      return;
    }

    const data = await docWithId(path, id);

    setDocListener(data || {});

    setIsLoading(false);
  };

  const set = async (id: string, data: any, newCollectionPath?: string) => {
    const collection = newCollectionPath || collectionPath;
    const { data: responseData, error } = await supabase.from(collection).upsert({ id, ...data });
    if (error) {
      console.error(`Error setting document: ${error.message}`);
    }
    return responseData;
  };

  const add = async (data: any, newCollectionPath?: string) => {
    const collection = newCollectionPath || collectionPath;
    const { data: responseData, error } = await supabase.from(collection).insert({
      createdAt: dayjs().valueOf(),
      updatedAt: dayjs().valueOf(),
      trash: false,
      ...data
    }).select();

    if (error) {
      console.error(`Error adding document: ${error.message}`);
    }

    return responseData[0];
  };

  const update = async (id: string, data: any, path?: string) => {
    const collection = path || collectionPath;
    delete data['id'];

    const { data: responseData, error } = await supabase.from(collection).update({
      ...data,
      updatedAt: dayjs().valueOf()
    }).eq('id', id).select();

    if (error) {
      console.error(`Error updating document: ${error.message}`);
    }
    return responseData[0];
  };

  const trash = async (id: string, path?: string) => {
    const collection = path || collectionPath;
    const { data: responseData, error } = await supabase.from(collection).update({
      trash: true,
      deletedAt: dayjs().valueOf()
    }).eq('id', id);
    if (error) {
      console.error(`Error trashing document: ${error.message}`);
    }
    return responseData;
  };

  const subscribeToCollection = async (otherDocumentPath?: string, otherQueries: ISupabaseQuery[] = []) => {
    const path = otherDocumentPath || collectionPath;
    const currentQueries = otherQueries.length ? otherQueries : queries;

    await fetchInitialData(path, currentQueries);

    subscriptions.forEach((sub) => sub.unsubscribe());
    setSubscriptions([]);

    const channel = supabase
      .channel(`realtime:collection:${path}:${session}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: path }, (payload) => {
        setDocs((prevDocs) => {
          if (payload.eventType === 'INSERT' && matchesFilters(payload.new, currentQueries)) {
            return [...prevDocs, payload.new];
          }

          if (payload.eventType !== 'UPDATE') return prevDocs;

          if (payload.new.trash || !matchesFilters(payload.new, currentQueries)) {
            return prevDocs.filter((doc) => doc.id !== payload.new.id);
          }

          return prevDocs.map((doc) => (doc.id === payload.new.id ? payload.new : doc));
        });
      })
      .subscribe();

    setSubscriptions((prev) => [...prev, channel]);
  };

  const matchesFilters = (doc: any, queries: ISupabaseQuery[]) => {
    return queries.every(({ field, operator, value }) => {
      switch (operator) {
        case 'eq':
          return doc[field] == value;
        default:
          return true;
      }
    });
  };

  const subscribeToDocument = async (otherDocumentPath?: string) => {
    await fetchInitialDocument(otherDocumentPath);

    const [path, id] = otherDocumentPath
      ? otherDocumentPath.split('/')
      : documentPath.split('/');

    subscriptions.forEach((sub) => sub.unsubscribe());
    setSubscriptions([]);

    const channel = supabase
      .channel(`realtime:document:${path}:${id}:${session}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: path, filter: `id=eq.${id}` },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setDocListener((prev) => ({ ...prev, ...payload.new }));
          }
        }
      )
      .subscribe();

    setSubscriptions((prev) => [...prev, channel]);
  };

  const unsubscribeAll = () => {
    subscriptions.forEach((channel) => {
      channel.unsubscribe();
    });
    setSubscriptions([]);
  };

  const uploadFile = async (file: File, path: string = ''): Promise<string> => {
    const uniqueName = `${uuidv4()}-${file.name}`;
    const fullPath = `${path}/${uniqueName}`;

    const { data, error } = await supabase.storage.from('files').upload(fullPath, file);

    if (error) {
      console.error(`Error uploading file: ${error.message}`);
      return '';
    }

    const { data: { publicUrl } } = supabase.storage.from('files').getPublicUrl(data.path);

    return publicUrl;
  };

  const getFileBlob = async (path: string) => {
    const { data, error } = await supabase.storage.from('files').download(path);
    if (error) {
      console.error(`Error fetching file blob: ${error.message}`);
      return null;
    }
    return data;
  };

  const deleteFile = async (path: string) => {
    const { error } = await supabase.storage.from('files').remove([path]);
    if (error) {
      console.error(`Error deleting file: ${error.message}`);
    }
  };

  const getFilesInDirectory = async (directoryPath: string) => {
    try {
      const { data, error } = await supabase.storage.from('files').list(directoryPath);

      if (error) {
        console.error(`Error fetching files from directory ${directoryPath}: ${error.message}`);
        return [];
      }

      return data.map((file) => {
        const { data: { publicUrl } } = supabase.storage.from('files').getPublicUrl(`${directoryPath}/${file.name}`);
        return {
          ...file,
          publicUrl: publicUrl
        };
      });
    } catch (error) {
      console.error('Unexpected error fetching files from directory:', error);
      return [];
    }
  };

  useEffect(() => {
    if (!loadData) return;

    if (collectionPath) {
      subscribeToCollection();
    }
    if (documentPath) {
      subscribeToDocument();
    }

    return () => {
      if ((collectionPath || documentPath) && loadData) {
        unsubscribeAll();
        setSession(uuidv4());
      }
    };
  }, [collectionPath, documentPath, loadData, ...deps]);

  return {
    add,
    set,
    update,
    trash,
    docs: docs || [],
    docListener,
    isLoading,
    subscribeToCollection,
    subscribeToDocument,
    unsubscribeAll,
    uploadFile,
    getFileBlob,
    deleteFile,
    getReference,
    docWithId,
    getFilesInDirectory,
    getCollection,
    countCollection
  };
};
