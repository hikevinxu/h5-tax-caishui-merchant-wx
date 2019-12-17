<template>
  <div class="emptyList">
    <div class="picInfo">
      <img src="@/assets/img-no-result.png" alt="">
    </div>
    <div class="info">
      {{text}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'emptyList',
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.emptyList {
  padding-top: 40px;
  .picInfo {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    margin-top: 16px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(0,0,0,0.26);
    text-align: center;
    line-height: 18px;
  }
}
</style>
