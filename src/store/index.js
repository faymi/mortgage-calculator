import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import data from './modules/data'

Vue.use(Vuex)

/**
 * vuex-persist插件
 * 相关文档：http://www.bslxx.com/a/vue/2017/1124/1454.html
 * 防止刷新后store状态清除
 */
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    data
  }
})
