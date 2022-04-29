import {HttpMethod, Rest} from "@/apis/base/Rest";
import {UserCollectBean} from "@/beans/UserCollectBean";

export class UserCollectApi {
  
  static readonly GET = (id: number) => new Rest(HttpMethod.GET, `/user/collect/${id}`);

  static readonly GET_LIST = (query: UserCollectBean) => new Rest(HttpMethod.GET, `/user/collect/list`, query);

  static readonly GET_PAGE = (query: UserCollectBean) => new Rest(HttpMethod.GET, `/user/collect/page`, query);

  static readonly POST = (param: UserCollectBean) => new Rest(HttpMethod.POST, `/user/collect/`, param);

  static readonly PUT = (id: number, param: UserCollectBean) => new Rest(HttpMethod.PUT, `/user/collect/${id}`, param);

  static readonly DELETE = (id: number) => new Rest(HttpMethod.DELETE, `/user/collect/${id}`);

}