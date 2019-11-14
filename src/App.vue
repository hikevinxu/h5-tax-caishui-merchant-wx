<template>
  <div id="app">
    <keep-alive :include="keepAlive">
      <router-view />
    </keep-alive>
    <div class="tab" v-show="tabName.includes($route.name)">
      <div class="tab_item">
        <img class="tab_icon" :src="$route.name == 'hall' ? require('@/assets/tab-demand@3x.png') : require('@/assets/tab-nodemand@3x.png')">
        <div class="tab_name":class="{highLight: $route.name == 'hall'}">需求大厅</div>
      </div>
      <div class="tab_item">
        <img class="tab_icon" :src="$route.name == 'clue' ? require('@/assets/tab-clues@3x.png') : require('@/assets/tab-noclues@3x.png')">
        <div class="tab_name":class="{highLight: $route.name == 'clue'}">我的线索</div>
      </div>
      <div class="tab_item">
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
      keepAlive: ['login'],
      tabName: ['hall', 'clue', 'mine']
    }
  },
  watch: {
    // '$route.name': function(val) {
      
    // }
  }
}
</script>

<style>
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
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}
.tab_item {
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
