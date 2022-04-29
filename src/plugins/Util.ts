import {Util} from "@/plugins/Util.d.ts";

export class UtilImpl implements Util {

  isNull(obj: object): boolean {
    if (obj == null) {
      return true;
    }
    return !Object.keys(obj).length;
  }

  isNotNull(obj: object): boolean {
    return !this.isNull(obj);
  }

}