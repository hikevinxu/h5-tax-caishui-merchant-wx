<template>
  <div class="areaSelect_component">
    <div class="areaSelect_component_header">
      <div class="areaSelect_component_btn areaSelect_component_cancel">取消</div>
      <div class="areaSelect_component_btn areaSelect_component_title">服务区域</div>
      <div class="areaSelect_component_btn areaSelect_component_submit">确定</div>
    </div>
    <div class="areaSelect_component_body">
      <div class="areaSelect_component_province">
        <div class="areaSelect_component_province_item allProvince">全部</div>
        <div v-for="(provinceItem, index) in provinceList" :key="'province' + index" :class="['areaSelect_component_province_item', provinceItem.active ? 'active': '', provinceItem.select ? 'select' : '']" @click="provinceChange(provinceItem, index)">{{provinceItem.name}}</div>
      </div>
      <div class="areaSelect_component_city">
        <div class="areaSelect_component_city_item allCity">全部</div>
        <div v-for="(cityItem, index) in cityList" :key="'city' + index" :class="['areaSelect_component_city_item', cityItem.active ? 'active': '', cityItem.select ? 'select' : '']" @click="cityChange(cityItem, index)">{{cityItem.name}}</div>
      </div>
      <div class="areaSelect_component_area">
        <div :class="['areaSelect_component_area_item allArea', areaAllSelect ? 'select' : '']">全部</div>
        <div v-for="(areaItem, index) in areaList" :key="'area' + index" :class="['areaSelect_component_area_item', areaItem.active ? 'active': '', areaItem.select ? 'select' : '']" @click="areaSelect(areaItem, index)">{{areaItem.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import globalApi from '@/api/globalApi'
export default {
  data() {
    return {
      provinceList: [],
      cityList: [],
      areaList: [],
      areaAllSelect: false
    }
  },
  created() {
    this.getCityTree()
  },
  methods: {
    getCityTree() {
      globalApi.addressTrees().then(res => {
        if(res.code == 0) {
          this.provinceList = res.data
          for(let i=0;i<this.provinceList.length;i++) {
            this.provinceList[i].id = i + 1
            if(this.provinceList[i].childs && this.provinceList[i].childs.length > 0){
              for(let j=0;j<this.provinceList[i].childs.length;j++) {
                this.provinceList[i].childs[j].id = j + 1
                this.provinceList[i].childs[j].parentId = i + 1
                if(this.provinceList[i].childs[j].childs && this.provinceList[i].childs[j].childs.length > 0) {
                  for(let k=0;k<this.provinceList[i].childs[j].childs.length;k++){
                    this.provinceList[i].childs[j].childs[k].parentId = j + 1
                  }
                }
              }
            }
          }
          console.log(this.provinceList)
        }
      })
    },
    provinceChange(province, index) {
      for(let i=0;i<this.provinceList.length;i++) {
        this.provinceList[i].active = false
        for(let j=0;j<this.provinceList[i].childs.length;j++) {
          this.provinceList[i].childs[j].active = false
        }
      }
      province.active = true
      this.$set(this.provinceList, index, province)
      this.cityList = province.childs
      province.childs[0].active = true
      this.areaList = province.childs[0].childs
    },
    cityChange(city, index) {
      this.areaList = []
      if(city.childs && city.childs.length > 0) {
        for(let i=0;i<this.cityList.length;i++) {
          this.cityList[i].active = false
        }
        city.active = true
        this.$set(this.cityList, index, city)
        this.areaList = city.childs
      } else {
        // 点击city 切换选中状态
        if(city.select) {
          city.select = false
        } else {
          city.select = true
        }
        this.$set(this.cityList, index, city)

        this.provinceList.forEach((provinceItem, provinceIndex) => {
          let selectCity = []
          this.cityList.forEach((cityItem, cityIndex) => {
            if(cityItem.select) {
              selectCity.push(cityItem)
            }
          })
          if(selectCity.length > 0) {
            if(provinceItem.id == city.parentId) {
              provinceItem.select = true
            }
          } else {
            if(provinceItem.id == city.parentId) {
              provinceItem.select = false
            }
          }
        })

      }
    },
    areaSelect(area, index) {
      if(area){
        // 点击area 切换选中状态
        if(area.select) {
          area.select = false
        } else {
          area.select = true
        }
        this.$set(this.areaList, index, area)

        // 选中一个区域时，默认选中对应的省和市
        let city = {}
        this.cityList.forEach((cityItem, cityIndex) => {
          let selectArea = []
          this.areaList.forEach((areaItem, areaIndex) => {
            if(areaItem.select) {
              selectArea.push(areaItem)
            }
          })
          if(selectArea.length > 0) {
            if(cityItem.id == area.parentId) {
              cityItem.select = true
              city.id = cityItem.id
              city.parentId = cityItem.parentId
            }
          } else {
            if(cityItem.id == area.parentId) {
              cityItem.select = false
              city.id = cityItem.id
              city.parentId = cityItem.parentId
            }
          }
        })

        this.provinceList.forEach((provinceItem, provinceIndex) => {
          let selectCity = []
          this.cityList.forEach((cityItem, cityIndex) => {
            if(cityItem.select) {
              selectCity.push(cityItem)
            }
          })
          if(selectCity.length > 0) {
            if(provinceItem.id == city.parentId) {
              provinceItem.select = true
            }
          } else {
            if(provinceItem.id == city.parentId) {
              provinceItem.select = false
            }
          }
        })

        let areaAll = true
        for(let i=0;i<this.areaList.length;i++) {
          if(!this.areaList[i].select) {
            areaAll = false
          }
        }
        if(areaAll){
          this.areaAllSelect = true
        } else {
          this.areaAllSelect = false
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.areaSelect_component {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .areaSelect_component_header {
    display: flex;
    width: 100%;
    height: 48px;
    font-family: PingFangSC-Medium;
    font-size: 15px;
    background-color: #fff;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    .areaSelect_component_cancel {
      width: 80px;
      height: 36px;
      margin-top: 6px;
      margin-left: 6px;
      line-height: 36px;
      color: rgba(0,0,0,0.26);
    }
    .areaSelect_component_title {
      flex: 1;
      line-height: 48px;
      font-size: 14px;
      color: rgba(0,0,0,0.60);
    }
    .areaSelect_component_submit {
      width: 80px;
      height: 36px;
      margin-top: 6px;
      margin-right: 6px;
      line-height: 36px;
      font-size: 15px;
      color: #90D0FF;
    }
  }
  .areaSelect_component_body {
    width: 100%;
    height: 100%;
    display: flex;
    padding-top: 48px;
    box-sizing: border-box;
    .areaSelect_component_province,
    .areaSelect_component_city,
    .areaSelect_component_area {
      flex: 1;
      height: 100%;
      overflow: scroll;
      .areaSelect_component_province_item,
      .areaSelect_component_city_item,
      .areaSelect_component_area_item {
        height: 40px;
        line-height: 40px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0,0,0,0.38);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing: border-box;
        padding: 0 10px;
      }
      .areaSelect_component_province_item.active,
      .areaSelect_component_city_item.active,
      .areaSelect_component_area_item.active {
        color: rgba(0,0,0,0.87);
        background: #FFFFFF;
        position: relative;
        &::before {
          content: '';
          width: 3px;
          height: 16px;
          position: absolute;
          top: 12px;
          left: 4px;
          background: #FF7F4A;
          border-radius: 2px;
        }
      }
      .areaSelect_component_province_item.select,
      .areaSelect_component_city_item.select,
      .areaSelect_component_area_item.select {
        color: #FF7F4A;
      }
    }
    .areaSelect_component_province {
      background: #FAFAFA;
    }
    .areaSelect_component_city {
      background: #FFFFFF;
      .areaSelect_component_city_item {
        color: rgba(0,0,0,0.60);
      }
      .areaSelect_component_city_item.active {
        background: #FAFAFA;
      }
    }
    .areaSelect_component_area {
      background: #FFFFFF;
      .areaSelect_component_area_item {
        color: rgba(0,0,0,0.60);
      }
    }
  }
}
</style>
