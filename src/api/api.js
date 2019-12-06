import { fetchPost, fetchGet } from './axios'

export default {
  // 获取所有咨询栏列表
  getConsultList (params) {
    return fetchPost('/intention/obtainIntentionPage', params)
  },

  // 获取所有社保贷列表
  getKnowleage (params) {
    return fetchPost('/knowleage_card/list', params)
  },

  // 获取所有社保贷列表
  getHomepage (params) {
    return fetchGet('/expert/homepage', params)
  },

  // 获取openid
  weixinHasBind (params) {
    return fetchGet('/wechat-bind/hasBind', params)
  },

  //绑定手机号
  weixinBindPhone (params) {
    return fetchPost('/wechat-bind/bind', params)
  },

  //账户详情
  merchantDetail (params) {
    return fetchPost('/merchant/account/detail', params)
  },

  //消费列表
  merchantTransactionList (params) {
    return fetchPost('/merchant/account/transactionList', params)
  },

  //询价单详情
  intentionDetail (params) {
    return fetchGet('/intention/detail', params)
  },

  //报价
  intentionQuotePrice (params) {
    return fetchPost('/intention/quotePrice', params)
  },

  //购买
  intentionPurchase (params) {
    return fetchGet('/intention/purchase', params)
  },

  //直接购买
  intentionCashPurchase (params) {
    return fetchPost('/intention/cashPurchase', params)
  },

  //充值
  recharge (params) {
    return fetchPost('/merchant/recharge', params)
  },

  //自定义充值
  customRecharge (params) {
    return fetchPost('/merchant/customRecharge', params)
  },

  //充值套餐
  rechargePackage (params) {
    return fetchPost('/merchant/rechargePackage', params)
  },

  //轮播列表
  carouselList (params) {
    return fetchGet('/clueHall/carouselList', params)
  },

  //线索列表
  clueList (params) {
    return fetchPost('/clueHall/clueList', params)
  },

  //获取城市列表
  cityList (params) {
    return fetchGet('/address/trees', params)
  },

  //获取服务列表
  serveList (params) {
    return fetchGet('/serviceType/trees', params)
  },

  //获取头部banner列表
  bannerList (params) {
    return fetchGet('/advert/position/list', params)
  },

  //获取公司信息
  companyInfo (params) {
    return fetchGet('/merchant-service/companyInfo', params)
  },

  //获取app询价单详情
  clueDetail (params) {
    return fetchGet('/clueHall/clueDetail', params)
  },

  // 获取验证码
  sendPhoneCode (params) {
    return fetchGet('/clueHall/clueDetail', params)
  },

  //购买app询价单
  purchaseClue (params) {
    return fetchPost('/clueHall/purchaseClue', params)
  },

  //更换手机号
  changePhone (params) {
    return fetchPost('/clueHall/purchaseClue', params)
  },

  //解绑
  unLinkWechat (params) {
    return fetchPost('/clueHall/purchaseClue', params)
  },
}
