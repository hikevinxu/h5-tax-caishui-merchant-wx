<template>
  <div class="reChargePay" >
    <div class="amountContainer">
      <div class="amountContent">
        <div class="amountLine">
          <div class="label">
            <img src="@/assets/ic_coin_1@3x.png" alt="">
            <span>剩余币数</span>
          </div>
          <div class="amountNum">
            <span>金币:{{data.balance}}&nbsp;|&nbsp;赠币:{{data.bonusBalance}}</span>
          </div>
        </div>
        <div class="amountLine">
          <div class="label">
            <img src="@/assets/ic_coin_2@3x.png" alt="">
            <span>充值币数</span>
          </div>
          <div class="amountNum">
            <span>金币:{{rechargeAmount}}&nbsp;|&nbsp;赠币:{{bonusAmount}}</span>
          </div>
        </div>
        <div class="amountLine">
          <div class="label">
            <img src="@/assets/ic_coin_3@3x.png" alt="">
            <span>需支付金额（¥）</span>
          </div>
          <div class="amountNum">
            <span style="color: #FF7F4A;">{{rechargeAmount}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="payContainer">
      <div class="payContent">
        <h4>充值方式</h4>
        <div class="payList">
          <div class="payLine">
            <div class="label">
              <img src="@/assets/ic_wechat@3x.png" alt="">
              <span>微信支付</span>
            </div>
            <div class="choseContent">
              <span class="txt">推荐微信账号的用户使用</span>
              <img style="dispay:block;width: 18px;height: 18px;" v-show="wx" src="@/assets/ic_choice@3x.png" alt="">
              <div @click="choseWx">
                <img  style="dispay:block;width: 18px;height: 18px;" v-show="!wx" src="@/assets/ic_no_choice@3x.png" alt="">
              </div>
            </div>
          </div>
          <div class="payLine">
            <div class="label">
              <img src="@/assets/ic_zfb@3x.png" alt="">
              <span>支付宝支付</span>
            </div>
            <div class="choseContent">
              <span class="txt">推荐支付宝账号的用户使用</span>
              <img style="dispay:block;width: 18px;height: 18px;" v-show="zfb" src="@/assets/ic_choice@3x.png" alt="">
              <div @click="choseZfb">
                <img style="dispay:block;width: 18px;height: 18px;" v-show="!zfb"  src="@/assets/ic_no_choice@3x.png" alt="">
              </div>
            </div>
          </div>
          <div class="payLine">
            <div class="label">
              <img src="@/assets/ic_other@3x.png" alt="">
              <span>其他支付</span>
            </div>
            <div class="choseContent">
              <span class="txt">支持储蓄卡、信用卡</span>
              <img style="dispay:block;width: 18px;height: 18px;" v-show="other" src="@/assets/ic_choice@3x.png" alt="">
              <div @click="choseOther">
                <img  style="dispay:block;width: 18px;height: 18px;" v-show="!other" src="@/assets/ic_no_choice@3x.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="promptContainer">
      <div class="promptContent">
        <p>提示：<br />1.请使用您本人的银行卡<br />2.如您之前使用非本人身份证信息认证，请及时联系客服<br />3.金币不支持退款</p>
      </div>
    </div>
    <div class="footer" @click="recharge">
      <!-- <span class="nextBtn" >下一步</span> -->
      <van-button class="nextBtn" :disabled="payLoading" :loading="payLoading" loading-type="spinner" loading-text="正在发起支付..." type="primary">下一步</van-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Toast, Button } from 'vant'
