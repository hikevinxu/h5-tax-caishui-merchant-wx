<template>
  <div class="payResult" >
    <div class="payContent" v-show="status == 1">
      <img src="@/assets/img_page_complete@2x.png" alt="">
      <h2>购买成功</h2>
      <span>恭喜您成功购买该询价单</span>
      <span>请尽快<span style="color: #FF7F4A;">反馈</span>报价结果</span>
    </div>
    <div class="payContent" v-show="status == 2">
      <img src="@/assets/img_page_complete@2x.png" alt="">
      <h2>充值成功</h2>
      <span>恭喜您已成功充值金币</span>
      <span>当前余额为<span style="color: #FF7F4A;">1200金币200赠币</span></span>
    </div>
    <div class="payContent" v-show="status == 3">
      <img src="@/assets/img_page_failed@2x.png" alt="">
      <h2>支付失败</h2>
      <span>很抱歉，您因***未成功购买该询价单</span>
      <span>请尽快重试，以免错失抢单时机</span>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Toast, Button } from 'vant'
import api from '@/api/api'
import qs from 'qs'
import { setTimeout } from 'timers';
Vue.use(Button)
export default {
  data () {
    return {
      status: 1
    }
  },
  created () {
    let params = {
      code: this.$route.query.code
    }
    console.log(params)
    let that = this
    let intentionId = localStorage.getItem('intentionId')
    setTimeout(() => {
      that.$router.push({
        path: '/feedback',
        query: {
          intentionId: intentionId
        }
      })
    },3000)
  },
  methods: {
    binding () {
      
    },
    goBack () {
      window.history.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.payResult{
  width: 100%;
  height: 100vh;
  .payContent{
    width: 100%;
    padding-top: 80px;
    display: flex;
    flex-flow: column;
    align-items: center;
    img{
      display: block;
      width: 120px;
      height: 120px;
    }
    h2{
      font-family: PingFangSC-Medium;
      font-size: 20px;
      color: rgba(0,0,0,0.87);
      text-align: center;
      line-height: 22px;
      margin-top: 16px;
      margin-bottom: 8px;
    }
    span{
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: rgba(0,0,0,0.38);
      text-align: center;
      line-height: 22px;
    }
  }
}
</style>
