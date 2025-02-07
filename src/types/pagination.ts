export interface PaginationTableType {
  currentPage: number;
  totalPage: number;
}

export interface TPagination<T> {
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  next: number;
  prev: number;
  data: T[];
}
