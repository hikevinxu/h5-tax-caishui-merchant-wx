<template>
  <div class="serviceEdit_page">
    <div class="form">
      <div class="form_item">
        <label>关联业务</label>
        <input readonly disabled v-model="service" @click="openSeviceDialog" type="text" placeholder="请选择关联业务">
        <span>
          <img src="@/assets/ic_chevron_right_small@3x.png" alt="">
        </span>
      </div>
      <div class="form_item">
        <label>服务区域</label>
        <input readonly disabled v-model="area" @click="areaShow = true" type="text" placeholder="请选择服务区域">
        <span>
          <img src="@/assets/ic_chevron_right_small@3x.png" alt="">
        </span>
      </div>
    </div>
    <div class="bottom_btn">
      <div class="bottom_btn_cancel" @click="cancelSave">取消</div>
      <div class="bottom_btn_save" @click="save">保存</div>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-picker show-toolbar title="关联业务" value-key="name" :columns="columns" @change="onChange" @cancel="cancel" @confirm="confirm" />
    </van-popup>
    <van-popup v-model="areaShow" position="bottom" :style="{ height: '50%' }">
      <area-Select :selectAreaList="areaList" @cancel="closeAreaDialog" @submit="selectAreaSubmit" />
    </van-popup>
  </div>
</template>
<script>

import areaSelect from '@/components/areaSelect/areaSelect'
import Vue from 'vue'
import { Popup, Picker, Toast } from 'vant'
Vue.use(Popup).use(Picker).use(Toast)
import globalApi from '@/api/globalApi'
import serviceApi from '@/api/serviceApi'

export default {
  components: {
    areaSelect
  },
  data() {
    return {
      service: '',
      serviceCode: '',
      area: '',
      areaList: [],
      title: '',
      show: false,
      areaShow: false,
      serviceDetail: {},
      columns: [],
      action: ''
    }
  },
  created() {
    this.getServiceTree()
    this.getDetail()
  },
  methods: {
    // 获取所有服务类目
    getServiceTree(){
      globalApi.serviceTypeTrees().then(res => {
        if(res.code == 0) {
          let citys = res.data
          this.columns = [
            {
              values: citys,
              className: 'column1',
              defaultIndex: 0
            },
            {
              values: citys[0].childs,
              className: 'column2',
              defaultIndex: 0
            }
          ]
        }
      })
    },
    // 获取详情
    getDetail() {
      if(this.$route.query.id) {
        let params = {
          id: this.$route.query.id
        }
        serviceApi.simpleServiceEdit(params).then(res => {
          if(res.code == 0){
            this.serviceDetail = res.data
            this.service = res.data.serviceType
            this.serviceCode = res.data.serviceCode
            this.title = res.data.title
            this.areaList = res.data.serviceDistrictList
            this.action = 'edit'
            if(this.areaList.length > 0) {
              this.area = '已选服务区域'
            }
          }
        })
      } else {
        this.action = 'created'
      }
    },
    openSeviceDialog() {
      if(this.action != 'edit'){
        this.show = true
      }
    },
    // 选择服务类目改变
    onChange(picker, values, index) {
      // console.log(values)
      // let ColumnIndex = picker.getColumnIndex(index)
      // console.log("第" + index + "列", "第" + ColumnIndex + "个")
      // console.log(values[ColumnIndex].children)
      picker.setColumnValues(index + 1, values[0].childs || [])
    },
    // 点击选择服务类目的 取消
    cancel() {
      this.show = false
    },
    // 点击选择服务类目的 确定
    confirm(values) {
      let arr = []
      for(let i=0;i<values.length; i++){
        arr.push(values[i].name)
      }
      this.service = arr.join('-')
      this.serviceCode = values[values.length - 1].code
      this.title = values[values.length - 1].name
      console.log(this.serviceCode)
      this.show = false
    },
    // 点击选择服务区域的 取消
    closeAreaDialog() {
      console.log(123)
      this.areaShow = false
    },
    // 点击选择服务区域的确定
    selectAreaSubmit(val) {
      console.log(456)
      this.areaList = val
      if(this.areaList.length > 0) {
        this.area = '已选服务区域'
      }
      console.log(this.areaList)
      this.areaShow = false
    },
    // 取消保存
    cancelSave() {
      this.$router.go(-1)
    },
    // 保存
    save() {
      if(this.$route.query.id) {
        // 更新老数据

        if(!this.serviceCode || this.serviceCode == ''){
          Toast('请先选择关联类目')
          return 
        }

        if(!this.areaList || this.areaList.length == 0){
          Toast('请先选择服务区域')
          return 
        }

        let params = {
          id: this.$route.query.id,
          serviceCode: this.serviceCode,
          serviceDistrictVos: this.areaList,
          title: this.title
        }
        serviceApi.simpleServiceUpdate(params).then(res => {
          if(res.code == 0){
            Toast('修改成功')
            this.$router.go(-1)
          }else if(res.code == 500) {
            Toast(res.msg)
          }
        })
      } else {
        // 保存新数据
        
        if(!this.serviceCode || this.serviceCode == ''){
          Toast('请先选择关联类目')
          return 
        }

        if(!this.areaList || this.areaList.length == 0){
          Toast('请先选择服务区域')
          return 
        }

        let params = {
          serviceCode: this.serviceCode,
          serviceDistrictVos: this.areaList,
          title: this.title
        }
        serviceApi.simpleServiceAdd(params).then(res => {
          if(res.code == 0){
            Toast('添加成功')
            this.$router.go(-1)
          } else if(res.code == 500) {
            Toast(res.msg)
          }
        })
      } 
    }
  }
}
</script>
<style lang="scss" scoped>
.serviceEdit_page {
  min-height: 100vh;
  background-color: #fafafa;
  position: relative;
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
<style lang="scss">
.serviceEdit_page {
  .van-picker-column__item {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.87);
    text-align: center;
    font-weight: 400;
  }
  .van-picker-column__item--selected {
    color: #FF7F4A;
  }
}
</style>
