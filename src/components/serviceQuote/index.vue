<template>
  <div class="serviceQuote_component">
    <div class="serviceQuote_title">服务报价</div>
    <div class="serviceQuote_info">请提服务报价供用户参考！</div>
    <div class="serviceQuote_input">
      <input type="number" v-model="price" placeholder="请输入反馈价格">
    </div>
    <div class="serviceQuote_btn">
      <div class="serviceQuote_btn_cancel" @click="cancel">取消</div>
      <div class="serviceQuote_btn_submit" @click="confirm">确定</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      price: ''
    }
  },
  created() {

  },
  methods: {
    cancel() {
      this.price = ''
      this.$emit('cancel')
    },
    confirm() {
      this.$emit('confirm', this.price)
    }
  }
}
</script>
<style lang="scss" scoped>
.serviceQuote_component {
  width: 296px;
  height: 222px;
  box-sizing: border-box;
  padding-top: 24px;
  background-color: #fff;
  .serviceQuote_title {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: rgba(0,0,0,0.87);
    text-align: center;
    line-height: 22px;
  }
  .serviceQuote_info {
    margin: 0 24px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.60);
    text-align: left;
    line-height: 20px;
    margin-top: 16px;
  }
  .serviceQuote_input {
    height: 44px;
    margin: 0 24px;
    input {
      display: block;
      width: 100%;
      font-family: PingFangSC-Regular;
      box-sizing: border-box;
      font-size: 14px;
      color: rgba(0,0,0,0.87);
      padding: 12px 0;
      line-height: 20px;
      outline: none;
      text-align: left;
      border-bottom: 1px solid rgba(0,0,0,0.04);
    }
  }
  .serviceQuote_btn {
    margin: 0 24px;
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    .serviceQuote_btn_submit,
    .serviceQuote_btn_cancel {
      width: 116px;
      height: 40px;
      box-sizing: border-box;
      border: 1px solid #FF7F4A;
      border-radius: 2px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #FF7F4A;
      text-align: center;
      line-height: 40px;
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
        content: ' ';
      }
      &:active::before {
        opacity: 0.1;
      }
    }
    .serviceQuote_btn_submit {
      border: 0;
      background-image: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
      border-radius: 2px;
      color: #fff;
    }
  }
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.26);
    text-align: left;
    line-height: 20px;
  }

  input:-moz-placeholder, textarea:-moz-placeholder {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.26);
    text-align: left;
    line-height: 20px;
  }

  input::-moz-placeholder, textarea::-moz-placeholder {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.26);
    text-align: left;
    line-height: 20px;
  }

  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.26);
    text-align: left;
    line-height: 20px;
  }
}
</style>
