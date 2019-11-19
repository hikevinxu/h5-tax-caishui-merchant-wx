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
        </div>
        <!-- <div class="data">
          <a id="call" style="font-family: PingFangSC-Regular;font-size: 14px;text-decoration: underline;" @click="call">{{data.phone}}</a>
        </div> -->
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
      <div class="btnContent" v-show="data.status == 2">
        <span class="offer" @click="baojia" style="background: #5AB3A4;">给客户报价</span>
      </div>
      <!-- <div class="btnContent" v-show="data.status == 3">
        <span class="offer" >我的报价为￥{{data.quotedPrice}}</span>
      </div>
      <div class="btnContent" v-show="data.status == 4 || data.status == 5">
        <span class="offer" style="background: rgba(0,0,0,0.26);font-family: PingFangSC-Medium;font-size: 16px;color: #FFFFFF;">已过期</span>
      </div> -->
    </div>
    <van-dialog
      v-model="show"
      title="反馈价格"
      show-cancel-button
      @confirm="sure"
      confirmButtonColor='#FF7F4A'
    >
      <input class="baojiaInput" v-model="price" type="number" placeholder="请输入反馈价格">
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
      show: false,
      price: null,
    }
  },
  created () {
    let intentionId = this.$route.query.intentionId
    if(intentionId) {
      this.intentionId = intentionId
      this.getDetail()
    }
  },
  methods: {
    getDetail () {
      let data = {
        intentionId: this.intentionId
        // intentionId: 1
      }
      // data = qs.stringify(data)
      api.intentionDetail(data).then(res => {
        console.log(res)
        if(res.code == 0){
          this.data = res.data
          this.data.extra = JSON.parse(this.data.extra)
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
        service_code: this.data.intentionCode,
        service_area: this.data.area
      })
      this.show = true
    },
    sure(){
      console.log(this.price)
      if(this.price == null || this.price <= 0){
        Toast('请输入大于零的正整数！')
        return
      }
      let data = {
        intentionId: this.intentionId,
        price: this.price
      }
      api.intentionQuotePrice(data).then(res => {
        this.show = false
        if(res.code == 0){
          Toast('报价成功')
          this.getDetail()
        }else {
          Toast(res.msg)
        }
      })
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
  .baojiaInput{
    height: 28px;
    padding-top: 13px;
    padding-bottom: 13px;
    width: 248px;
    outline: none;
    border-bottom: 1px solid rgba(0,0,0,0.04);
    margin-left: auto;
    margin-right: auto;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.60);
    margin-bottom: 16px;
  }
}
</style>
