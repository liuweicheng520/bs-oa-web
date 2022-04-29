import {HttpMethod, Rest} from "@/apis/base/Rest";

export class StatisticsApi {

  static readonly GET_AREA = () => new Rest(HttpMethod.GET, `/statistics/area`);

  static readonly GET_BELONG = () => new Rest(HttpMethod.GET, `/statistics/belong`);

  static readonly GET_FEATURE = () => new Rest(HttpMethod.GET, `/statistics/feature`);

  static readonly GET_HISTORY = () => new Rest(HttpMethod.GET, `/statistics/history`);

}