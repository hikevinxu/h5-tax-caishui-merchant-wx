<template>
  <div class="phoneAuthentication" ref="loginPage">
    <img style="margin-top: 30px;" src="@/assets/ic_launcher.png" alt="">
    <div class="authentication">
      <div class="authenticationInput">
        <img src="@/assets/ic_form_cellnum.png">
        <input @focus="phoneFocus=true" @blur="scrollTop1" ref="login_input" type="number" maxlength="11" v-model="phone" placeholder="账号使用手机号" />
      </div>
      <div class="authenticationInput" v-if="!hasBind">
        <img src="@/assets/ic_form_code.png">
        <input @focus="codeFocus=true" @blur="scrollTop3" type="number" maxlength="4" v-model="code" placeholder="验证码" />
        <div class="line1"></div>
        <div class="login_code_btn" :class="{login_code_btn_send: !isSend}" id="getPhoneCode" @click.stop.prevent="getCode()">{{codeText}}</div>
      </div>
      <div class="authenticationInput">
        <img src="@/assets/ic_form_password.png">
        <input @focus="psdFocus=true" @blur="scrollTop2" type="password" maxlength="16" v-model="password" placeholder="密码, 6～16位数字字母组合" />
      </div>
      <p class="argument-agree" @click="changeAgree">
        <img class="check" src="@/assets/checkbox_on.png" v-if="isAgreement">
        <img class="check" src="@/assets/checkbox_off.png" v-else>
        <span>已阅读并同意<span @click.stop="goAgreement">《财税鱼商家助手服务协议》</span></span>
      </p>
      <div class="submit_btn" @click="binding">入驻&绑定</div>
    </div>
    <confirm :show.sync="showConfirm" content="当前是否前去商户认证？" cancelText="跳过" @confirm="confirm"></confirm>
  </div>  
</template>
<script>
import Vue from 'vue'
import { Toast, Button } from 'vant'
import api from '@/api/api'
import qs from 'qs'
import sa from 'sa-sdk-javascript'
import Confirm from '@/components/confirm'
import { getScript } from '@/utils/global.js'
Vue.use(Button)
export default {
  components: {
    Confirm
  },
  data () {
    return {
      phone: '',
      code: '',
      password: '',
      seconds: 60,
      again: true,
      phoneFocus: false,
      codeFocus: false,
      psdFocus: false,
      jumpUrlInfo: {},
      openId: '',
      hasBind: false,
      isAgreement: true,
      showConfirm: false,
      isSend: true,
      codeText: '获取验证码',
      timer: null
    }
  },
  computed: {
    isPhone() {
      return /^1([358][0-9]|4[56789]|6[67]|7[0135678]|9[189])\d{8}$/.test(this.phone);
    },
    isCode() {
      return /^[0-9]{4}$/.test(this.code)
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
            this.$nextTick(() => {
              this.setCaptcha();
            })
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
      this.$nextTick(() => {
        this.setCaptcha();
      })
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
      if (!this.isCode) {
        Toast('请输入4位数字验证码！')
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
      if(this.phoneFocus == false && this.psdFocus == false && this.codeFocus == false){
        window.scroll(0, 0);
      }
    },
    scrollTop2 () {
      this.psdFocus = false
      if(this.phoneFocus == false && this.psdFocus == false && this.codeFocus == false){
        window.scroll(0, 0);
      }
    },
    scrollTop3 () {
      this.codeFocus = false
      if(this.phoneFocus == false && this.psdFocus == false && this.codeFocus == false){
        window.scroll(0, 0);
      }
    },
    confirm() {
      this.$router.push('/renzheng');
    },
    setCaptcha(){
      getScript('//cstaticdun.126.net/load.min.js',()=>{
        this.initCaptcha()
      })
    },
    // 网易云盾初始化
    initCaptcha(){
      let self = this
      initNECaptcha({
        captchaId: '6404ded8c53b464c9f0071f415fbff01',
        element: '#getPhoneCode',
        mode: 'bind',
        width: 320,
        onVerify: function (err, data) {
          if(data){
            self.validate = data.validate
            self.sendPhoneCode()
          }
        }
      }, function onload (instance) {
        self.inst = instance
      }, function onerror (err) {
        Toast('验证码初始化失败，请刷新页面');
      })
    },
    sendPhoneCode() {
      if(this.isSend) {
        let data
        if(this.isPhone) {
          data = {
            userPhone: this.phone,
            validate: this.validate,
            platform: 'H5'
          }
        }else {
          Toast('请输入正确的手机号');
          return false;
        }
        let self = this;
        api.sendPhoneCodeV1(data).then(res => {
          if (res.code == 0) {
            this.hasCode = true;
            Toast('发送验证码成功');
            let seconds = 60;
            let getCode = function () {
              if (seconds > 0) {
                self.isSend = false;
                self.codeText = seconds + '秒';
                seconds--;
              } else {
                self.codeText = '已发送';
                clearInterval(self.timer);
                setTimeout(() => {
                  self.isSend = true;
                  self.codeText = '获取验证码'
                  self.initCaptcha();
                }, 1000)
              }
            }
            getCode();
            self.timer = setInterval(getCode, 1000);
          } else {
            Toast(res.msg)
          }
        })
      }
    },
    getCode(){
      sa.quick('trackHeatMap', document.getElementById('getPhoneCode'), {
        phone: this.phone
      })
      if(!this.isPhone) {
        this.$refs.login_input.focus();
        Toast('请输入正确的手机号后获取')
      }else {
        this.inst && this.inst.verify();
      }
    },
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
    margin: 0 24px;
    .authenticationInput {
      height: 48px;
      width: 100%;
      padding: 0 12px;
      box-sizing: border-box;
      margin-top: 16px;
      position: relative;
      background: #FAFAFA;
      border-radius: 4px;
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
      }
      input {
        margin-left: 12px;
        box-sizing: border-box;
        font-size: 14px;
        background-color: transparent;
        color: #fff;
        line-height: 20px;
        outline: none;
        font-family: PingFangSC-Regular;
        color: rgba(0,0,0,0.87);
      }
      .line1 {
        width: 1px;
        height: 24px;
        background: rgba(0,0,0,0.12);
        flex-shrink: 0;
      }
      .login_code_btn {
        margin-left: 16px;
        width: 66px;
        flex-shrink: 0;
        font-family: PingFangSC-Medium;
        font-size: 13px;
        color: #FFAD71;
        line-height: 16px;
        white-space: nowrap;
      }
      .login_code_btn_send {
        color: rgba(0, 0, 0, 0.26);
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
    .submit_btn {
      margin-top: 24px;
      width: 312px;
      height: 40px;
      background: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
      border-radius: 18px;
      font-family: PingFangSC-Medium;
      font-size: 15px;
      color: #FFFFFF;
      text-align: center;
      line-height: 40px;
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
