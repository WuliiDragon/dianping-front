import Vue from 'vue';

import BScroll from 'better-scroll';
import App from './App';
import router from './router';
import store from './store';
import api from './utils/api';
import sesstion from './utils/storage';
import { Header, Scroll, Toast, Confirm } from './components';
import './common/scss/index.scss';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from 'axios'
// import VueAxios from 'vue-axios'
//
// Vue.use(VueAxios,axios);

// 导入mock数据，npm run build前，请手动注释，否则将使用mock数据
import './utils/mock';

Vue.config.productionTip = false;
Vue.use(Header);
Vue.use(Scroll);
Vue.use(ViewUI);
Vue.use(Toast);
Vue.use(Confirm);
// axios响应拦截器
axios.interceptors.response.use(res => res.data);
const httpService = axios.create({
  baseURL: "http://localhost:5000", // url前缀
  timeout: 3000 // 请求超时时间
});
// Vue.prototype.$ajax = axios
Vue.prototype.$http = axios;

Vue.prototype.$BScroll = BScroll;
Vue.prototype.$sesstion = sesstion;
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
