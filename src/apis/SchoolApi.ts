import {HttpMethod, Rest} from "@/apis/base/Rest";
import {SchoolQueryParam} from "@/params/query/SchoolQueryParam";
import {SchoolParam} from "@/params/SchoolParam";

export class SchoolApi {

  static readonly GET = (id: number) => new Rest(HttpMethod.GET, `/school/${id}`);

  static readonly GET_RECOMMENDED_LIST = () => new Rest(HttpMethod.GET, `/school/recommended/list`);

  static readonly GET_LIST = (query: SchoolQueryParam) => new Rest(HttpMethod.GET, `/school/list`, query);

  static readonly GET_AREA_LIST = () => new Rest(HttpMethod.GET, `/school/area/list`);

  static readonly GET_BELONG_LIST = () => new Rest(HttpMethod.GET, `/school/belong/list`);

  static readonly GET_PAGE = (query: SchoolQueryParam) => new Rest(HttpMethod.GET, `/school/page`, query);

  static readonly CREATE = (param: SchoolParam) => new Rest(HttpMethod.POST, `/school`, param);

  static readonly MODIFY = (id: number, param: SchoolParam) => new Rest(HttpMethod.PUT, `/school/${id}`, param);

  static readonly DELETE = (id: number) => new Rest(HttpMethod.DELETE, `/school/${id}`);

}