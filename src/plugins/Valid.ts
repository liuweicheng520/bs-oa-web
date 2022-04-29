import {Vue} from "vue-property-decorator";
import {ValidWarning} from "@/exceptions/ValidWarning";

export class Valid {
  public static test(self: Vue, form = 'form'): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      // @ts-ignore
      self.$refs[form].validate((valid) => {
        if (valid) {
          resolve(valid);
        } else {
          throw new ValidWarning();
        }
      });
    });
  }

  public static reset(self: Vue, form = 'form') {
    // @ts-ignore
    self.$refs[form].resetFields();
  }
}