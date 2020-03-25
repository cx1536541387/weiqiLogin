import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'

Vue.use(Vuex);

const state = {
  tabbar: 1,
  isLogin: false,
  isAdmin: false,
  // 用户个人信息
  username: '',
  uid: '',
  name: '',
  email: '',
  sex: '',
  age: '',
  tel: '',
  level: '',
  times: '',
  maxrank: '',
  imageUrl: ""
}

const store = new Vuex.Store({
  state,
  mutations: {
    isLogin(state, data) {
      state.isLogin = data
    }
  },
  plugins: [vuexAlong]
})

export default store