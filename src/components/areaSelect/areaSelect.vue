<template>
  <div class="areaSelect_component">
    <div class="areaSelect_component_header">
      <div class="areaSelect_component_btn areaSelect_component_cancel" @click="cancel">取消</div>
      <div class="areaSelect_component_btn areaSelect_component_title">服务区域</div>
      <div class="areaSelect_component_btn areaSelect_component_submit" @click="confirm">确定</div>
    </div>
    <div class="areaSelect_component_body">
      <div class="areaSelect_component_province">
        <div :class="['areaSelect_component_province_item allProvince', provinceAllSelect ? 'select' : '']" @click="allProvince">全部</div>
        <div v-for="(provinceItem, index) in provinceList" :key="'province' + index" :class="['areaSelect_component_province_item', provinceItem.active ? 'active': '', provinceItem.select ? 'select' : '']" @click="provinceChange(provinceItem, index)">{{provinceItem.name}}</div>
      </div>
      <div class="areaSelect_component_city">
        <div :class="['areaSelect_component_city_item allCity', cityAllSelect ? 'select' : '']" @click="allCity">全部</div>
        <div v-for="(cityItem, index) in cityList" :key="'city' + index" :class="['areaSelect_component_city_item', cityItem.active ? 'active': '', cityItem.select ? 'select' : '']" @click="cityChange(cityItem, index)">{{cityItem.name}}</div>
      </div>
      <div class="areaSelect_component_area">
        <div :class="['areaSelect_component_area_item allArea', areaAllSelect ? 'select' : '']" @click="allArea">全部</div>
        <div v-for="(areaItem, index) in areaList" :key="'area' + index" :class="['areaSelect_component_area_item', areaItem.active ? 'active': '', areaItem.select ? 'select' : '']" @click="areaSelect(areaItem, index)">{{areaItem.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import globalApi from '@/api/globalApi'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  props: {
    selectAreaList: {
      default: [],
      type: Array
    }
  },
  data() {
    return {
      provinceList: [],
      cityList: [],
      areaList: [],
      areaAllSelect: false,
      cityAllSelect: false,
      provinceAllSelect: false
    }
  },
  created() {
    this.getCityTree()
  },
  methods: {
    init() {
      // 重置
      this.getCityTree()
    },
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
          this.cityList = this.provinceList[0].childs
          this.provinceList[0].active = true
          this.areaList = this.cityList[0].childs
          this.cityList[0].active = true
          if(this.selectAreaList && this.selectAreaList.length > 0) {
            for(let i=0;i<this.selectAreaList.length;i++) {
              for(let j=0;j<this.provinceList.length;j++){
                if(this.selectAreaList[i].provinceCode == this.provinceList[j].code) {
                  this.provinceList[j].select = true
                  if(this.provinceList[j].childs && this.provinceList[j].childs.length > 0) {
                    for(let k=0;k<this.provinceList[j].childs.length;k++) {
                      if(this.selectAreaList[i].cityCode == this.provinceList[j].childs[k].code) {
                        this.provinceList[j].childs[k].select = true
                        if(this.provinceList[j].childs[k].childs && this.provinceList[j].childs[k].childs.length > 0) {
                          for(let l=0;l<this.provinceList[j].childs[k].childs.length;l++) {
                            if(this.selectAreaList[i].districtCode == this.provinceList[j].childs[k].childs[l].code) {
                              this.provinceList[j].childs[k].childs[l].select = true
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            for(let i=0;i<this.provinceList.length;i++) {
              if(this.provinceList[i].childs && this.provinceList[i].childs.length > 0){
                for(let j=0;j<this.provinceList[i].childs.length;j++) {
                  let areaAllSelect = true
                  if(this.provinceList[i].childs[j].childs && this.provinceList[i].childs[j].childs.length > 0) {
                    for(let k=0;k<this.provinceList[i].childs[j].childs.length;k++){
                      if(!this.provinceList[i].childs[j].childs[k].select) {
                        areaAllSelect = false
                      }
                    }
                  }
                  if(areaAllSelect) {
                    this.provinceList[i].childs[j].areaAllSelect = true
                  } else {
                    this.provinceList[i].childs[j].areaAllSelect = false
                  }
                }
              }
            }
            for(let i=0;i<this.provinceList.length;i++) {
              let cityAllSelect = true
              if(this.provinceList[i].childs && this.provinceList[i].childs.length > 0){
                for(let j=0;j<this.provinceList[i].childs.length;j++) {
                  if(!this.provinceList[i].childs[j].areaAllSelect) {
                    cityAllSelect = false
                  }
                }
                if(cityAllSelect) {
                  this.provinceList[i].cityAllSelect = true
                } else {
                  this.provinceList[i].cityAllSelect = false
                }
              }
            }

            let provinceAllSelect = true
            for(let i=0;i<this.provinceList.length;i++) {
              if(!this.provinceList[i].cityAllSelect) {
                provinceAllSelect = false
              }
            }
            if(provinceAllSelect) {
              this.provinceAllSelect = true
            } else {
              this.provinceAllSelect = false
            }

            if(this.provinceList[0].cityAllSelect) {
              this.cityAllSelect = true
            } else {
              this.cityAllSelect = false
            }
            if(this.provinceList[0].childs[0].areaAllSelect) {
              this.areaAllSelect = true
            } else {
              this.areaAllSelect = false
            }
          }
        }
      })
    },
    provinceChange(province, index) {
      console.log(province)
      for(let i=0;i<this.provinceList.length;i++) {
        this.provinceList[i].active = false
        for(let j=0;j<this.provinceList[i].childs.length;j++) {
          this.provinceList[i].childs[j].active = false
        }
      }
      province.active = true
      this.$set(this.provinceList, index, province)
      if(province.cityAllSelect) {
        this.cityAllSelect = true
      } else {
        this.cityAllSelect = false
      }
      this.cityList = province.childs
      province.childs[0].active = true
      this.areaList = province.childs[0].childs
      if(province.childs[0].areaAllSelect) {
        this.areaAllSelect = true
      } else {
        this.areaAllSelect = false
      }
    },
    cityChange(city, index) {
      if(city.childs && city.childs.length > 0) {
        this.areaList = []
        for(let i=0;i<this.cityList.length;i++) {
          this.cityList[i].active = false
        }
        city.active = true
        if(city.areaAllSelect) {
          this.areaAllSelect = true
        } else {
          this.areaAllSelect = false
        }
        this.$set(this.cityList, index, city)
        this.areaList = city.childs
      } else {
        // 点击city 切换选中状态
        if(city.select) {
          city.select = false
          city.areaAllSelect = false
          this.cityAllSelect = false
          this.provinceAllSelect = false
        } else {
          city.select = true
          city.areaAllSelect = true
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

        // 全部选中城市-处理
        let cityAll = true
        for(let i=0;i<this.cityList.length;i++) {
          if(!this.cityList[i].areaAllSelect) {
            cityAll = false
          }
        }
        if (cityAll) {
          this.cityAllSelect = true
          this.provinceList[this.cityList[0].parentId - 1].cityAllSelect = true
        } else {
          this.cityAllSelect = false
          this.provinceList[this.cityList[0].parentId - 1].cityAllSelect = false
        }

        // 全部选中省份-处理
        let provinceAll = true
        for(let i=0;i<this.provinceList.length;i++) {
          if(!this.provinceList[i].cityAllSelect) {
            provinceAll = false
          }
        }
        if (provinceAll) {
          this.provinceAllSelect = true
        } else {
          this.provinceAllSelect = false
        }

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

        // 选中一个区域时，默认选中对应的市
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

        // 选中一个区域时，默认选中对应的省
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

        // 全部选中区域-处理
        let areaAll = true
        for(let i=0;i<this.areaList.length;i++) {
          if(!this.areaList[i].select) {
            areaAll = false
          }
        }
        if(areaAll){
          this.areaAllSelect = true
          this.cityList[area.parentId - 1].areaAllSelect = true
        } else {
          this.areaAllSelect = false
          this.cityList[area.parentId - 1].areaAllSelect = false
        }

        // 全部选中城市-处理
        let cityAll = true
        for(let i=0;i<this.cityList.length;i++) {
          if(!this.cityList[i].areaAllSelect) {
            cityAll = false
          }
        }
        if (cityAll) {
          this.cityAllSelect = true
          this.provinceList[this.cityList[0].parentId - 1].cityAllSelect = true
        } else {
          this.cityAllSelect = false
          this.provinceList[this.cityList[0].parentId - 1].cityAllSelect = false
        }

        // 全部选中省份-处理
        let provinceAll = true
        for(let i=0;i<this.provinceList.length;i++) {
          if(!this.provinceList[i].cityAllSelect) {
            provinceAll = false
          }
        }
        if (provinceAll) {
          this.provinceAllSelect = true
        } else {
          this.provinceAllSelect = false
        }
      }
    },
    // 选择全国
    allProvince() {
      if(this.provinceList && this.provinceList.length > 0) {
        for(let i=0;i<this.provinceList.length;i++) {
          if(this.provinceAllSelect) {
            this.$set(this.provinceList[i], 'select', false)
            this.$set(this.provinceList[i], 'cityAllSelect', false)
            if(this.provinceList[i].childs && this.provinceList[i].childs.length > 0) {
              this.provinceList[i].childs.forEach((cityItem, cityIndex) => {
                this.$set(cityItem, 'select', false)
                this.$set(cityItem, 'areaAllSelect', false)
                if(cityItem.childs && cityItem.childs.length > 0) {
                  cityItem.childs.forEach((areaItem, areaIndex) => {
                    this.$set(areaItem, 'select', false)
                  })
                }
              })
            }
          } else {
            this.$set(this.provinceList[i], 'select', true)
            this.$set(this.provinceList[i], 'cityAllSelect', true)
            if(this.provinceList[i].childs && this.provinceList[i].childs.length > 0) {
              this.provinceList[i].childs.forEach((cityItem, cityIndex) => {
                this.$set(cityItem, 'select', true)
                this.$set(cityItem, 'areaAllSelect', true)
                if(cityItem.childs && cityItem.childs.length > 0) {
                  cityItem.childs.forEach((areaItem, areaIndex) => {
                    this.$set(areaItem, 'select', true)
                  })
                }
              })
            }
          }
        }
        this.provinceAllSelect = !this.provinceAllSelect
        if(this.provinceAllSelect) {
          this.cityAllSelect = true
          this.areaAllSelect = true
        } else {
          this.cityAllSelect = false
          this.areaAllSelect = false
        }
      }
    },
    // 选择全省
    allCity() {
      if(this.cityList && this.cityList.length > 0) {
        for(let i=0;i<this.cityList.length;i++) {
          if(this.cityAllSelect) {
            this.$set(this.cityList[i], 'select', false)
            this.$set(this.provinceList[this.cityList[i].parentId - 1], 'select', false)
            this.$set(this.provinceList[this.cityList[i].parentId - 1], 'cityAllSelect', false)
            if(this.cityList[i].childs && this.cityList[i].childs.length > 0) {
              this.cityList[i].childs.forEach((areaItem, areaIndex) => {
                this.$set(areaItem, 'select', false)
              })
            }
            this.$set(this.cityList[i], 'areaAllSelect', false)
            this.areaAllSelect = false
          } else {
            this.$set(this.cityList[i], 'select', true)
            this.$set(this.provinceList[this.cityList[i].parentId - 1], 'select', true)
            this.$set(this.provinceList[this.cityList[i].parentId - 1], 'cityAllSelect', true)
            if(this.cityList[i].childs && this.cityList[i].childs.length > 0) {
              this.cityList[i].childs.forEach((areaItem, areaIndex) => {
                this.$set(areaItem, 'select', true)
              })
            }
            this.$set(this.cityList[i], 'areaAllSelect', true)
            this.areaAllSelect = true
          }
        }
        this.cityAllSelect = !this.cityAllSelect

        // 全部选中省份-处理
        let provinceAll = true
        for(let i=0;i<this.provinceList.length;i++) {
          if(!this.provinceList[i].cityAllSelect) {
            provinceAll = false
          }
        }
        if (provinceAll) {
          this.provinceAllSelect = true
        } else {
          this.provinceAllSelect = false
        }
    
      } else {
        Toast('请先选中一个省份')
      }
    },
    // 选择全市
    allArea() {
      if (this.areaList && this.areaList.length > 0) {
        for(let i=0;i<this.areaList.length;i++) {
          if(this.areaAllSelect) {
            this.$set(this.areaList[i], 'select', false)
          } else {
            this.$set(this.areaList[i], 'select', true)
          }
        }
        this.areaAllSelect = !this.areaAllSelect
        
        // 选中一个区域时，默认选中对应的市
        let city = {}
        this.cityList.forEach((cityItem, cityIndex) => {
          if(this.areaAllSelect) {
            if(cityItem.id == this.areaList[0].parentId) {
              cityItem.select = true
              city.id = cityItem.id
              city.parentId = cityItem.parentId
              cityItem.areaAllSelect = true
            }
          } else {
            if(cityItem.id == this.areaList[0].parentId) {
              cityItem.select = false
              city.id = cityItem.id
              city.parentId = cityItem.parentId
              cityItem.areaAllSelect = false
            }
          }
        })

        // 全部选中市-处理
        let cityAll = true
        for(let i=0;i<this.cityList.length;i++) {
          if(!this.cityList[i].areaAllSelect) {
            cityAll = false
          }
        }
        if (cityAll) {
          this.cityAllSelect = true
          this.$set(this.provinceList[city.parentId - 1], 'cityAllSelect', true)
        } else {
          this.cityAllSelect = false
          this.$set(this.provinceList[city.parentId - 1], 'cityAllSelect', false)
        }

        // 选中一个区域时，默认选中对应的省
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

        // 全部选中省份-处理
        let provinceAll = true
        for(let i=0;i<this.provinceList.length;i++) {
          if(!this.provinceList[i].cityAllSelect) {
            provinceAll = false
          }
        }
        if (provinceAll) {
          this.provinceAllSelect = true
        } else {
          this.provinceAllSelect = false
        }

      } else {
        Toast('请先选中一个城市')
      }
    },
    // 点击确定
    confirm() {
      let selectArr = []
      for(let i=0;i<this.provinceList.length;i++) {
        if(this.provinceList[i].select && this.provinceList[i].childs && this.provinceList[i].childs.length > 0) {
          for(let j=0;j<this.provinceList[i].childs.length;j++) {
            if(this.provinceList[i].childs[j].select && this.provinceList[i].childs[j].childs && this.provinceList[i].childs[j].childs.length > 0) {
              for(let k=0;k<this.provinceList[i].childs[j].childs.length; k++) {
                if (this.provinceList[i].childs[j].childs[k].select) {
                  selectArr.push({
                    countryCode: "INT156",
                    provinceCode: this.provinceList[i].code || null,
                    cityCode: this.provinceList[i].childs[j].code || null,
                    districtCode: this.provinceList[i].childs[j].childs[k].code || null
                  })
                }
              }
            } else if(this.provinceList[i].childs[j].select) {
              selectArr.push({
                countryCode: "INT156",
                provinceCode: this.provinceList[i].code || null,
                cityCode: this.provinceList[i].childs[j].code || null,
                districtCode: null
              })
            }
          }
        }
      }
      this.$emit('submit', selectArr)
    },
    // 点击取消
    cancel() {
      this.init()
      this.$emit('cancel')
    },
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
      color: #1989fa;
    }
    .areaSelect_component_title {
      flex: 1;
      line-height: 48px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(0,0,0,0.87);
    }
    .areaSelect_component_submit {
      width: 80px;
      height: 36px;
      margin-top: 6px;
      margin-right: 6px;
      line-height: 36px;
      font-size: 15px;
      color: #1989fa;
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
