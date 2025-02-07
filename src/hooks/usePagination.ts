// Types
import { TPagination } from '@/types';

// Utils
import { formatPageArray } from '@/utils';

export const usePagination = <T>(
  data: TPagination<T>,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
) => {
  const pageArray = formatPageArray({
    totalPage: data?.meta.pagination.pageCount || 0,
    currentPage: data?.next ? data?.next : 1,
  });

  const handleChangePageNumber = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangePage = (direction: string) => {
    setCurrentPage(direction === 'prev' ? currentPage - 1 : currentPage + 1);
  };

  const isDisableNext = currentPage === data?.meta.pagination.pageCount;

  const isDisablePrev = currentPage <= 1;

  return {
    pageArray,
    isDisableNext,
    isDisablePrev,
    handleChangePageNumber,
    handleChangePage,
  };
};