import api from '@/api/api'
import qs from 'qs'
Vue.use(Button)
Vue.use(Toast)
export default {
  data () {
    return {
      data: {
        balance: 0,
        bonusBalance: 0
      },
      rechargeAmount: 0,
      bonusAmount: 0,
      packageId: undefined,
      zfb: false,
      wx: true,
      other: false,
      payLoading: false,
    }
  },
  created () {
    this.rechargeAmount  =  localStorage.getItem('rechargeAmount');
        this.bonusAmount = localStorage.getItem('bonusAmount');
        this.packageId = this.$route.query.id || null;
    // if(rechargeAmount){
    //   this.rechargeAmount = rechargeAmount,
    //   this.bonusAmount = bonusAmount,
    //   this.packageId = packageId
    // }else {
    //   this.rechargeAmount = 0,
    //   this.bonusAmount = 0
    //   this.packageId = ''
    // }

    //账户详情
    api.merchantDetail().then(res => {
      console.log(res)
      if(res.code == 0){
        this.data = res.data
        if(!res.data.bonusBalance){
          this.data.bonusBalance = 0
        }
      }
    })
  },
  methods: {
    choseZfb(){
      Toast('目前只支持微信充值')
    },
    choseWx(){
      this.zfb = false
      this.wx = true
      this.other = false
    },
    choseOther(){
      Toast('目前只支持微信充值')
    },
    recharge() {
      let data = {
        packageId: this.packageId,
        amount: this.rechargeAmount,
        bonusAmount: this.bonusAmount,
        payChannel: 'weixin',
        payType:  'weixin_jsapi'
      }
      this.payLoading = true
      let recharge = this.packageId ? 'recharge' : 'customRecharge'
      api[recharge](data).then(res =>{
        console.log(res)
        if(res.code == 0){
            let paySign = JSON.parse(res.data.paySign)
            let that = this
            that.payLoading = false
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
                Toast.success('支付成功！')
                let page = localStorage.getItem('page')
                setTimeout(() => {
                  // that.$router.replace({ path: '/pay' })
                  if(page == 'pay'){
                    that.$router.replace({ path: '/pay' })
                  }else if(page == 'myAccount'){
                    that.$router.replace({ path: '/myAccount' })
                  }
                },3000)
              }
              else if(res.err_msg == "get_brand_wcpay_request:cancel" ){
                // 使用以上方式判断前端返回,微信团队郑重提示：
                // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                Toast.fail('取消支付！')
                that.payLoading = false
              } 
              else if(res.err_msg == "get_brand_wcpay_request:fail" ){
                // 使用以上方式判断前端返回,微信团队郑重提示：
                // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                // getWeiXinConfig()
                Toast.fail('支付失败！')
                that.payLoading = false
              }
          })
        }
      })
      .catch(err => {
        Toast.fail('支付失败！')
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.reChargePay{
  width: 100%;
  padding-bottom: 52px;
  position: relative;
  .amountContainer{
    width: 100%;
    background: #ffffff;
    .amountContent{
      width: 328px;
      margin-left: auto;
      margin-right: auto;
      .amountLine{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 48px;
        .label{
          display: flex;
          align-items: center;
          img{
            display: block;
            width: 20px;
            height: 20px;
            margin-right: 8px;
          }
          span{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: rgba(0,0,0,0.60);
            text-align: left;
            line-height: 20px;
          }
        }
        .amountNum{
          display: flex;
          align-items: center;
          span{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: rgba(0,0,0,0.87);
            text-align: left;
            line-height: 20px;
          }
        }
      }
    }
  }
  .payContainer{
    width: 100%;
    background: #ffffff;
    .payContent{
      width: 328px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid rgba(0,0,0,0.04);
      h4{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(0,0,0,0.87);
        text-align: left;
        line-height: 20px;
      }
      .payList{
        width: 100%;
        margin-top: 8px;
        .payLine{
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 48px;
          .label{
            display: flex;
            align-items: center;
            img{
              display: block;
              width: 24px;
              height: 24px;
              margin-right: 8px;
            }
            span{
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: rgba(0,0,0,0.87);
              text-align: left;
              line-height: 20px;
            }
          }
          .choseContent{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .txt{
              display: block;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: rgba(0,0,0,0.26);
              text-align: left;
              line-height: 20px;
              margin-right: 13px;
            }
          }
        }
      }
    }
  }
  .promptContainer{
    width: 100%;
    background: #ffffff;
    .promptContent{
      width: 328px;
      text-align: left;
      margin-left: auto;
      margin-right: auto;
      margin-top: 8px;
      p{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(0,0,0,0.26);
        line-height: 22px;
      }
    }
  }
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .nextBtn{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 52px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #FFFFFF;
      border: none;
      background: #FF7F4A;
    }
  }
}
</style>
