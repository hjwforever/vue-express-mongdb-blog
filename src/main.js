import Vue from 'vue';
import App from './App.vue';
import router from '@/router/index';
import store from './store';
import VeeValidate from 'vee-validate';
import InfiniteLoading from "vue-infinite-loading";

// vuetify, 本项目主要使用的UI框架
import vuetify from './plugins/vuetify';

// Infinite组件(页面滚动无限加载模块) 自定义全局样式
import NoMore from "@/components/Infinite/NoMore";
import NoResults from "@/components/Infinite/NoResults";
import Error from "@/components/Infinite/Error";

// 确认框及其样式
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false;

// 表单验证规则
Vue.use(VeeValidate);

// 动态无限加载(取决于数据库数据)
Vue.use(InfiniteLoading, {
  props: {
    spinner: 'waveDots',
  },
  slots: {
    noMore: NoMore,
    noResults: NoResults,
    error: Error
  }
})

// 确认框
Vue.use(VueSweetalert2);

// 全局注册封装好的信息提示条的消息发送方法
import Snackbar from '@/components/Snackbar'
Vue.prototype.$send = Snackbar.send

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
