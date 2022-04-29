import {EnumItem} from "@/enums/base/Enum";

export class RoleEnum {

  static readonly COMMON = new EnumItem('COMMON', 'COMMON', '普通用户');

  static readonly ADMIN = new EnumItem('ADMIN', 'ADMIN', '管理员');

}
