import { useMemo, useState } from "react";

export const useSearchFilter = (data: any[]) => {
  const [search, setSearch] = useState<string>('');

  const searchInObject = (obj: any, keywords: string[]): boolean => {
    if (typeof obj === 'string') {
      return keywords.some(keyword => keyword && obj.toLowerCase().includes(keyword));
    }

    if (typeof obj === 'object' && obj !== null) {
      return Object.values(obj).some(value => searchInObject(value, keywords));
    }

    return false;
  };

  const filteredData = useMemo(() => {
    const searchKeywords = search.toLowerCase().split(/\s+/).filter(keyword => keyword !== '');

    if (searchKeywords.length === 0) {
      return data;
    }

    return data.filter(row => searchInObject(row, searchKeywords));
  }, [data, search]);

  return {
    search,
    setSearch,
    filteredData
  };
};
