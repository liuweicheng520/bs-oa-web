import {HttpMethod, Rest} from "@/apis/base/Rest";
import {UserQueryParam} from "@/params/query/UserQueryParam";
import {UserParam} from "@/params/UserParam";

export class UserApi {

  static readonly GET = (id: number) => new Rest(HttpMethod.GET, `/user/${id}`);

  static readonly GET_LIST = (query: UserQueryParam) => new Rest(HttpMethod.GET, `/user/list`, query);

  static readonly GET_PAGE = (query: UserQueryParam) => new Rest(HttpMethod.GET, `/user/page`, query);

  static readonly CREATE = (param: UserParam) => new Rest(HttpMethod.POST, `/user`, param);

  static readonly MODIFY = (id: number, param: UserParam) => new Rest(HttpMethod.PUT, `/user/${id}`, param);

  static readonly DELETE = (id: number) => new Rest(HttpMethod.DELETE, `/user/${id}`);

}