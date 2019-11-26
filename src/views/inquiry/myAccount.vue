<template>
  <div class="myAccount" >
    <div class="balanceContainer">
      <div class="balance">
        <h4>当前账户余额</h4>
        <div class="numLine">
          <div class="balanceNum">
            <span class="num">{{data.balance}}</span>
            <span class="txt">金币</span>
          </div>
          <div class="givingNum">
            <span class="num">{{data.bonusBalance}}</span>
            <span class="txt">赠币</span>
          </div>
        </div>
      </div>
      <div class="rechargeLine" @click="goRecharge">
        <div class="label">
          <img style="display:block;width: 22px;height: 22px;margin-right:8px" src="@/assets/ic_recharge @3x.png" alt="">
          <span>立即充值</span>
        </div>
        <img style="display:block;width: 12px;height: 12px;" src="@/assets/ic_recharge_arrow_2@3x.png" alt="">
      </div>
    </div>
    <div class="consumeContainer">
      <div class="consumeContent">
        <h4>消费记录</h4>
        <div class="consumeList" v-if="consumeList.length > 0">
          <div class="consume" v-for="(item,index) in consumeList" :key='index' @click="goDetail(item)">
            <div class="detailContent" >
              <img src="@/assets/buy.png" alt="" v-show="item.transactionType == 3 || item.transactionType == 6">
              <img src="@/assets/ic_platform@3x.png" alt="" v-show="item.transactionType == 1 || item.transactionType == 4 || item.transactionType == 2 ||item.transactionType == 5">
              <div class="detail" >
                <span class="detailTxt" v-show="item.transactionType == 3 || item.transactionType == 6">购买询价单</span>
                <span class="detailTxt" v-show="item.transactionType == 1 || item.transactionType == 4">平台充值</span>
                <span class="detailTxt" v-show="item.transactionType == 2 || item.transactionType == 5">平台赠送</span>
                <span class="date">{{item.createTime}}</span>
              </div>
            </div>
            <div class="amount" v-show="item.transactionType == 3 || item.transactionType == 6">
              <span style="color: rgba(0,0,0,0.87);" v-show="item.accountType == 1">-{{item.amount}}金币</span>
              <span style="color: rgba(0,0,0,0.87);" v-show="item.accountType == 2">-{{item.amount}}赠币</span>
              <img style="display: block;width:16px; height: 16px;" src="@/assets/ic_chevron_right_small@3x.png" alt="">
            </div>
            <div class="amount add" v-show="item.transactionType == 2 || item.transactionType == 5">
              <span style="color: #FF7F4A;">+{{item.amount}}赠币</span>
            </div>
            <div class="amount add" v-show="item.transactionType == 1 || item.transactionType == 4">
              <span style="color: #FF7F4A;">+{{item.amount}}金币</span>
            </div>
          </div>
        </div>
        <div class="consult_none" v-else>
          <img class="consult_none_icon" src="@/assets/advisory-details.png">
          <div class="consult_none_text">暂无记录</div>
        </div>
        <div class="load_more" @click="loadingMore" v-show="showLoad &&!noMore">
            <span v-show="!loading_more">点击加载更多</span>
            <van-loading style="width: 10px;" v-show="loading_more == true" type="spinner" />
        </div>
        <div class="load_more" v-show="showLoad && noMore">
            <span>已经到底了</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let pageNum = 1;
