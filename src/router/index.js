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
        title: '咨询详情',
        saTitle: '询价页',
        saName: 'enquiry_page'
      }
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('../views/inquiry/feedback.vue'),
      meta: {
        title: '反馈价格',
        saTitle: '询价页',
        saName: 'enquiry_page'
      }
    },
    {
      path: '/myAccount',
      name: 'myAccount',
      component: () => import('../views/inquiry/myAccount.vue'),
      meta: {
        title: '我的账户',
        saTitle: '我的账户',
        saName: 'account_page'
      }
    },
    {
      path: '/reCharge',
      name: 'reCharge',
      component: () => import('../views/inquiry/reCharge.vue'),
      meta: {
        title: '充值',
        saTitle: '充值',
        saName: 'account_recharge_page'
      }
    },
    {
      path: '/reChargePay',
      name: 'reChargePay',
      component: () => import('../views/inquiry/reChargePay.vue'),
      meta: {
        title: '充值',
        saTitle: '充值支付',
        saName: 'account_recharge_detail_page'
      }
    },
    {
      path: '/pay',
      name: 'pay',
      component: () => import('../views/inquiry/pay.vue'),
      meta: {
        title: '支付',
        saTitle: '支付界面',
        saName: 'enquiry_payment_page'
      }
    },
    {
      path: '/consultList',
      name: 'consultList',
      component: () => import('../views/inquiry/consultList.vue'),
      meta: {
        title: '咨询栏',
        saTitle: '咨询栏',
        saName: 'clues_page '
      }
    },
    {
      path: '/payResult',
      name: 'payResult',
      component: () => import('../views/inquiry/payResult.vue'),
      meta: {
        title: '支付结果',
        saTitle: '支付成功界面',
        saName: 'enquiry_payment_success_page'
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
        title: '服务协议'
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
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../views/app/detail.vue'),
      meta: {
        title: '咨询详情'
      }
    },
    {
      path: '/renzheng',
      name: 'renzheng',
      component: () => import('../views/app/renzheng.vue'),
      meta: {
        title: '商户认证'
      }
    },
    {
      path: '/rzResult',
      name: 'rzResult',
      component: () => import('../views/app/rzResult.vue'),
      meta: {
        title: '商户认证'
      }
    },
    {
      path: '/changePhone',
      name: 'changePhone',
      component: () => import('../views/app/changePhone.vue'),
      meta: {
        title: '更换手机号'
      }
    },
    {
      path: '/unlinkWechat',
      name: 'unlinkWechat',
      component: () => import('../views/app/unlinkWechat.vue'),
      meta: {
        title: '解绑微信'
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
