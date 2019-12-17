<template>
  <div class="serviceDetail_page">
    <div class="warning_head">
      <img src="@/assets/notice@3x.png" alt="">
      <span>只有下架服务，才能编辑服务内容哦～</span>
    </div>
    <div class="serviceDetail">
      <div class="serviceDetail_item">
        <label>业务状态</label>
        <span v-if="serviceDetail.status == 1" class="up">已上架</span>
        <span v-else class="down">已下架</span>
      </div>
      <div class="serviceDetail_item">
        <label>关联业务</label>
        <span>{{serviceDetail.serviceType}}</span>
      </div>
      <div class="serviceDetail_item areaList">
        <label>服务区域</label>
        <div class="provinceList" v-for="(province, pIndex) in provinceList" :key="pIndex">
          <div class="cityList">
            <span>{{province.name}}</span>
            <div class="area">
              <b v-for="(city, cIndex) in province.childs" :key="cIndex">{{city.name}}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_btn">
      <div v-if="serviceDetail.status == 1" style="width: 100%;" class="bottom_btn_save" @click="down">下架</div>
      <div v-if="serviceDetail.status != 1" class="bottom_btn_cancel" @click="up">上架</div>
      <div v-if="serviceDetail.status != 1" class="bottom_btn_save" @click="edit">编辑</div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
import serviceApi from '@/api/serviceApi'
export default {
  data() {
    return {
      serviceDetail: {},
      provinceList: []
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      let params = {
        id: this.$route.query.id
      }
      serviceApi.simpleServiceEdit(params).then(res => {
        if(res.code == 0){
          this.serviceDetail = res.data
          for(let i=0;i<this.serviceDetail.serviceDistrictTree.length;i++) {
            if(this.serviceDetail.serviceDistrictTree[i].code == 'INT156') {
              this.provinceList = this.serviceDetail.serviceDistrictTree[i].childs
            }
          }
        }else if(res.code == 500) {
          Toast(res.msg)
        }
      })
    },
    // 下架
    down() {
      let parmas = {
        id: this.$route.query.id
      }
      serviceApi.serviceShelfDown(parmas).then(res => {
        if(res.code == 0){
          Toast('服务已下架')
          this.getDetail()
        }else if(res.code == 500) {
          Toast(res.msg)
        }
      })
    },
    // 上架
    up() {
      let parmas = {
        id: this.$route.query.id
      }
      serviceApi.serviceShelfUp(parmas).then(res => {
        if(res.code == 0){
          Toast('服务已上架')
          this.getDetail()
        }else if(res.code == 500) {
          Toast(res.msg)
        }
      })
    },
    // 编辑
    edit() {
      if(this.serviceDetail.status != 1) {
        this.$router.push('/serviceEdit?id=' + this.$route.query.id)
      } else {
        Toast('请先下架当前服务')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.serviceDetail_page {
  min-height: 100vh;
  background-color: #FFFFFF;
  padding-bottom: 50px;
  box-sizing: border-box;
  position: relative;
  .warning_head {
    width: 100%;
    height: 40px;
    background: #FFEFE3;
    text-align: left;
    box-sizing: border-box;
    padding: 0 16px;
    img {
      width: 18px;
      height: 18px;
      vertical-align: top;
      margin-top: 11px;
    }
    span {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #FF7F4A;
      line-height: 40px;
      margin-left: 8px;
    }
  }
  .serviceDetail {
    padding: 0 16px;
    box-sizing: border-box;
    background-color: #fff;
    .serviceDetail_item {
      height: 48px;
      line-height: 48px;
      border-bottom: 1px solid rgba(0,0,0,0.04);
      font-family: PingFangSC-Regular;
      text-align: left;
      display: flex;
      label {
        display: block;
        width: 80px;
        margin-left: 4px;
        font-size: 14px;
        color: rgba(0,0,0,0.60);
      }
      span {
        display: block;
        flex: 1;
        text-align: right;
        margin-right: 4px;
        font-size: 14px;
        color: rgba(0,0,0,0.87);
      }
      .up {
        color: #5AB3A4;
      }
      .down {
        color: #5AB3A4;
      }
    }
    .areaList.serviceDetail_item {
      display: block;
      height: auto;
      label { 
        width: 100%;
      }
      .provinceList {
        text-align: left;
        span {
          text-align: left;
          height: 44px;
          line-height: 44px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: rgba(0,0,0,0.87);
          text-align: left;
          margin-left: 4px;
        }
        .cityList {
          width: 100%;
          border-radius: 1px;
          box-sizing: border-box;
          margin-bottom: 8px;
          >span {
            height: 20px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: rgba(0,0,0,0.87);
            text-align: left;
            line-height: 20px;
            margin-left: 4px;
          }
          .area {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: rgba(0,0,0,0.87);
            text-align: left;
            line-height: 20px;
            margin-top: 8px;
            overflow: hidden;
            b {
              display: block;
              float: left;
              width: auto;
              font-weight: 400;
              background: #FAFAFA;
              border-radius: 1px;
              padding: 6px 8px;
              margin-right: 12px;
              margin-bottom: 8px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: rgba(0,0,0,0.60);
            }
          }
        }
      }
    }
  }
  .bottom_btn {
    width: 100%;
    height: 48px;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    .bottom_btn_cancel,
    .bottom_btn_save {
      height: 100%;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      text-align: center;
      line-height: 48px;
      position: relative;
      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background-color: #000;
        border: inherit;
        border-color: #000;
        border-radius: inherit;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        opacity: 0;
        content: '';
      }
      &:active::before {
        opacity: 0.1;
      }
    }
    .bottom_btn_cancel {
      width: 160px;
      background: #FFEADA;
      color: #FF7F4A;
    }
    .bottom_btn_save {
      flex: 1;
      background-image: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
      color: #FFF;
    }
  }
}
</style>
