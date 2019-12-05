<template>
  <div class="inquiryDetail" >
    <div class="inquiryDetail_top">
      <div class="inquiryDetail_top_text">询价单信息</div>
      <div :class="`inquiryDetail_top_type inquiryDetail_top_type${data.recommendTag}`" v-if="data.recommendTag">{{typeList[data.recommendTag - 1].name}}</div>
      <div style="flex: 1"></div>
      <img class="inquiryDetail_top_icon" v-if="data.status" :src="require(`@/assets/deal-${data.status}@3x.png`)">
      <div :class="`inquiryDetail_top_status inquiryDetail_top_status${data.status}`">{{statusList[data.status]}}</div>
    </div>
    <div class="inquiryData">
      <div class="line" v-if="data.status == 3">
        <span class="label">服务报价（￥）</span>
        <div class="data">
          <span class="dataDetail" style="color: rgb(251, 83, 50)">{{data.quotedPrice}}</span>
        </div>
      </div>
      <div class="line">
        <span class="label">客户称呼</span>
        <div class="data">
          <span class="dataDetail">{{data.name}}</span>
        </div>
      </div>
      <div class="line">
        <span class="label">联系电话</span>
        <div class="data" v-if="data.phone">
          <span style="font-family: PingFangSC-Regular;font-size: 14px;">{{data.phone}}</span>
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
    <div class="pay_bottom">
      <div class="pay_bottom_dw">¥</div>
      <div class="pay_bottom_price">{{data.price || 100}}</div>
      <div class="pay_bottom_oldPrice">原价：¥200</div>
      <div class="pay_bottom_icon">
        <p>限时特惠</p>
      </div>
      <div class="pay_bottom_empty"></div>
      <div class="pay_bottom_btn" @click="baojia">去支付</div>
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
      typeList: [
        {
          name: '客服推送',
          code: 1,
          childs: []
        }, {
          name: '超值',
          code: 2,
          childs: []
        }, {
          name: '准新',
          code: 3,
          childs: []
        }
      ],
      statusList: ['', '对接中', '已成交'],
    }
  },
  created () {

    let intentionId = this.$route.query.intentionId
    let origin = this.$route.query.origin
    if(intentionId) {
      this.intentionId = intentionId
      let data = {
        id: intentionId,
        origin,
      }
      api.clueDetail(data).then(res => {
        console.log(res)
        if(res.code == 0){
          this.data = res.data
        }
      })
      localStorage.setItem('intentionId', intentionId)
    }
    if(this.$route.query.code) {
      let params = {
        code: this.$route.query.code
      }
      api.weixinHasBind(params).then(res => {
        console.log(res)
        if(res.code == 0){
          this.openId = res.data.openId
          localStorage.setItem('openId',this.openId)
          if(res.data.hasBind == false){
            this.hasBind = false
            this.$router.push({ path: '/bindPhone' })
          }else {
            this.hasBind = true
            let merchant = res.data.merchant.id
            console.log(merchant)
            localStorage.setItem('merchant', merchant)
          }
        }
      })
      .catch((error) => {
          console.log(error)
      })
    }
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
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  .inquiryDetail_top {
    padding: 16px 16px 8px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    .inquiryDetail_top_text {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: rgba(0,0,0,0.87);
      text-align: left;
      flex-grow: 0;
    }
    .inquiryDetail_top_type {
      margin-left: 16px;
      border: 1px solid #FFAD71;
      padding: 0 6px;
      width: fit-content;
      border-radius: 100px 100px 100px 0;
      font-family: PingFangSC-Medium;
      font-size: 12px;
      color: #FFAD71;
      line-height: 18px;
    }
    .inquiryDetail_top_type1 {
      border: 1px solid #FFAD71;
      color: #FFAD71;
    }
    .inquiryDetail_top_type2 {
      border: 1px solid #FB5332;
      color: #FB5332;
    }
    .inquiryDetail_top_type3 {
      border: 1px solid #90D0FF;
      color: #90D0FF;
    }
    .inquiryDetail_top_icon {
      width: 20px;
      height: 20px;
      flex-grow: 0;
    }
    .inquiryDetail_top_status {
      margin-left: 8px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #5AB3A4;
      line-height: 22px;
      flex-grow: 0;
    }
    .inquiryDetail_top_status1 {
      color: #FF7F4A;
    }
    .inquiryDetail_top_status2 {
      color: #5AB3A4;
    }
  }
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
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    padding-left: 20px;
    box-sizing: border-box;
    background: #FFEADA;
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
      height: 52px;
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
</style>
