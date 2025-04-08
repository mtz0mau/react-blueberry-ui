import { useMemo, useState } from "react";

export const useDataPaginator = (data: any[], defaultPageLength: number = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLength, setPageLength] = useState(defaultPageLength);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageLength;
    const endIndex = startIndex + pageLength;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageLength]);

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / pageLength);
  }, [data.length, pageLength]);

  const setPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    paginatedData,
    currentPage,
    setCurrentPage: setPage,
    totalPages,
    pageLength,
    setPageLength
  };
};
