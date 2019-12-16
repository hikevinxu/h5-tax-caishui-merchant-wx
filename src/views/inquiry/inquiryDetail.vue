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
    <div class="footer">
      <div class="btnContent" v-show="data.status == 1">
        <span class="offer" @click="baojia">支付<span class="offerNum">({{data.price || ''}}金币)</span></span>
      </div>
      <!-- <div class="btnContent" v-show="data.status == 2 || data.status == 3">
        <span class="offer" @click="goDetail">查看详情</span>
      </div>
      <div class="btnContent" v-show="data.status == 4 || data.status == 5">
        <span class="offer" style="background: rgba(0,0,0,0.26);font-family: PingFangSC-Medium;font-size: 16px;color: #FFFFFF;">已过期</span>
      </div> -->
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
      showQrcode: false
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
      this.$router.push({ 
        path: '/pay',
        query: {
          intentionId: this.intentionId,
          price: this.data.price
        }
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
  padding-bottom: 52px;
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
}
</style>
