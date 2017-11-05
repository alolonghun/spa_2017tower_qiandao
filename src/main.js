import Vue from 'vue'
import 'animate.css'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router/router.js'
import $ from 'jquery'
import './config/rem.js'
import { AlertPlugin, ToastPlugin } from 'vux'
import Vuerify from 'vuerify'
import axios from 'axios'

Vue.use(Vuerify)
Vue.use(VueRouter)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

Vue.prototype.axios = axios;

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
