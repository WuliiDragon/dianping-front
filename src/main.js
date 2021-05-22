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
import axios from 'axios';
import Qs from 'qs'

import './utils/mock';

Vue.config.productionTip = false;
Vue.use(Header);
Vue.use(Scroll);
Vue.use(ViewUI);
Vue.use(Toast);
Vue.use(Confirm);

axios.interceptors.response.use(res => res.data);
Vue.prototype.$http = axios;
Vue.prototype.Qs = Qs;

Vue.prototype.$BScroll = BScroll;
Vue.prototype.$sesstion = sesstion;
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
