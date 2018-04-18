import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
import RoomInfo from '@/views/RoomInfo'
import Setting from '@/views/Setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/roomInfo',
      name: 'RoomInfo',
      component: RoomInfo
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    }
  ]
})
