import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/Element.ts'
import './plugins/Loading.ts'
import './plugins/ErrorHandler.ts'
import {UtilImpl} from "@/plugins/Util";

Vue.config.productionTip = false;
Vue.prototype.$util = new UtilImpl();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
