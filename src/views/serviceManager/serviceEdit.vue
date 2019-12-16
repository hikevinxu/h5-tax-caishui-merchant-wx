<template>
  <div class="serviceEdit_page">
    <div class="form">
      <div class="form_item">
        <label>关联业务</label>
        <input readonly v-model="service" @click="show = true" type="text" placeholder="请选择关联业务">
        <span>
          <img src="@/assets/ic_chevron_right_small@3x.png" alt="">
        </span>
      </div>
      <div class="form_item">
        <label>服务区域</label>
        <input readonly v-model="area" @click="areaShow = true" type="text" placeholder="请选择服务区域">
        <span>
          <img src="@/assets/ic_chevron_right_small@3x.png" alt="">
        </span>
      </div>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-picker show-toolbar title="关联业务" :columns="columns" @change="onChange" @cancel="cancel" @confirm="confirm" />
    </van-popup>
    <van-popup v-model="areaShow" position="bottom" :style="{ height: '50%' }">
      <area-Select />
    </van-popup>
  </div>
</template>
<script>

import areaSelect from '@/components/areaSelect/areaSelect'
import Vue from 'vue'
import { Popup, Picker } from 'vant'
Vue.use(Popup).use(Picker)

const citys = [
  {
    text: '工商服务',
    id: 1,
    children: [
      {
        id: 11,
        text: '公司注册'
      },
      {
        id: 12,
        text: '公司注销'
      },
      {
        id: 13,
        text: '代理记账'
      }
    ]
  },
  {
    text: '企业服务',
    id: 2,
    children: [
      {
        id: 21,
        text: '企业纳税'
      },
      {
        id: 22,
        text: '企业挂靠'
      },
      {
        id: 23,
        text: '企业风评'
      }
    ]
  }
]

export default {
  components: {
    areaSelect
  },
  data() {
    return {
      service: '',
      area: '已选服务区域',
      show: false,
      areaShow: false,
      columns: [
        {
          values: citys,
          className: 'column1',
          defaultIndex: 0
        },
        {
          values: citys[0].children,
          className: 'column2',
          defaultIndex: 0
        }
      ]
    }
  },
  created() {

  },
  methods: {
    getCityTrees() {
      
    },
    onChange(picker, values, index) {
      console.log(values)
      // let ColumnIndex = picker.getColumnIndex(index)
      // console.log("第" + index + "列", "第" + ColumnIndex + "个")
      // console.log(values[ColumnIndex].children)
      picker.setColumnValues(index + 1, values[0].children || [])
    },
    cancel() {
      this.show = false
    },
    confirm(values) {
      console.log(values)
      let arr = []
      for(let i=0;i<values.length; i++){
        arr.push(values[i].text)
      }
      this.service = arr.join('-')
      this.show = false
    }
  }
}
</script>
<style lang="scss" scoped>
.serviceEdit_page {
  min-height: 100vh;
  background-color: #fafafa;
  .form {
    background-color: #fff;
    padding: 0 16px;
    .form_item {
      display: flex;
      height: 48px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: rgba(0,0,0,0.60);
      text-align: left;
      border-bottom: 1px solid rgba(0,0,0,0.04);
      label {
        display: block;
        width: 80px;
        text-align: left;
        line-height: 48px;
        margin-left: 4px;
      }
      input {
        flex: 1;
        display: block;
        font-family: PingFangSC-Regular;
        box-sizing: border-box;
        font-size: 14px;
        color: rgba(0,0,0,0.87);
        padding: 14px 8px;
        line-height: 20px;
        outline: none;
        text-align: right;
      }
      span {
        display: block;
        width: 16px;
        height: 16px;
        margin-top: 16px;
        margin-right: 4px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.26);
    text-align: right;
    line-height: 20px;
  }

  input:-moz-placeholder, textarea:-moz-placeholder {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.26);
    text-align: right;
    line-height: 20px;
  }

  input::-moz-placeholder, textarea::-moz-placeholder {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.26);
    text-align: right;
    line-height: 20px;
  }

  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.26);
    text-align: right;
    line-height: 20px;
  }
}
</style>
