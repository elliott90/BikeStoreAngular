export interface IPagedResults<T> {
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  results: T;
}
