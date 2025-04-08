import { useSupabaseStore } from "components/Supabase/stores/Supabase.store";
import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

interface Props {
  supabaseUrl: string;
  supabaseKey: string;
  children: React.ReactNode;
}

export const SupabaseContext = (props: Props) => {
  const url = useSupabaseStore((state) => state.url);
  const key = useSupabaseStore((state) => state.key);
  const supabase = useSupabaseStore((state) => state.supabase);
  const setUrl = useSupabaseStore((state) => state.setUrl);
  const setKey = useSupabaseStore((state) => state.setKey);
  const setSupabase = useSupabaseStore((state) => state.setSupabase);
  const reset = useSupabaseStore((state) => state.reset);

  useEffect(() => {
    if (!props.supabaseUrl || !props.supabaseKey) return;

    setUrl(props.supabaseUrl);
    setKey(props.supabaseKey);
    setSupabase(createClient(props.supabaseUrl, props.supabaseKey));

    return () => reset();
  }, [props.supabaseUrl, props.supabaseKey]);

  if (!url || !key || !supabase) return;

  return props.children;
};
