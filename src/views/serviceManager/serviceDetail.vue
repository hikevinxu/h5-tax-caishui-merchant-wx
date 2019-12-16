<template>
  <div class="serviceDetail_page">
    <div class="warning_head">
      <img src="@/assets/notice@3x.png" alt="">
      <span>只有下架服务，才能编辑服务内容哦～</span>
    </div>
    <div class="serviceDetail">
      <div class="serviceDetail_item">
        <label>业务状态</label>
        <span class="up">已上架</span>
        <!-- <span class="down">已下架</span> -->
      </div>
      <div class="serviceDetail_item">
        <label>关联业务</label>
        <span>工商服务-公司注册</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.serviceDetail_page {
  min-height: 100vh;
  background-color: #fafafa;
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
  }
}
</style>
