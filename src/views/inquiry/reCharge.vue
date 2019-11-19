<template>
  <div class="reChargeBox" >
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
        <div class="reCharge" @click="costomRecharge">
          <span>自定义充值</span>
          <img src="@/assets/ic_recharge_arrow_1@3x.png" alt="">
        </div>
      </div>
    </div>
    <div class="reChargeContainer">
      <div class="reChargeContent">
        <div class="reChargeLine" v-for="(item,index) in reChargeList" :key="index">
          <div class="detailContent">
            <img style="display:block;width: 28px;height: 28px;margin-right: 8px;" src="@/assets/ic_recharge @3x.png" alt="">
            <div class="detail">
              <span class="amount">{{item.rechargeAmount}}金币<span v-show="item.bonusAmount != 0" class="zeng">+{{item.bonusAmount}}赠币</span><img style="display:block;width:16px;height: 16px;margin-left: 4px;" v-show="item.recommendStatus == 2" src="@/assets/ic_hot@3x.png" alt="" srcset=""></span>
              <span class="txt">{{item.info}}</span>
            </div>
          </div>
          <div class="priceContent">
            <span class="price">￥{{item.rechargeAmount}}</span>
            <span class="rechargeBtn" @click="goPay(item)">充值</span>
          </div>
        </div>
      </div>
    </div>
    <van-dialog
      v-model="rechargeShow"
      title="自定义充值金额"
      show-cancel-button
      @confirm="reCharge"
      @cancel="rechargeShow = false"
      :before-close="beforeClose"
    >
      <div class="recharge_input_box">
        <div class="recharge_label">充值金额</div>
        <input class="recharge_input" type="text" v-model="rechargeNum" placeholder="请输入充值金额">
      </div>
    </van-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
import { Toast, Button, Dialog } from 'vant'
import api from '@/api/api'
import qs from 'qs'
Vue.use(Toast)
Vue.use(Button)
Vue.use(Dialog)
export default {
  data () {
    return {
      rechargeShow: false,
      rechargeNum: '',
      data: {
        balance: 0,
        bonusBalance: 0,
      },
      reChargeList: [
        {
          num: 1000,
          zeng: 500,
          isSong: false,
          isHot: false,
          txt: '暂无抽奖活动，敬请期待',
          price: 1000
        },
        {
          num: 2000,
          zeng: 500,
          isSong: true,
          isHot: false,
          txt: '暂无抽奖活动，敬请期待',
          price: 2000
        },
        {
          num: 2000,
          zeng: 500,
          isSong: true,
          isHot: true,
          txt: '暂无抽奖活动，敬请期待',
          price: 2000
        },
        {
          num: 10000,
          zeng: 1500,
          isSong: false,
          isHot: true,
          txt: '春节客户大回馈，充值688送68',
          price: 10000
        }
      ]
    }
  },
  created () {
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

    //充值套餐
    api.rechargePackage().then(res => {
      console.log(res)
      if(res.code == 0){
        this.reChargeList = res.data
      }
    })
  },
  methods: {
    costomRecharge() {
      sa.track('WebCheckOnTheRechargeBtn', {
        recharge_type: 'CUSTOM'
      })
      this.rechargeShow = true;
    },
    reCharge() {
      console.log(this.rechargeNum)
      if(!this.rechargeNum) {
        Toast('请先输入充值金额');
        return true;
      }
      if(/[^0-9]/.test(this.rechargeNum)) {
        Toast('充值金额必须为整数');
        return true;
      }
      if(this.rechargeNum < 3000 || this.rechargeNum > 50000) {
        Toast('充值金额范围为3000~50000');
        return true;
      }
      sa.track('WebCheckOnTheRechargeConfirm', {
        recharge_amount: 'CUSTOM'
      })
      let data = {
        rechargeAmount: this.rechargeNum,
        bonusAmount: 0,
        id: ''
      }
      this.goPay(data);
    },
    beforeClose(action, done) {
      if(action === 'confirm') {
        done(false);
      }else {
        done();
      }
    },
    binding () {
      
    },
    goBack () {
      window.history.back()
    },
    goPay(item){
      if(item.id) {
        sa.track('WebCheckOnTheRechargeBtn', {
          recharge_type: 'FIXED'
        })
      }
      localStorage.setItem('rechargeAmount', item.rechargeAmount);
      localStorage.setItem('bonusAmount', item.bonusAmount);
      this.$router.push({
          path: '/reChargePay',
          query: {
            id: item.id
          }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.reChargeBox{
  width: 100%;
  padding-bottom: 20px;
  .balanceContainer{
    width: 100%;
    background: #ffffff;
    padding-top: 16px;
    .balance{
      width: 328px;
      position: relative;
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
      .reCharge{
        position: absolute;
        display: flex;
        align-items: center;
        top: 12px;
        right: 12px;
        img{
          display: block;
          width: 12px;
          height: 12px;
          margin-left: 6px;
        }
        span{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #FFFFFF;
          text-align: center;
        }
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
  }
  .reChargeContainer{
    width: 100%;
    margin-top: 20px;
    background: #ffffff;
    .reChargeContent{
      width: 328px;
      margin-left: auto;
      margin-right: auto;
      .reChargeLine{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 64px;
        .detailContent{
          display: flex;
          align-items: center;
          .detail{
            display: flex;
            flex-flow: column;
            align-items: flex-start;
            .amount{
              display: flex;
              align-items: center;
              font-family: PingFangSC-Medium;
              font-size: 14px;
              color: rgba(0,0,0,0.87);
              text-align: left;
              line-height: 20px;
            }
            .txt{
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: rgba(0,0,0,0.26);
              line-height: 18px;
              display: block;
              margin-top: 2px;
              text-align: left;
            }
          }
        }
        .priceContent{
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .price{
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #FB5332;
            text-align: left;
            line-height: 20px;
            margin-right: 8px;
          }
          .rechargeBtn{
            background: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 56px;
            height: 28px;
            font-family: PingFangSC-Medium;
            font-size: 13px;
            color: #FFFFFF;
            line-height: 16px;
          }
        }
      }
    }
  }
  .recharge_input_box {
    padding: 16px;
    width: 100%;
    display: flex;
    align-items: center;
    .recharge_input {
      margin-left: 12px;
    }
  }
}
</style>
