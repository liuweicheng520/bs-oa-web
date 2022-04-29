import {HttpMethod, Rest} from "@/apis/base/Rest";
import {QuestionGroupBean} from "@/beans/QuestionGroupBean";

export class QuestionGroupApi {
  
  static readonly GET = (id: number) => new Rest(HttpMethod.GET, `/question/group/${id}`);

  static readonly GET_LIST = (query: QuestionGroupBean) => new Rest(HttpMethod.GET, `/question/group/list`, query);

  static readonly GET_PAGE = (query: QuestionGroupBean) => new Rest(HttpMethod.GET, `/question/group/page`, query);

  static readonly POST = (param: QuestionGroupBean) => new Rest(HttpMethod.POST, `/question/group/`, param);

  static readonly PUT = (id: number, param: QuestionGroupBean) => new Rest(HttpMethod.PUT, `/question/group/${id}`, param);

  static readonly DELETE = (id: number) => new Rest(HttpMethod.DELETE, `/question/group/${id}`);

}