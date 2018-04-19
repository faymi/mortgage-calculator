// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import FastClick from 'fastclick'
import * as echarts from 'echarts'
import './assets/css/reset.scss'

Vue.use(Vuex)

FastClick.attach(document.body)
Vue.prototype.axios = axios
Vue.prototype.echarts = echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
