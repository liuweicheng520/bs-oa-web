import {Loading as ElementLoading} from 'element-ui'
import {ElLoadingComponent} from "element-ui/types/loading";

let loading: ElLoadingComponent;
let num = 0;

const Loading = {

  start(msg?: string) {
    if (num > 0) {
      num++;
      return;
    }

    loading = ElementLoading.service({
      lock: true,
      text: `${msg ? msg : 'Loading'} . . . `,
      spinner: 'el-icon-loading',
      background: 'rgba(200, 200, 200, .1)',
      fullscreen: false,
      body: true,
    });

    num++;
  },
  close() {
    if (num > 0) {
      num--;
    }
    if (num <= 0 && loading) {
      loading.close();
    }
  }
};

export {Loading}