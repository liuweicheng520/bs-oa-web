import {HttpMethod, Rest} from "@/apis/base/Rest";
import {BbsPostQueryParam} from "@/params/query/BbsPostQueryParam";
import {BbsPostParam} from "@/params/BbsPostParam";

export class BbsPostApi {

  static readonly GET = (id: number) => new Rest(HttpMethod.GET, `/bbs/post/${id}`);

  static readonly GET_LIST = (query: BbsPostQueryParam) => new Rest(HttpMethod.GET, `/bbs/post/list`, query);

  static readonly GET_PAGE = (query: BbsPostQueryParam) => new Rest(HttpMethod.GET, `/bbs/post/page`, query);

  static readonly CREATE = (param: BbsPostParam) => new Rest(HttpMethod.POST, `/bbs/post`, param);

  static readonly MODIFY = (id: number, param: BbsPostParam) => new Rest(HttpMethod.PUT, `/bbs/post/${id}`, param);

  static readonly DELETE = (id: number) => new Rest(HttpMethod.DELETE, `/bbs/post/${id}`);

}