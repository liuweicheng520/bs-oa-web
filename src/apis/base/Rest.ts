export enum HttpMethod {

  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',

}

export class Rest<T> {

  /**
   * 请求方法
   */
  private readonly _method: HttpMethod;

  /**
   * url
   */
  private readonly _path: string;

  private readonly _param?: T;

  constructor(method: HttpMethod, path: string, param?: T) {
    this._method = method;
    this._path = path;
    this._param = param;
  }

  get method(): HttpMethod {
    return this._method;
  }

  get path(): string {
    return this._path;
  }

  get param(): T|undefined {
    return this._param;
  }
}