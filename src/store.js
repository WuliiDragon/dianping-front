import Vue from 'vue';
import Vuex from 'vuex';
import session from '@/utils/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: session.get('isLogin', 0),
    userInfo: session.get('userInfo', {}),
    cartList: session.get('cartList', [])
  },
  mutations: {
    $handleAddress(state, address) {
      state.nowAddress = session.set('nowAddress', address);
    },
    $handleLogin(state, obj) {
      state.isLogin = session.set('isLogin', obj.isLogin);
      state.userInfo = session.set('userInfo', obj.userInfo);
    },
  }
});
