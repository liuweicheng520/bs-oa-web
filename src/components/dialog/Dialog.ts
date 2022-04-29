import {EnumItem} from "@/enums/base/Enum";
import {DialogType} from "@/components/dialog/DialogType";

export class Dialog<T> {

  visible: boolean = false;

  type?: EnumItem;

  data?: T | null;

  constructor(visible: boolean, type?: EnumItem, data?: T) {
    this.visible = visible;
    this.type = type;
    this.data = data;
  }

  public static init<T>(type?: EnumItem): Dialog<T> {
    return new Dialog<T>(false, type);
  }

  public show(data?: T, type?: EnumItem): Dialog<T> {
    this.visible = true;
    this.type = type;
    this.data = data;
    return this;
  }

  public close(): Dialog<T> {
    this.visible = false;
    this.data = null;
    return this;
  }
}