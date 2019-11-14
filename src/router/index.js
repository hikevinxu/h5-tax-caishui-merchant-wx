import Vue from 'vue'
import Router from 'vue-router'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.back()
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/inquiryDetail'
    },
    {
      path: '/bindPhone',
      name: 'bindPhone',
      component: () => import('../views/Login/bindPhone.vue'),
      meta: {
        title: '商户绑定'
      }
    },
    {
      path: '/inquiryDetail',
      name: 'inquiryDetail',
      component: () => import('../views/inquiry/inquiryDetail.vue'),
      meta: {
        title: '咨询详情'
      }
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('../views/inquiry/feedback.vue'),
      meta: {
        title: '反馈价格'
      }
    },
    {
      path: '/myAccount',
      name: 'myAccount',
      component: () => import('../views/inquiry/myAccount.vue'),
      meta: {
        title: '我的账户'
      }
    },
    {
      path: '/reCharge',
      name: 'reCharge',
      component: () => import('../views/inquiry/reCharge.vue'),
      meta: {
        title: '充值'
      }
    },
    {
      path: '/reChargePay',
      name: 'reChargePay',
      component: () => import('../views/inquiry/reChargePay.vue'),
      meta: {
        title: '充值'
      }
    },
    {
      path: '/pay',
      name: 'pay',
      component: () => import('../views/inquiry/pay.vue'),
      meta: {
        title: '支付'
      }
    },
    {
      path: '/payResult',
      name: 'payResult',
      component: () => import('../views/inquiry/payResult.vue'),
      meta: {
        title: '支付结果'
      }
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('../views/Login/success.vue'),
      meta: {
        title: '绑定成功'
      }
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: () => import('../views/Login/agreement.vue'),
      meta: {
        title: '绑定成功'
      }
    },
    {
      path: '/hall',
      name: 'hall',
      component: () => import('../views/app/hall.vue'),
      meta: {
        title: '需求大厅'
      }
    },
    {
      path: '/clue',
      name: 'clue',
      component: () => import('../views/app/clue.vue'),
      meta: {
        title: '我的线索'
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('../views/app/mine.vue'),
      meta: {
        title: '我的'
      }
    }
  ],
  scrollBehavior(to, from, saveTop){
    if (saveTop) {
      return saveTop
    } else {
      return { x: 0, y: 0 }
    }
  }
})
