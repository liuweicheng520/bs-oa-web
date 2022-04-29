import {Enum, EnumItem} from "@/enums/base/Enum";

export class DialogType extends Enum {

  static readonly ADD = new EnumItem('ADD', 'ADD', '添加');

  static readonly EDIT = new EnumItem('EDIT', 'EDIT', '编辑');

  static readonly CHECK = new EnumItem('CHECK', 'CHECK', '查看');

}