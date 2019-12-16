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
    return fetchPost('/recharge', params)
  },

  //自定义充值
  customRecharge (params) {
    return fetchPost('/recharge/custom', params)
  },

  //充值套餐
  rechargePackage (params) {
    return fetchPost('/recharge/package', params)
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

  // 线索详情
  sendPhoneCode (params) {
    return fetchGet('/clueHall/clueDetail', params)
  },

  //购买app询价单
  purchaseClue (params) {
    return fetchPost('/clueHall/purchaseClue', params)
  },

  //更换手机号
  changePhone (params) {
    return fetchPost('/merchant-service/changePhone', params)
  },

  //解绑
  unLinkWechat (params) {
    return fetchPost('/merchant-service/unBind', params)
  },

  //绑定登录
  bindLogin (params) {
    return fetchPost('/wechat/register/bindLogin', params)
  },

  // 判断是否注册绑定
  registerHasBind (params) {
    return fetchGet('/wechat/register/hasBind', params)
  },

  // 判断是否注册
  isRegistered (params) {
    return fetchGet('/wechat/register/isRegistered', params)
  },

  // 获取验证码
  registerVerification (params) {
    return fetchGet('/wechat/register/registerVerification', params)
  },

  // 注册登录
  registerLogin (params) {
    return fetchPost('/wechat/register/registerLogin', params)
  },

  // 获取认证状态
  applyStatus (params) {
    return fetchGet('/merchant/apply/status', params)
  },

  // 原始手机号发送验证码
  sendVerifyOrigin (params) {
    return fetchPost('/merchant-service/sendVerifyOrigin', params)
  },

  // 新手机号发送验证码
  verifyNew (params) {
    return fetchPost('/merchant-service/verifyNew', params)
  },

  // 企业认证资料提交
  apply (params) {
    return fetchGet('/wechat/enterpriseAuth/apply', params)
  },

  // 提交重置
  reset (params) {
    return fetchGet('/merchant/apply/reset', params)
  },

  // 已绑定情况下自动登录
  wechatLogin (params) {
    return fetchGet('/wechat/login', params)
  },

  //认证详情
  authenticationInfo (params) {
    return fetchGet('/merchant-service/authenticationInfo', params)
  },

  //修改密码
  changePassword (params) {
    return fetchPost('/merchant-service/reset', params)
  },
}
