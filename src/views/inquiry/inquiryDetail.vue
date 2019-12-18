<template>
  <div class="inquiryDetail" >
    <div class="inquiryData">
      <div class="line" v-if="data.status == 3">
        <span class="label">服务报价（￥）</span>
        <div class="data">
          <span class="dataDetail" style="color: rgb(251, 83, 50)">{{data.quotedPrice}}</span>
        </div>
      </div>
      <div class="line">
        <span class="label">客户名称</span>
        <div class="data">
          <span class="dataDetail">{{data.name}}</span>
        </div>
      </div>
      <div class="line">
        <span class="label">联系电话</span>
        <div class="data" v-if="data.phone">
          <span v-if="data.phone.indexOf('*') > -1" style="font-family: PingFangSC-Regular;font-size: 14px;">{{data.phone}}</span>
          <a v-else id="call" style="font-family: PingFangSC-Regular;font-size: 14px;text-decoration: underline;color: #2a5caa" @click="call">{{data.phone}}</a>
          <span class="sure" style="display:block;-webkit-transform : scale(0.84,0.84);font-family: PingFangSC-Regular;font-size: 8px;color: #FB5332;">(确定报价后显示)</span>
        </div>
      </div>
      <div class="line">
        <span class="label">询价类目</span>
        <div class="data">
          <span class="dataDetail">{{data.intention}}</span>
        </div>
      </div>
      <div class="line">
        <span class="label">询价时间</span>
        <div class="data">
          <span class="dataDetail">{{data.createTime}}</span>
        </div>
      </div>
      <div class="line">
        <span class="label">需求区域</span>
        <div class="data" v-if="data.area">
          <span class="dataDetail">{{areaHandle(data.area)}}</span>
        </div>
      </div>
    </div>
    <div class="clientWill" v-if="data.customerIntention">
      <div class="clientWillContent">
        <h4>客户意向</h4>
        <p>{{data.customerIntention}}</p>
      </div>
    </div>
    <div class="consume" v-if="data.extra && data.extra.length > 0">
      <div class="consumeContent">
        <h4>业务需求信息</h4>
        <div class="consumeList">
          <div class="consumeLine" v-for="(item,index) in data.extra" :key="index">
            <span class="label">{{item.propName}}</span>
            <span class="value">{{item.valueName}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="footer">
      <div class="btnContent" v-show="data.status == 1">
        <span class="offer" @click="baojia">支付<span class="offerNum">({{data.price || ''}}金币)</span></span>
      </div>
    </div> -->
    <div class="pay_bottom" v-if="data.status == 1">
      <div class="pay_bottom_top">
        <div :class="['box_item', payType == 'balance' ? 'active' : '']" @click="payType = 'balance'">
          <img src="@/assets/pay-balance.png" alt="">
          <span>余额支付</span>
        </div>
        <div :class="['box_item', payType == 'wx' ? 'active' : '']" @click="payType = 'wx'">
          <img src="@/assets/pay-wechat.png" alt="">
          <span>微信支付</span>
        </div>
      </div>
      <div class="pay_bottom_bottom">
        <div class="pay_bottom_dw">¥</div>
        <div class="pay_bottom_price">{{data.price}}</div>
        <div class="pay_bottom_empty"></div>
        <div class="pay_bottom_btn" @click="baojia">去支付</div>
      </div>
    </div>
    <van-dialog
      v-model="showQrcode"
      title="请前往财税鱼商家助手小程序进行查看"
      show-cancel-button
    >
      <img class="qrcode" style="display: block;width: 200px;height: 200px;margin-left: auto;margin-right: auto;margin-top: 10px;margin-bottom: 20px;" src="https://img.yzcdn.cn/vant/apple-3.jpg">
    </van-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
import { Toast, Button, Dialog } from 'vant'
import api from '@/api/api'
import qs from 'qs'
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Toast)
export default {
  data () {
    return {
      data: {},
      intentionId: 1,
      consumeList: [
        
      ],
      offer: 200,
      hasBind: false,
      overdue: false,
      success: false,
      showQrcode: false,
      payType: 'balance'
    }
  },
  created () {

    let intentionId = this.$route.query.intentionId
    console.log(intentionId)
    if(intentionId) {
      this.intentionId = intentionId
      let data = {
        intentionId: intentionId
        // intentionId: 1
      }
      // data = qs.stringify(data)
      api.intentionDetail(data).then(res => {
        console.log(res)
        if(res.code == 0){
          if(res.data.status == 2) {
            this.$router.replace({
              path: '/feedback',
              query: {
                intentionId,
              }
            })
          }else {
            this.data = res.data
            this.data.extra = JSON.parse(this.data.extra)
            let typeList = ['预审', '询价单']
            sa.track('WebConsultingOrder', {
              page: this.$route.query.form || '',
              type: typeList[this.data.intentionType],
              id: this.data.id,
              service_name: this.data.intention,
              service_code: this.data.intentionCode,
              service_area: this.data.area
            })
          }
        }
      })
      localStorage.setItem('intentionId', intentionId)
    }
    // if(this.$route.query.code) {
    //   let params = {
    //     code: this.$route.query.code
    //   }
    //   api.weixinHasBind(params).then(res => {
    //     console.log(res)
    //     if(res.code == 0){
    //       this.openId = res.data.openId
    //       localStorage.setItem('openId',this.openId)
    //       if(res.data.hasBind == false){
    //         this.hasBind = false
    //         this.$router.push({ path: '/bindPhone' })
    //       }else {
    //         this.hasBind = true
    //         let merchant = res.data.merchant.id
    //         console.log(merchant)
    //         localStorage.setItem('merchant', merchant)
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //       console.log(error)
    //   })
    // }
  },
  methods: {
    binding () {
      
    },
    getDetail() {
      let data = {
        intentionId: this.intentionId
      }
      api.intentionDetail(data).then(res => {
        if(res.code == 0){
          if(res.data.status == 2) {
            this.$router.replace({
              path: '/feedback',
              query: {
                intentionId: this.intentionId
              }
            })
          }else {
            this.data = res.data
            this.data.extra = JSON.parse(this.data.extra)
            let typeList = ['预审', '询价单']
            sa.track('WebConsultingOrder', {
              page: this.$route.query.form || '',
              type: typeList[this.data.intentionType],
              id: this.data.id,
              service_name: this.data.intention,
              service_code: this.data.intentionCode,
              service_area: this.data.area
            })
          }
        }
      })
    },
    goBack () {
      window.history.back()
    },
    baojia() {
      let typeList = ['预审', '询价单']
      sa.track('WebCheckOnTheOfferBtn', {
        type: typeList[this.data.intentionType - 1],
        service_name: this.data.intention,
        service_code: this.data.code,
        service_area: this.data.area
      })
      // this.$router.push({ 
      //   path: '/pay',
      //   query: {
      //     intentionId: this.intentionId,
      //     price: this.data.price
      //   }
      // })
      let data = {
        amount: this.data.price,
        payChannel: 'weixin',
        payType:  'weixin_jsapi',
        intentionId: this.intentionId
      }
      Dialog.confirm({
        title: '提示',
        message: '确认购买此询价单？',
        confirmButtonColor: '#FF7F4A'
      }).then(() => {
        if(this.payType == 'balance') {
          api.intentionPurchase(data).then(res => {
            if(res.code == 0){
              Toast('购买成功')
              this.getDetail()
              // this.$router.replace({ path: '/payResult' })
              this.$router.replace({
                path: '/feedback',
                query: {
                  intentionId: this.intentionId,
                  from: 'payResult'
                }
              })
            } else if(res.code == 20001) {
              this.success = false
              Dialog.alert({
                title: '提示',
                message: '需求状态发生改变，请更新！',
                closeOnPopstate: true,
                confirmButtonColor: '#FF7F4A'
              }).then(() => {
                this.getDetail()
              })
            }else {
              this.success = false
              Toast(res.data.msg)
            }
          })
          .catch(err => {
            if(err.data.code == 600) {
              this.success = false
              Dialog.alert({
                title: '提示',
                message: '亲，您余额不足，现在去充值，以免错失开单机会～',
                closeOnPopstate: true,
                showCancelButton: true,
                confirmButtonColor: '#FF7F4A'
              }).then(() => {
                this.$router.push('/reCharge')
              }).catch(() => {
                console.log('取消')
              })
            }
          })
        }else {
          api.intentionCashPurchase(data).then(res => {
            if(res.code == 0){
              let paySign = JSON.parse(res.data.paySign)
              let self = this
              WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                "appId": paySign.appId,     //公众号名称，由商户传入     
                "timeStamp": paySign.timeStamp,         //时间戳，自1970年以来的秒数     
                "nonceStr": paySign.nonceStr, //随机串     
                "package": paySign.package,     
                "signType": paySign.signType,         //微信签名方式：     
                "paySign": paySign.paySign //微信签名 
              },
              function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ){
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                  Toast.success('购买成功！')
                  // self.$router.replace({ path: '/payResult' })
                  self.$router.replace({
                    path: '/feedback',
                    query: {
                      intentionId: self.intentionId,
                      from: 'payResult'
                    }
                  })
                }
                else if(res.err_msg == "get_brand_wcpay_request:cancel" ){
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                  Toast.fail('取消购买！')
                } 
                else if(res.err_msg == "get_brand_wcpay_request:fail" ){
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                  // getWeiXinConfig()
                  Toast.fail('购买失败！')
                }
              })
            }else if(res.code == 20001) {
              this.success = false
              Toast(res.msg)
              // this.$router.back();
              // this.getDetail()
              Dialog.alert({
                title: '提示',
                message: '需求状态发生改变，请更新！',
                closeOnPopstate: true,
                confirmButtonColor: '#FF7F4A'
              }).then(() => {
                this.getDetail()
              })
            }else {
              this.success = false
              Toast(res.msg)
            }
          })
          .catch(err => {
            Toast(err.msg)
          })
        }
      }).catch(() => {
        Toast('取消购买')
      })
    },
    goDetail() {
      this.$router.push({ path: '/feedback?intentionId=' + this.intentionId })
    },
    call(item) {
      let typeList = ['预审', '询价单']
      sa.track('WebCheckOnTheNumberBtn', {
        type: typeList[this.data.intentionType - 1],
        service_name: this.data.intention,
        service_code: this.data.intentionCode,
        service_area: this.data.area
      })
      document.getElementById('call').setAttribute('href', 'tel:' + this.data.phone);
    },
    areaHandle(area) {
      let list = area.split('-').reverse();
      if(list.length > 2) {
        return `${list[1]}-${list[0]}`;
      }else {
        return area;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.inquiryDetail {
  padding-bottom: 108px;
  width: 100%;
  position: relative;
  .inquiryData{
    width: 100%;
    background: #ffffff;
    .line{
      display: flex;
      align-items: center;
      height: 48px;
      justify-content: space-between;
      .label{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0,0,0,0.60);
        text-align: left;
        line-height: 20px;
        margin-left: 16px;
        white-space: nowrap;
      }
      .data{
        margin-left: 8px;
        display: flex;
        flex-flow: column;
        align-items: flex-end;
        justify-content: center;
        margin-right: 16px;
        .dataDetail{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: rgba(0,0,0,0.87);
          text-align: left;
          line-height: 20px;
        }
      }
    }
  }
  .clientWill{
    width: 100%;
    background: #ffffff;
    .clientWillContent{
      width: 328px;
      margin-left: auto;
      margin-right: auto;
      border-top: 1px solid rgba(0,0,0,0.04);
      border-bottom: 1px solid rgba(0,0,0,0.04);
      padding-top: 16px;
      padding-bottom: 16px;
      text-align: left;
      margin-top: 12px;
      h4{
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: rgba(0,0,0,0.87);
        text-align: left;
      }
      p{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0,0,0,0.87);
        line-height: 22px;
        margin-top: 8px;
      }
    }
  }
  .consume{
    width: 100%;
    background: #ffffff;
    .consumeContent{
      width: 328px;
      padding-top: 17px;
      margin-left: auto;
      margin-right: auto;
      h4{
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: rgba(0,0,0,0.87);
        text-align: left;
      }
      .consumeList{
        width: 100%;
        margin-top: 8px;
        .consumeLine{
          display: flex;
          align-items: center;
          height: 48px;
          justify-content: space-between;
          .label{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: rgba(0,0,0,0.60);
            text-align: left;
            line-height: 20px;
          }
          .value{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: rgba(0,0,0,0.87);
            text-align: right;
            line-height: 20px;
          }
        }
      }
    }
  }
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .btnContent{
      display: flex;
      align-items: center;
      width: 100%;
      .notNeed{
        display: flex;
        width: 50%;
        height: 52px;
        background: #FFAD71;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #FFFFFF;
        align-items: center;
        justify-content: center;
      }
      .offer{
        display: flex;
        width: 100%;
        height: 52px;
        background: #FF7F4A;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #FFFFFF;
        align-items: center;
        justify-content: center;
        .offerNum{
          font-size: 12px !important;
        }
      }
    }
  }
  .pay_bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    .pay_bottom_top {
      width: 100%;
      height: 56px;
      background-color: pink;
      box-sizing: border-box;
      padding: 8px 20px;
      background: #FFFFFF;
      box-shadow: 0 -1px 2px 0 rgba(0,0,0,0.04);
      overflow: hidden;
      .box_item {
        width: 148px;
        height: 40px;
        float: left;
        line-height: 40px;
        border: 1px solid #E0E0E0;
        border-radius: 2px;
        &:last-child {
          float: right;
        }
        &.active {
          background: #FFFFFF;
          border: 1px solid #FF7F4A;
          border-radius: 2px;
          position: relative;
          &::before {
            content: '';
            width: 22px;
            height: 22px;
            background: #FFFFFF url('../../assets/Identifying-choice.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 0;
            right: 0;
          }
        }
        img {
          width: 24px;
          height: 24px;
          margin-top: 8px;
          vertical-align: top;
        }
        span {
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: rgba(0,0,0,0.87);
          margin-left: 8px;
        }
      }
    }
    .pay_bottom_bottom {
      width: 100%;
      display: flex;
      padding-left: 20px;
      box-sizing: border-box;
      // background: #FFEADA;
      .pay_bottom_dw {
        margin-top: 19px;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #FF7F4A;
        line-height: 20px;
      }
      .pay_bottom_price {
        margin-top: 9px;
        margin-left: 2px;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #FF7F4A;
        line-height: 33px;
      }
      .pay_bottom_oldPrice {
        margin-top: 20px;
        margin-left: 8px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #FFAD71;
        text-align: center;
        line-height: 18px;
        text-decoration: line-through;
      }
      .pay_bottom_icon{
        margin-left: 4px;
        margin-top: 17px;
        background: #FB5332;
        border-radius: 8px 12px 12px 0;
        width: 50px;
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #FFFFFF;
          text-align: center;
          transform: scale(0.83);
        }
      }
      .pay_bottom_empty {
        flex-grow: 1;
      }
      .pay_bottom_btn {
        padding-left: 52px;
        box-sizing: border-box;
        width: 142px;
        height: 48px;
        flex-shrink: 0;
        background: url('../../assets/payment-backg.png') center no-repeat;
        background-size: 100%;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #FFFFFF;
        text-align: left;
        line-height: 52px;
      }
    }
  }
}
</style>
