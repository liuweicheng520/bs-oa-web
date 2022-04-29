import {HttpMethod, Rest} from "@/apis/base/Rest";
import {CourseQueryParam} from "@/params/query/CourseQueryParam";
import {CourseParam} from "@/params/CourseParam";

export class CourseApi {

  static readonly GET = (id: number) => new Rest(HttpMethod.GET, `/course/${id}`);

  static readonly GET_LIST = (query: CourseQueryParam) => new Rest(HttpMethod.GET, `/course/list`, query);

  static readonly GET_TYPE_LIST = (type: string) => new Rest(HttpMethod.GET, `/course/type/list`, {type});

  static readonly GET_PAGE = (query: CourseQueryParam) => new Rest(HttpMethod.GET, `/course/page`, query);

  static readonly CREATE = (param: CourseParam) => new Rest(HttpMethod.POST, `/course`, param);

  static readonly MODIFY = (id: number, param: CourseParam) => new Rest(HttpMethod.PUT, `/course/${id}`, param);

  static readonly DELETE = (id: number) => new Rest(HttpMethod.DELETE, `/course/${id}`);

}