import Vue from "vue";
import {BizError} from "@/exceptions/BizError";
import {Message} from "element-ui";
import {ValidWarning} from "@/exceptions/ValidWarning";

Vue.config.errorHandler = (err: Error, vm: Vue, info: string) => {

  if (err instanceof BizError) {
    Message.error(err.message);
    return;
  }

  if (err instanceof ValidWarning) {
    return;
  }

  console.error(info);
  console.error(err);
};
