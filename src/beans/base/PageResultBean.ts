export interface PageResultBean<T> {

  current: number;
  size: number;
  total: number;
  list: T[];

}