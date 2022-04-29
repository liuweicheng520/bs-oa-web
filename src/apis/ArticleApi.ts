import {HttpMethod, Rest} from "@/apis/base/Rest";
import {ArticleQueryParam} from "@/params/query/ArticleQueryParam";
import {ArticleParam} from "@/params/ArticleParam";

export class ArticleApi {

  static readonly GET = (id: number) => new Rest(HttpMethod.GET, `/article/${id}`);

  static readonly GET_LIST = (query: ArticleQueryParam) => new Rest(HttpMethod.GET, `/article/list`, query);

  static readonly GET_PAGE = (query: ArticleQueryParam) => new Rest(HttpMethod.GET, `/article/page`, query);

  static readonly CREATE = (param: ArticleParam) => new Rest(HttpMethod.POST, `/article`, param);

  static readonly MODIFY = (id: number, param: ArticleParam) => new Rest(HttpMethod.PUT, `/article/${id}`, param);

  static readonly DELETE = (id: number) => new Rest(HttpMethod.DELETE, `/article/${id}`);

  static readonly GET_TYPE_LIST = () => new Rest(HttpMethod.GET, `/article/type/list`);

}