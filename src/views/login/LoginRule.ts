import {Vue} from "vue-property-decorator";

export class LoginRule {

  public static buildRegisterRules(self: Vue): object {
    return {
      username: [
        {required: true, message: '请输入', trigger: 'blur'},
      ],
      password: [
        {required: true, message: '请输入', trigger: 'blur'},
      ],
      school: [
        {required: true, message: '请输入', trigger: 'blur'},
      ],
    }
  }

}