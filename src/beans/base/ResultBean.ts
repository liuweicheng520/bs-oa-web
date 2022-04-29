export interface ResultBean<T> {

  success: boolean;
  code: number;
  message: string;
  data: T;

}