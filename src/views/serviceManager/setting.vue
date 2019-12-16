<template>
  <div class="setting_page">
    <div class="menu">
      <div class="menu_item" @click="show = true">
        <div class="menu_item_inner">
          <label>更换手机号</label>
          <i><img src="@/assets/ic_chevron_right_small@3x.png" alt=""></i>
        </div>
      </div>
      <div class="menu_item">
        <div class="menu_item_inner">
          <label>解绑微信</label>
          <i><img src="@/assets/ic_chevron_right_small@3x.png" alt=""></i>
        </div>
      </div>
      <div class="menu_item">
        <div class="menu_item_inner">
          <label>修改密码</label>
          <i><img src="@/assets/ic_chevron_right_small@3x.png" alt=""></i>
        </div>
      </div>
    </div>
    <van-popup v-model="show" :close-on-popstate="true" :close-on-click-overlay="false" :round="true">
      <service-quote @cancel="show = false" @confirm="submit" />
    </van-popup>
  </div>
</template>
<script>

import serviceQuote from '@/components/serviceQuote/index'
import Vue from 'vue'
import { Popup } from 'vant'
Vue.use(Popup)

export default {
  components: {
    serviceQuote
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    submit() {

    }
  }
}
</script>
<style lang="scss" scoped>
.setting_page {
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
  .menu {
    background-color: #fff;
    .menu_item {
      padding: 0 16px;
      &:active {
        background-color: #f2f3f5;
      }
    }
    .menu_item_inner {
      height: 48px;
      display: flex;
      border-bottom: 1px solid rgba(0,0,0,0.04);
      label {
        display: block;
        flex: 1;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0,0,0,0.87);
        text-align: left;
        line-height: 48px;
        padding-left: 4px;
      }
      i {
        display: block;
        width: 16px;
        height: 16px;
        margin-right: 4px;
        margin-top: 16px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.setting_page {
  .van-popup {
    border-radius: 2px;
  }
}
</style>
