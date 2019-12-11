<template>
  <div id="app" class="">
    <keep-alive :include="keepAlive">
      <router-view  :reload="getData"/>
    </keep-alive>
    <div class="tab" :class="{tab_bottom: isIphoneX}" v-show="tabName.includes($route.name)">
      <div class="tab_item" @click="tabClick('hall')">
        <img class="tab_icon" :src="$route.name == 'hall' ? require('@/assets/tab-demand@3x.png') : require('@/assets/tab-nodemand@3x.png')">
        <div class="tab_name":class="{highLight: $route.name == 'hall'}">需求大厅</div>
      </div>
      <div class="tab_item" @click="tabClick('clue')">
        <img class="tab_icon" :src="$route.name == 'clue' ? require('@/assets/tab-clues@3x.png') : require('@/assets/tab-noclues@3x.png')">
        <div class="tab_name":class="{highLight: $route.name == 'clue'}">我的线索</div>
      </div>
      <div class="tab_item" @click="tabClick('mine')">
        <img class="tab_icon" :src="$route.name == 'mine' ? require('@/assets/tab-mine@3x.png') : require('@/assets/tab-nomine@3x.png')">
        <div class="tab_name" :class="{highLight: $route.name == 'mine'}">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keepAlive: ['login', 'clue', 'hall', 'mine'],
      tabName: ['hall', 'clue', 'mine'],
      getData: 0
    }
  },
  watch: {
    '$route.name': function(newVal, oldVal) {
      if(newVal == 'hall' && oldVal == 'detail') {
        this.getData += 1;
      }
    }
  },
  computed: {
    isIphoneX(){
      return /iphone/gi.test(navigator.userAgent) && ((screen.height == 812 && screen.width == 375) || (screen.height == 896 && screen.width == 414))
    }
  },
  methods: {
    tabClick(name) {
      this.$router.replace({
        name,
      })
    }
  }
}
</script>

<style lang="scss">
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){

  /*增加头部适配层*/

  .has-topbar {

    height: 100%;

    box-sizing: border-box;

    padding-top: 44px;

    &:before {

      content: '';

      position: fixed;

      top: 0;

      left: 0;

      width: 100%;

      height: 44px;

      background-color: #000000;

      z-index: 9998;

    }

  }



  /*增加底部适配层*/

  .has-bottombar {

    height: 100%;

    box-sizing: border-box;

    padding-bottom: 20px;

    &:after {

      content: '';

      z-index: 9998;

      position: fixed;

      left: 0;

      bottom: 0;

      width: 100%;

      height: 20px;

      background: #f7f7f8;

    }

  }



  /*导航操作栏上移*/

  .bottom-menu-fixed {

    bottom: 20px;

  }
      
      

}@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3){

  /*增加头部适配层*/

  .has-topbar {

    height: 100%;

    box-sizing: border-box;

    padding-top: 44px;

    &:before {

      content: '';

      position: fixed;

      top: 0;

      left: 0;

      width: 100%;

      height: 44px;

      background-color: #000000;

      z-index: 9998;

    }

  }



  /*增加底部适配层*/

  .has-bottombar {

    height: 100%;

    box-sizing: border-box;

    padding-bottom: 20px;

    &:after {

      content: '';

      z-index: 9998;

      position: fixed;

      left: 0;

      bottom: 0;

      width: 100%;

      height: 20px;

      background: #f7f7f8;

    }

  }



  /*导航操作栏上移*/

  .bottom-menu-fixed {

    bottom: 20px;

  }
      
      

}
body {
      padding-top: constant(safe-area-inset-top);             
      padding-left: constant(safe-area-inset-left);                  
      padding-right: constant(safe-area-inset-right);             
      padding-bottom: constant(safe-area-inset-bottom);
  }
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 16px;
}

img{
  pointer-events: none;
}
.tab {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  // padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}
.tab_bottom {
  bottom: 20px;
}
.tab_item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tab_icon {
  width: 24px;
  height: 24px;
}
.tab_name {
  font-family: PingFangSC-Regular;
  font-size: 10px;
  color: rgba(0,0,0,0.38);
  letter-spacing: 0;
  text-align: center;
  line-height: 14px;
}
.highLight {
  color: #FF7F4A;
}
</style>
