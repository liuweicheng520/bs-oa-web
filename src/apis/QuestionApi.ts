import {HttpMethod, Rest} from "@/apis/base/Rest";
import {QuestionBean} from "@/beans/QuestionBean";

export class QuestionApi {
  
  static readonly GET = (id: number) => new Rest(HttpMethod.GET, `/question/${id}`);

  static readonly GET_LIST = (query: QuestionBean) => new Rest(HttpMethod.GET, `/question/list`, query);

  static readonly GET_PAGE = (query: QuestionBean) => new Rest(HttpMethod.GET, `/question/page`, query);

  static readonly POST = (param: QuestionBean) => new Rest(HttpMethod.POST, `/question/`, param);

  static readonly PUT = (id: number, param: QuestionBean) => new Rest(HttpMethod.PUT, `/question/${id}`, param);

  static readonly DELETE = (id: number) => new Rest(HttpMethod.DELETE, `/question/${id}`);

}