import Vue from 'vue'
import { Toast, Button, Loading } from 'vant'
import api from '@/api/api'
import qs from 'qs'
import sa from 'sa-sdk-javascript'
Vue.use(Button)
Vue.use(Loading);
export default {
  data () {
    return {
      intentionId: 1,
      data: {
        balance: 0,
        bonusBalance: 0
      },
      consumeList: [],
      total: 0,
      showLoad: false,
      noMore: false,
      loading: false,
      loading_more: false,
    }
  },
  created () {
    if(localStorage.getItem('merchant')) {
      this.merchantDetail();
      this.merchantTransactionList();
    }else {
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
            this.merchantDetail();
            this.merchantTransactionList();
          }
        }
      })
    }
  },
  methods: {
    //账户详情
    merchantDetail() {
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
    merchantTransactionList() {
      let data = {
        pageNum: pageNum,
        pageSize: 10,
        shelf: false
      }
      this.loading = true
      this.noMore = false
      api.merchantTransactionList(data).then(res => {
        console.log(res)
        if(res.code == 0){
          this.consumeList = res.data.items
          this.total = res.data.total
          if(res.data.total <= 10){
              this.showLoad = false
          }else{
              this.showLoad = true
          }
        }
      })
    },
    goRecharge() {
      this.$router.push({ path: '/reCharge' })
      localStorage.setItem('page','myAccount')
    },
    goDetail(item){
      console.log(item)
      if(item.transactionType == 3){
        this.$router.push({
          path: '/inquiryDetail',
          query: {
            intentionId: item.intentionId
          }
        })
      }else {
        return
      }
    },
    loadingMore() {
      pageNum ++
      this.loading_more = true
      let data = {
        pageNum: pageNum,
        pageSize: 10,
        shelf: false
      }
      console.log(data)
      api.merchantTransactionList(data).then(res => {
        console.log(res)
        if(res.code == 0){
          this.consumeList = this.consumeList.concat(res.data.items)
          this.total = res.data.total
          this.loading_more = false
          if(res.data.items.length < 10){
              this.noMore = true
          }else{
              this.noMore = false
          }
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.myAccount{
  width: 100%;
  // height: 100vh;
  display: flex;
  flex-direction: column;
  // padding-bottom: 20px;
  .balanceContainer{
    width: 100%;
    background: #ffffff;
    padding-top: 16px;
    .balance{
      width: 328px;
      padding-top: 20px;
      padding-bottom: 30px;
      background: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
      box-shadow: 0 8px 16px 0 #FBEADD;
      border-radius: 4px;
      margin-left: auto;
      margin-right: auto;
      h4{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(255,255,255,0.74);
        text-align: left;
        margin-left: 16px;
      }
      .numLine{
        display: flex;
        align-items: center;
        margin-left: 16px;
        margin-top: 10px;
        .balanceNum,.givingNum{
          display: flex;
          align-items: flex-end;
          .num{
            font-family: PingFangSC-Medium;
            font-size: 30px;
            color: #FFFFFF;
            text-align: center;
            line-height: 30px;
            display: block;
            margin-right: 4px;
          }
          .txt{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
            text-align: center;
            display: block;
            line-height: 1.5;
          }
        }
        .balanceNum{
          border-right: 1px solid #ffffff;
          padding-right: 12px;
        }
        .givingNum{
          padding-left: 12px;
        }
      }
    }
    .rechargeLine{
      width: 328px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: auto;
      margin-right: auto;
      margin-top: 20px;
      padding-bottom: 7px;
      border-bottom: 1px solid rgba(0,0,0,0.04);
      .label{
        display: flex;
        align-items: center;
        span{
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #FF7F4A;
          text-align: center;
        }
      }
    }
  }
  .consumeContainer{
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    .consumeContent{
      width: 328px;
      // height: 100%;
      padding-top: 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
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
        .consume{
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          .detailContent{
            display: flex;
            align-items: center;
            img{
              display: block;
              width: 24px;
              height: 24px;
              margin-right: 12px;
            }
            .detail{
              display: flex;
              flex-flow: column;
              align-items: flex-start;
              .detailTxt{
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: rgba(0,0,0,0.87);
                text-align: left;
                line-height: 20px;
              }
              .date{
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: rgba(0,0,0,0.26);
                text-align: right;
                line-height: 18px;
              }
            }
          }
          .amount{
            display: flex;
            align-items: center;
            img{
              margin-left: 4px;
            }
          }
          .add{
            margin-right: 20px;
          }
        }
      }
      .consult_none {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .consult_none_icon {
          margin: 0 auto;
          width: 80px;
          height: 80px;
          display: block;
        }
        .consult_none_text {
          margin-top: 16px;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: rgba(0,0,0,0.38);
          line-height: 28px;
          text-align: center;
        }
      }
      .load_more{
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        height: 40px;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        // margin-top: 16px;
        // border-bottom: 1px solid rgba(0,0,0,0.04);
        cursor: pointer;
        span{
            font-size: 14px;
            color: rgba(0,0,0,0.60);
        }
      }
    }
  }
}
</style>
