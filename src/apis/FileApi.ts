import {HttpMethod, Rest} from "@/apis/base/Rest";
import {FileQueryParam} from "@/params/query/FileQueryParam";
import {FileParam} from "@/params/FileParam";

export class FileApi {

  static readonly GET = (id: number) => new Rest(HttpMethod.GET, `/file/${id}`);

  static readonly GET_LIST = (query: FileQueryParam) => new Rest(HttpMethod.GET, `/file/list`, query);

  static readonly GET_PAGE = (query: FileQueryParam) => new Rest(HttpMethod.GET, `/file/page`, query);

  static readonly CREATE = (param: FileParam) => new Rest(HttpMethod.POST, `/file`, param);

  static readonly MODIFY = (id: number, param: FileParam) => new Rest(HttpMethod.PUT, `/file/${id}`, param);

  static readonly DELETE = (id: number) => new Rest(HttpMethod.DELETE, `/file/${id}`);

}