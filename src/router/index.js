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
      redirect: '/hall'
    },
    {
      path: '/bindPhone',
      name: 'bindPhone',
      component: () => import('../views/Login/bindPhone.vue'),
      meta: {
        title: '商户绑定',
        saTitle: '入驻&绑定页',
        saName: 'merchants_settled_binding_page'
      }
    },
    {
      path: '/init',
      name: 'init',
      component: () => import('../views/Login/init.vue'),
      meta: {
        title: '商户绑定',
        saTitle: '商家入驻介绍页',
        saName: 'merchants_settled_page'
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
        title: '交易大厅',
        saName: 'trading_floor_page'
      }
    },
    {
      path: '/clue',
      name: 'clue',
      component: () => import('../views/app/clue.vue'),
      meta: {
        title: '交易大厅询价单',
        saName: 'trading_floor_enquiry_page'
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
        title: '商户认证',
        saTitle: '商家认证',
        saName: 'merchant_ca_page'
      }
    },
    {
      path: '/rzResult',
      name: 'rzResult',
      component: () => import('../views/app/rzResult.vue'),
      meta: {
        title: '商户认证',
        saTitle: '商家认证反馈页面',
        saName: 'merchant_certification_results_page'
      }
    },
    {
      path: '/rzSucc',
      name: 'rzSucc',
      component: () => import('../views/app/rzSucc.vue'),
      meta: {
        title: '商户认证',
        saTitle: '商家资料查看页面',
        saName: 'merchant_recognition_results_page'
      }
    },
    {
      path: '/changePhone',
      name: 'changePhone',
      component: () => import('../views/app/changePhone.vue'),
      meta: {
        title: '更换手机号',
        saTitle: '修改手机号码',
        saName: 'change_mobile_number_page'
      }
    },
    {
      path: '/unlinkWechat',
      name: 'unlinkWechat',
      component: () => import('../views/app/unlinkWechat.vue'),
      meta: {
        title: '解绑微信',
        saTitle: '解绑微信',
        saName: 'untying_wechat_page'
      }
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: () => import('../views/app/changePassword.vue'),
      meta: {
        title: '解绑微信',
        saTitle: '解绑微信',
        saName: 'untying_wechat_page'
      }
    },
    {
      path: '/bindLogin',
      name: 'bindLogin',
      component: () => import('../views/Login/bindLogin.vue'),
      meta: {
        title: '自动登录中'
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
