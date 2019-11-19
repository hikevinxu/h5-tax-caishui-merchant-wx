<template>
  <div class="phoneAuthentication" ref="loginPage">
    <img style="margin-top: 30px;" src="@/assets/ic_launcher.png" alt="">
    <div class="authentication">
      <div class="authenticationInput">
        <input :class="phoneFocus ? 'btFocus': ''" @focus="phoneFocus=true" @blur="scrollTop1" type="text" maxlength="11" v-model="phone" placeholder="商户后台登录手机号" />
      </div>
      <div class="authenticationInput">
        <input :class="psdFocus ? 'btFocus': ''" @focus="psdFocus=true" @blur="scrollTop2" type="password" maxlength="16" v-model="password" placeholder="商户后台登录密码" />
      </div>
      <p class="argument-agree" @click="changeAgree">
        <img class="check" src="@/assets/checkbox_on.png" v-if="isAgreement">
        <img class="check" src="@/assets/checkbox_off.png" v-else>
        <span>已阅读并同意<span @click.stop="goAgreement">《财税鱼商家助手服务协议》</span></span>
      </p>
      <div class="authenticationBtn">
        <van-button class="btn" plain type="primary" @click="binding">确定</van-button>
      </div>
    </div>
  </div>  
</template>
<script>
import Vue from 'vue'
import { Toast, Button } from 'vant'
import api from '@/api/api'
import qs from 'qs'
import sa from 'sa-sdk-javascript'
Vue.use(Button)
export default {
  data () {
    return {
      phone: '',
      password: '',
      seconds: 60,
      again: true,
      phoneFocus: false,
      psdFocus: false,
      jumpUrlInfo: {},
      openId: '',
      hasBind: false,
      isAgreement: true
    }
  },
  created () {
    
    let code = this.$route.query.code
    if(code){
      let params = {
        code: this.$route.query.code
      }
      console.log(params)
      api.weixinHasBind(params).then(res => {
        console.log(res)
        if(res.code == 0){
          this.openId = res.data.openId
          localStorage.setItem('openId',this.openId)
          if(res.data.hasBind == false){
            this.hasBind = false
          }else {
            this.hasBind = true
            let merchant = res.data.merchant.id
            localStorage.setItem('merchant', merchant)
            this.$router.replace({ path: '/success' })
          }
        }
      })
      .catch((error) => {
          console.log(error)
      })
    }else {
      let openId = localStorage.getItem('openId')
      this.openId = openId
    }
  },
  methods: {
    changeAgree() {
      this.isAgreement = !this.isAgreement;
    },
    goAgreement() {
      this.$router.push('/agreement');
    },
    binding () {
      if(this.hasBind == true){
        Toast('您的微信号已经绑定过商户！')
        return
      }
      if (this.phone.length !== 11) {
        Toast('请输入11位合法手机号！')
        return
      }
      if (this.password == '' && this.password == undefined) {
        Toast('请输入密码！')
        return
      }
      if (!this.isAgreement) {
        Toast('请先阅读并同意服务协议！')
        return
      }
      let params = {
        openId: this.openId,
        password: this.password,
        phone: this.phone
      }
      // let paramsString = qs.stringify(params)
      console.log(params)
      api.weixinBindPhone(params).then(res => {
        console.log(res)
        if (res.code == 0) {
          Toast('绑定成功')
          this.$router.push({ path: '/success' })
        }else {
          Toast(res.msg)
        }
      })
    },
    goBack () {
      window.history.back()
    },
    scrollTop1 () {
      this.phoneFocus = false
      if(this.phoneFocus == false && this.psdFocus == false){
        window.scroll(0, 0);
      }
    },
    scrollTop2 () {
      this.psdFocus = false
      if(this.phoneFocus == false && this.psdFocus == false){
        window.scroll(0, 0);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.phoneAuthentication {
  .header {
    height: 56px;
    line-height: 56px;
    font-weight: 500;
    font-size: 16px;
    background-color: #fff;
    .back {
      position: absolute;
      top: 0;
      left: 0;
      width: 24px;
      height: 24px;
      margin-top: 16px;
      margin-left: 16px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .warningInfo {
    display: block;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(0,0,0,0.60);
    text-align: left;
    line-height: 18px;
    margin-top: 32px;
    margin-left: 35px;
  }
  .authentication {
    padding: 8px 0;
    margin: 0 32px;
    .authenticationInput {
      height: 48px;
      width: 100%;
      margin-top: 16px;
      position: relative;
      input {
        height: 48px;
        width: 100%;
        box-sizing: border-box;
        padding: 15px 8px;
        font-size: 16px;
        background-color: transparent;
        color: #fff;
        line-height: 22px;
        outline: none;
        border-bottom: 1px solid rgba(0,0,0,0.26);
        font-family: PingFangSC-Regular;
        color: rgba(0,0,0,0.87);
      }
      .btFocus {
        border-bottom: 2px solid #ffad71;
      }
      .getYZM {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #ffad71;
        text-align: right;
        line-height: 18px;
        position: absolute;
        bottom: 15px;
        right: 8px;
      }
      .countdown {
        color: rgba(0,0,0,0.26);
      }
    }
    .authenticationBtn {
      margin-top: 32px;
      .btn {
        width: 100%;
        height: 36px;
        background: linear-gradient(135deg,#ffad71,#ff7f4a);
        border-radius: 2px;
        border: 0;
        font-family: PingFangSC-Medium;
        font-size: 15px;
        color: #FFFFFF;
        text-align: center;
        line-height: 18px;
      }
    }
  }
}
#captcha {
  width: 320px;
  height: 40px;
}
.argument-agree {
  margin-top: 24px;
  width: 100%;
  display: flex;
  // justify-content: center;
  .check {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
  span {
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: rgba(0,0,0,0.26);
    text-align: center;
    line-height: 16px;
  }
}
</style>
