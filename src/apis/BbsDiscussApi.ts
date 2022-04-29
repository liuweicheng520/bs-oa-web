import {HttpMethod, Rest} from "@/apis/base/Rest";
import {BbsDiscussQueryParam} from "@/params/query/BbsDiscussQueryParam";
import {BbsDiscussParam} from "@/params/BbsDiscussParam";
import {BbsDiscussBean} from "@/beans/BbsDiscussBean";

export class BbsDiscussApi {

  static readonly GET = (id: number) => new Rest(HttpMethod.GET, `/bbs/discuss/${id}`);

  static readonly GET_LIST = (query: BbsDiscussBean) => new Rest(HttpMethod.GET, `/bbs/discuss/list`, query);

  static readonly GET_PAGE = (query: BbsDiscussBean) => new Rest(HttpMethod.GET, `/bbs/discuss/page`, query);

  static readonly CREATE = (param: BbsDiscussParam) => new Rest(HttpMethod.POST, `/bbs/discuss`, param);

  static readonly MODIFY = (id: number, param: BbsDiscussParam) => new Rest(HttpMethod.PUT, `/bbs/discuss/${id}`, param);

  static readonly DELETE = (id: number) => new Rest(HttpMethod.DELETE, `/bbs/discuss/${id}`);

}