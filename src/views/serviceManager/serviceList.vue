<template>
  <div class="serviceList_page">
    <div class="serviceList">
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item title="工商服务" name="1">
          <div class="collapse-item-body">
            <div class="content-item">
              <label>公司注册</label>
              <span class="up">已上架</span>
              <span class="down">已下架</span>
              <i><img src="@/assets/ic_chevron_right_small@3x.png" alt=""></i>
            </div>
            <div class="content-item">
              <label>公司注销</label>
              <span class="up">已上架</span>
              <span class="down">已下架</span>
              <i><img src="@/assets/ic_chevron_right_small@3x.png" alt=""></i>
            </div>
            <div class="content-item">
              <label>代理记账</label>
              <span class="up">已上架</span>
              <span class="down">已下架</span>
              <i><img src="@/assets/ic_chevron_right_small@3x.png" alt=""></i>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="代理记账" name="2">
          <div class="collapse-item-body">
            <div class="content-item">
              <label>公司注册</label>
              <span class="up">已上架</span>
              <span class="down">已下架</span>
              <i><img src="@/assets/ic_chevron_right_small@3x.png" alt=""></i>
            </div>
            <div class="content-item">
              <label>公司注册</label>
              <span class="up">已上架</span>
              <span class="down">已下架</span>
              <i><img src="@/assets/ic_chevron_right_small@3x.png" alt=""></i>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="税务筹划" name="3">
          <div class="collapse-item-body">
            <div class="content-item">
              <label>公司注册</label>
              <span class="up">已上架</span>
              <span class="down">已下架</span>
              <i><img src="@/assets/ic_chevron_right_small@3x.png" alt=""></i>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>
<script>

import Vue from 'vue'
import { Collapse, CollapseItem } from 'vant'
Vue.use(Collapse).use(CollapseItem)

export default {
  data() {
    return {
      activeNames: ['1']
    }
  }
}
</script>
<style lang="scss" scoped>
.serviceList_page {
  .serviceList {
    text-align: left;
    .collapse-item-body {
      margin: 0 16px;
      .content-item {
        height: 44px;
        label {
          float: left;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: rgba(0,0,0,0.60);
          text-align: left;
          line-height: 44px;
          margin-left: 4px;
        }
        span {
          float: left;
          padding: 0 6px;
          border-radius: 9px 10px 10px 0;
          font-family: PingFangSC-Regular;
          font-size: 11px;
          text-align: left;
          margin-left: 12px;
          margin-top: 13px;
        }
        .up {
          border: 1px solid #5AB3A4;
          color: #5AB3A4;
        }
        .down {
          border: 1px solid rgba(0,0,0,0.26);
          color: rgba(0,0,0,0.26);
        }
        i {
          float: right;
          width: 16px;
          height: 16px;
          margin-top: 14px;
          margin-right: 4px;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.serviceList_page {
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
  .serviceList {
    .van-collapse-item {
      .van-cell {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: rgba(0,0,0,0.87);
        text-align: left;
        padding: 14px 20px;
      }
      .van-collapse-item__content {
        padding: 0;
      }
      .van-cell:not(:last-child)::after {
        border: 0;
      }
      .van-cell__left-icon, .van-cell__right-icon {
        font-size: 12px;
      }
    }
  }
}
</style>

