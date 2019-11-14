import Vue from 'vue'
import 'amfe-flexible'
import 'babel-polyfill'
import sa from 'sa-sdk-javascript'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import '@/common/css/reset.css'
import '@/common/css/animate.css'
import 'swiper/css/swiper.css'
// import VConsole from 'vconsole'

Vue.config.productionTip = false
/* eslint-disable no-new */
// new VConsole()

router.beforeEach((to, from, next) => {
  if (to.name === 'bindPhone') {
    // alert(1)
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
