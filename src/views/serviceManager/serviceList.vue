<template>
  <div class="serviceList_page">
    <div class="serviceList" v-if="serviceList.length > 0">
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item v-for="(value, index) in serviceList" :key="index" :title="value.name" :name="value.name">
          <div class="collapse-item-body">
            <div v-for="(item, i) in value.childs" :key="i" class="content-item" @click="goDetail(item)">
              <label>{{item.serviceName}}</label>
              <span v-if="item.status == 1" class="up">已上架</span>
              <span v-else class="down">已下架</span>
              <i><img src="@/assets/ic_chevron_right_small@3x.png" alt=""></i>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div v-else>
      <emptyList text="暂未添加服务" />
    </div>
    <div class="addService" @click="addService">添加</div>
  </div>
</template>
<script>

import Vue from 'vue'
import { Collapse, CollapseItem } from 'vant'
Vue.use(Collapse).use(CollapseItem)
import serviceApi from '@/api/serviceApi'
import emptyList from '@/components/EmptyList/EmptyList'

export default {
  components: {
    emptyList
  },
  data() {
    return {
      activeNames: ["0"],
      serviceList: []
    }
  },
  created() {
    this.getAllService()
  },
  methods: {
    getAllService() {
      serviceApi.simpleServiceAll().then(res => {
        if(res.code == 0){
          let arr = []
          for (const key in res.data) {
            if (res.data.hasOwnProperty(key)) {
              arr.push({
                name: key,
                childs: res.data[key]
              })
            }
          }
          this.serviceList = arr.reverse()
          if (this.serviceList.length > 0) {
            this.activeNames = this.serviceList[0].name
          }
        }
      })
    },
    goDetail(item) {
      this.$router.push('/serviceDetail?id=' + item.id)
    },
    addService() {
      this.$router.push('/serviceEdit')
    }
  }
}
</script>
<style lang="scss" scoped>
.serviceList_page {
  position: relative;
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
  .addService {
    width: 100%;
    height: 48px;
    background: #FF7F4A;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 48px;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
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

