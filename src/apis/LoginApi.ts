import {HttpMethod, Rest} from "@/apis/base/Rest";
import {LoginInfoParam} from "@/params/LoginInfoParam";
import {UserParam} from "@/params/UserParam";

export class LoginApi {

  static readonly GET_LOGIN = () => new Rest(HttpMethod.GET, `/user/info`);

  static readonly LOGIN = (param: LoginInfoParam) => new Rest(HttpMethod.POST, `/user/login`, param);

  static readonly REGISTER = (param: UserParam) => new Rest(HttpMethod.POST, `/login`, param);

  static readonly LOGOUT = () => new Rest(HttpMethod.DELETE, `/login`);

  static readonly GET_CAPTCHA = () => new Rest(HttpMethod.GET, `/login/captcha`);
}
