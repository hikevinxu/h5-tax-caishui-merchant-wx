<template>
	<div class="hall">
		<div class="banner" :class="{height0: !showBanner}" v-show="imgList.length > 0">
	  		<van-swipe :autoplay="2500">
			  	<van-swipe-item v-for="(item, index) in imgList" :key="index" @click="clickBanner(item)">
			    	<img :src="item.elementValue" />
			  	</van-swipe-item>
			</van-swipe>
		</div>
		<div class="hall_container" :class="{hall_container_: !showBanner && imgList.length > 0}">
			<div class="hall_container_top" :class="{hall_container_fixed: !showBanner, hall_container_all: showFilter}">
				<div class="message">
					<div class="message_content">
						<div class="swiper-container2">
						    <div class="swiper-wrapper">
						    	<div class="swiper-slide message_item">
						    		<img src="@/assets/notice@3x.png">
						    		<p>今日需求用户 <span>{{this.userNum}}</span> 人</p>
						    	</div>
						    	<div class="swiper-slide message_item">
						    		<img src="@/assets/notice@3x.png">
						    		<p>今日发布财税类需求类型 <span>{{this.typeNum}}</span> 类</p>
						    	</div>
						      	<div class="swiper-slide message_item" v-for="(item, index) in messageList" :key="index">
						      		<img src="@/assets/notice@3x.png">
						      		<p>{{item.name}}已对接<span>{{item.area}}</span>的<span>{{item.intention}}</span>业务</p>
						      	</div>
						    </div>
				  		</div>
					</div>
				</div>
				<div class="filter">
					<div class="filter_item" @click="filter('city')">
						<div class="filter_item_name" :class="{active: filterType == 'city'}">{{cityText}}</div>
						<img class="filter_item_icon" :src="filterType == 'city' ? require('@/assets/arrow-up@3x.png') : require('@/assets/arrow-down@3x.png')">
					</div>
					<div class="filter_item" @click="filter('serve')">
						<div class="filter_item_name" :class="{active: filterType == 'serve'}">{{serveText}}</div>
						<img class="filter_item_icon" :src="filterType == 'serve' ? require('@/assets/arrow-up@3x.png') : require('@/assets/arrow-down@3x.png')">
					</div>
					<div class="filter_item" @click="filter('type')">
						<div class="filter_item_name" :class="{active: filterType == 'type'}">{{typeText}}</div>
						<img class="filter_item_icon" :src="filterType == 'type' ? require('@/assets/arrow-up@3x.png') : require('@/assets/arrow-down@3x.png')">
					</div>
					<div class="filter_item" @click="filter('status')">
						<div class="filter_item_name" :class="{active: filterType == 'status'}">{{statusText}}</div>
						<img class="filter_item_icon" :src="filterType == 'status' ? require('@/assets/arrow-up@3x.png') : require('@/assets/arrow-down@3x.png')">
					</div>
				</div>
				<div class="filter_box" v-show="showFilter" @click.self="closeFilter">
					<div class="filter_container">
						<div class="filter_left">
							<div class="filter_left_item" :class="{filter_left_item_active: fatherCode === ''}" @click="selectAll">
								<div class="filter_left_item_icon"></div>
								<div class="filter_left_item_text">全部</div>
								<div class="filter_left_item_arrow"></div>
							</div>
							<div class="filter_left_item" v-for="item in filterList" :key="item.code" :class="{filter_left_item_active: fatherCode === item.code}" @click="select1(item)">
								<div class="filter_left_item_icon"></div>
								<div class="filter_left_item_text">{{item.name}}</div>
								<img class="filter_left_item_arrow" src="@/assets/right@3x.png" v-if="item.childs && item.childs.length > 0">
								<div class="filter_left_item_arrow" v-else></div>
							</div>
						</div>
						<div class="filter_right">
							<div class="filter_right_item" v-for="item_ in childs" :key="item_.code" :class="{filter_right_item_active: childCode === item_.code}" @click="select2(item_)">{{item_.name}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="intention" :class="{intention_top: !showBanner && imgList.length == 0}" :style="{'padding-bottom': isIphoneX ? '32px' : '12px'}" v-if="clueList.length > 0">
				<div class="intention_item" v-for="(item) in clueList" :key="item.id" @click="goDetail(item)">
					<img class="intention_item_type" v-if="item.recommendTag" :src="require(`@/assets/label-${item.recommendTag}@3x.png`)">
					<div class="intention_item_detail">查看详情</div>
					<div class="intention_item_top">
						<div class="intention_item_name">{{item.name}}</div>
						<div :class="`intention_item_status intention_item_status${item.status}`">{{statusList[item.status]['name']}}</div>
					</div>
					<div class="intention_item_info">询问类目：{{item.intention}}</div>
					<div class="intention_item_info">需求区域：{{areaHandle(item.area)}}</div>
					<div class="intention_item_info" v-if="item.customerIntention">客户意向：{{item.customerIntention}}</div>
					<div class="intention_item_bottom">
						<div class="intention_item_date">{{item.createTime}}</div>
						<!-- <img class="intention_item_icon" src="@/assets/has-pushed@3x.png">
						<div class="intention_item_push">已推给我</div> -->
					</div>
				</div>
				<div class="load_more" @click="loadingMore" v-show="showLoad && !noMore">
          <span v-show="!loading_more">点击加载更多</span>
          <van-loading style="width: 10px;" v-show="loading_more == true" type="spinner" />
        </div>
        <div class="load_more" v-show="showLoad && noMore">
          <span>已经到底了</span>
        </div>
			</div>
      <div v-else>
        <emptyList />
      </div>
		</div>
		<confirm :show.sync="showConfirm" :content="content" @cancel="cancel" @confirm="goRZ"></confirm>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Swiper from 'swiper'
	import api from '@/api/api'
	import { fetchAppGet } from '@/api/axios'
	import { Toast, Button, Loading, Swipe, SwipeItem } from 'vant'
  import Confirm from '@/components/confirm'
  import emptyList from '@/components/EmptyList/EmptyList'
	Vue.use(Loading);
	Vue.use(Swipe).use(SwipeItem);
	export default {
		name: 'hall',
		components: {
      Confirm,
      emptyList
		},
		data() {
			return {
				renzheng: false, // 是否已认证
				isLogin: Boolean(localStorage.getItem('accessToken')), // 是否已登录
				showConfirm: false, // 确认弹窗
				content: '',
				imgList: [],
				userNum: 0,
				typeNum: 0,
				messageList: [],
				filterType: '',
				showBanner: true,
				showBanner_: true,
				cityList: [],
				serveList: [],
				typeList: [
					{
						name: '客服推送',
						code: 1,
						childs: []
					}, {
						name: '超值',
						code: 2,
						childs: []
					}, {
						name: '准新',
						code: 3,
						childs: []
					}
				],
				statusList: [
					{
						name: '待对接',
						code: 0,
						childs: []
					}, {
						name: '对接中',
						code: 1,
						childs: []
					}, {
						name: '已成交',
						code: 2,
						childs: []
					}
				],
				fatherItem: {},
				childs: [],
				childItem: {},
				cityFatherCode: '',
				cityChildCode: '',
				serveFatherCode: '',
				serveChildCode: '',
				typeFatherCode: '',
				typeChildCode: '',
				statusFatherCode: '',
				statusChildCode: '',
				showFilter: false,
				cityText: '城市',
				serveText: '服务',
				typeText: '类型',
				statusText: '状态',
				areaCode: '',
				intentionCode: '',
				recommendTag: '',
				statusCode: '',
				clueList: [],
				noMore: false,
		      	loading: false,
		      	loading_more: false,
		      	pageNum: 1,
		      	total: 0,
		      	hasBind: false
			}
		},
		props: {
			reload: {
				default: 0,
				type: Number
			}
		},
		watch: {
			showFilter(val) {
				if(val) {
					this.showBanner = !val;
				}else {
					this.showBanner = this.showBanner_;
				}
			},
			reload(newVal, oldVal) {
				if(newVal !== oldVal) {
					this.pageNum = 1;
					this.getClueList();
				}
			}
		},
		computed: {
			filterList() {
				return this.filterType ? this[this.filterType + 'List'] : [];
			},
			showLoad() {
				return this.total > this.pageNum * 10;
			},
			fatherCode() {
				return this.filterType ? this[this.filterType + 'FatherCode'] : '';
			},
			childCode() {
				return this.filterType ? this[this.filterType + 'ChildCode'] : '';
			},
			isIphoneX(){
		      	return /iphone/gi.test(navigator.userAgent) && ((screen.height == 812 && screen.width == 375) || (screen.height == 896 && screen.width == 414))
		    }
		},
		methods: {
			getBanner() {
				fetchAppGet('/advert/position/list', {positionNo: '011'}).then(res => {
					if(res.code == 0) {
						this.imgList = res.data.infos;
					}
				})
			},
			getNum() {
				let time = new Date();
				let date = time.getDate();
				let day = time.getDay();
				let hours = time.getHours();
				hours = hours < 7 ? (hours + 24) : hours;
				let initNum = date * day % 100 + 300;
				for(let i = 7; i < hours; i++) {
					initNum += day * hours % 10 + 10;
				}
				this.userNum = initNum;
				this.typeNum = date * day % 25 + 20;
			},
			getCarouselList() {
				api.carouselList({}).then(res => {
					if(res.code == 0) {
						this.messageList = res.data.items;
					}
					this.$nextTick(() => {
					    // 消息轮播
					    new Swiper('.swiper-container2', {
					    	direction: 'vertical',
					      	autoplay: {
					        	delay: 2500,
					        	disableOnInteraction: false,
					      	},
					      	loop : true,
					    });
					})
				})
			},
			getClueList(more) {
				let recommendList = this.recommendTag !== '' ? [this.recommendTag] : [];
				let statusList = this.statusCode !== '' ? [this.statusCode] : [];
				let data = {
					areaCode: this.areaCode,
					intentionCode: this.intentionCode,
					recommendList,
					statusList,
					pageNum: this.pageNum,
					pageSize: 20,
				}
				api.clueList(data).then(res => {
					if(res.code == 0) {
						if(more) {
							this.clueList = [...this.clueList, ...res.data.items];
						}else {
							this.clueList = res.data.items;
						}
						this.total = res.data.total;
						this.loading_more = false;
						if(res.data.items.length < 10){
			              	this.noMore = true
			          	}else{
			              	this.noMore = false
			          	}
					}
				})
			},
			getCityList() {
				api.cityList({}).then(res => {
					if(res.code == 0) {
						this.cityList = res.data;
					}
				})
			},
			getServeList() {
				api.serveList({}).then(res => {
					if(res.code == 0) {
						this.serveList = res.data;
					}
				})
			},
			clickBanner(item) {
				sa.track('WebCheckOnTheBanner', {
					id: item.id
				}, () => {
					location.href = item.adValue;
				})
			},
			loadingMore() {
				this.loading_more = true;
				this.pageNum ++;
				this.getClueList(1);
			},
			closeFilter() {
				this.filterType = '';
				this.showFilter = '';
			},
			filter(type) {
				if(type == this.filterType && this.showFilter) {
					this.closeFilter();
				}else {
					let obj = {
						city: 'areaCode',
						serve: 'intentionCode',
						type: 'recommendTag',
						status: 'statusCode'
					}
					if(!this.showFilter) {
						this.showBanner_ = this.showBanner;
					}
					this.filterType = this.filterType == type ? '' : type;
					if(this.fatherCode) {
						this.childs = this.filterList.filter(item => this.fatherCode == item.code)[0].childs;
					}else {
						this.childs = [];
					}
					this.showFilter = this.filterType ? true : false;
					this.$nextTick(() => {
						document.getElementsByClassName('filter_box')[0].style.height = window.innerHeight - 96 + 'px';
					})
				}
			},
			select1(item) {
				let obj = {
					city: 'areaCode',
					serve: 'intentionCode',
					type: 'recommendTag',
					status: 'statusCode'
				}
				this.childItem = {};
				this.fatherItem = item;
				this[obj[this.filterType]] = item.code;
				this[this.filterType + 'FatherCode'] = item.code
				if(item.childs.length > 0) {
					this.childs = item.childs;
				}else {
					this[this.filterType + 'Text'] = item.name;
					this.getClueList();
					this.childs = [];
					setTimeout(() => {
						this.showFilter = false;
						this.filterType = '';
					}, 100);
				}
			},
			select2(item) {
				let obj = {
					city: 'areaCode',
					serve: 'intentionCode',
					type: 'recommendTag',
					status: 'statusCode'
				}
				this.childItem = item;
				this[this.filterType + 'Text'] = item.name;
				this[obj[this.filterType]] = item.code;
				this[this.filterType + 'ChildCode'] = item.code
				this.getClueList();
				setTimeout(() => {
					this.showFilter = false;
					this.filterType = '';
				}, 100);
				
			},
			selectAll() {
				let obj = {
					city: '城市',
					serve: '服务',
					type: '类型',
					status: '状态',
				}
				let obj_ = {
					city: 'areaCode',
					serve: 'intentionCode',
					type: 'recommendTag',
					status: 'statusCode'
				}
				this[this.filterType + 'Text'] = obj[this.filterType];
				this[obj_[this.filterType]] = '';
				this.cityFatherCode = '';
				this.cityChildCode = '';
				this.serveFatherCode = '';
				this.serveChildCode = '';
				this.typeFatherCode = '';
				this.typeChildCode = '';
				this.statusFatherCode = '';
				this.statusChildCode = '';
				this.getClueList();
				setTimeout(() => {
					this.showFilter = false;
					this.filterType = '';
				}, 100);
			},
			areaHandle(area) {
				if(area.indexOf('-') > -1) {
					let list = area.split('-').reverse();
					return `${list[1]}-${list[0]}`
				}else {
					return area;
				}
			},
			goDetail(item) {
				api.applyStatus({}).then(res => {
					if(res.code == 0) {
						this.status = res.data.status;
						this.renzheng = res.data.status == 103;
						localStorage.setItem('status', res.data.status);
						if(!this.renzheng) {
							this.content = '您还未进行商户认证，认证后方可查看订单';
							this.showConfirm = true;
							return false;
						}
						this.$router.push({
							path: '/detail',
							query: {
								intentionId: item.id,
								origin: item.origin,
								from: 'clues_page'
							}
						})
					}else if(res.code == 10000) {
						if(!this.hasBind){
			        this.$router.replace('/bindPhone');
			      }else {
			        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9adab1432e4d7cf1&redirect_uri=${location.origin}/bindLogin&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
			      }
					}else {
						Toast(res.msg);
					}
				})
			},
			cancel() {
				if(this.isLogin) {
					sa.track('WebTradingFloorDialogCancel');
				}
				this.showConfirm = false;
			},
			// 跳转认证
			goRZ() {
				if(!this.isLogin) {
					location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9adab1432e4d7cf1&redirect_uri=${location.origin}/bindPhone&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
				}else {
					sa.track('WebTradingFloorConfirmConfirm');
					if(this.status < 102) {
						this.$router.push({
							path: '/renzheng',
						})
					}else if(this.status == 103) {
						this.$router.push({
							path: '/rzSucc',
						})
					}else {
						this.$router.push({
							path: '/rzResult',
						})
					}
				}
			}
		},
		created() {
			this.getNum();
			this.getBanner();
			this.getCarouselList();
			this.getClueList();
			this.getCityList();
			this.getServeList();
			// let code = this.$route.query.code
			// if(code){
			// 	let params = {
			// 		code: this.$route.query.code
			// 	}
			// 	api.registerHasBind(params).then(res => {
			// 		console.log(res)
			// 		if(res.code == 0){
			// 			localStorage.setItem('openId', res.data.openId)
			// 			if(res.data.hasBind == false){
			// 				this.hasBind = false
			// 			}else {
			// 				this.hasBind = true
			// 			}
			// 		}
			// 	})
			// 	.catch((error) => {
			// 		console.log(error)
			// 	})
			// }
		},
		mounted() {
		    // 监听用户行为判断是否展示banner
		    let scroll_y = 0;
		    window.addEventListener('scroll', () => {
		    	if(scroll_y > 100 && window.scrollY > scroll_y) {
		    		this.showBanner = false;
		    	}
		    	if(window.scrollY < 96 && !this.showFilter && window.scrollY < scroll_y) {
		    		this.showBanner = true;
		    	}
		    	scroll_y = window.scrollY;
		    })
		    // let clientY = '';
		    // let distance;
		    // window.addEventListener('touchmove', (e) => {
		    // 	if(clientY && !this.showFilter) {
		    // 		distance = e.target.classList.value.split().includes('swiper-container1') ? 20 : 1;
		    // 		if(clientY + distance < e.targetTouches[0].clientY) {
			   //  		this.showBanner = true;
			   //  	}
			   //  	if(clientY > e.targetTouches[0].clientY + distance) {
			   //  		this.showBanner = false;
			   //  	}
		    // 	}
		    // 	clientY = e.targetTouches[0].clientY;
		    // })
		}
	}
</script>

<style lang="scss" scoped>
	.hall {
		width: 100%;
		height: 100vh;
		// display: flex;
		// flex-direction: column;
		.banner {
			width: 100%;
			height: 130px;
			overflow: auto;
			.banner_item {
				height: 130px;
			}
			.van-swipe {
				.van-swipe__track {
					.van-swipe-item {
						img {
							width: 100%;
							height: 130px;
						}
					}
				}
			}
		}
		.height0 {
			height: 0;
			overflow: hidden;
		}
		.hall_container_ {
			padding-top: 192px;
		}
		.hall_container {
			position: relative;
			flex: 1;
			padding-bottom: 48px;
			// display: flex;
			// flex-direction: column;
			.hall_container_top {
				position: relative;
				top: 0; 
				width: 100%;
				height: 96px;
				z-index: 100;
				display: flex;
				flex-direction: column;
				.message {
					padding: 12px 0 4px;
					width: 100%;
					background: #fff;
					.message_content {
						margin: 0 auto;
						width: 344px;
						height: 32px;
						border-radius: 16px;
						background: rgba(255,173,113,0.12);
						overflow: hidden;
						.swiper-container2 {
							width: 344px;
							height: 32px;
							.message_item {
								width: 100%;
								height: 32px;
								padding-left: 16px;
								box-sizing: border-box;
								display: flex;
								align-items: center;
								img {
									margin-right: 8px;
									width: 18px;
									height: 18px;
								}
								p {
									flex: 1;
									font-family: PingFangSC-Regular;
									font-size: 12px;
									color: rgba(0,0,0,0.60);
									line-height: 18px;
									text-align: left;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
									span {
										color: #FF7F4A;
									}
								}
								
							}
						}
					}
				}
				.filter {
					width: 100%;
					height: 48px;
					display: flex;
					background: #fff;
					.filter_item {
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
						.filter_item_name {
							margin-right: 4px;
							font-family: PingFangSC-Medium;
							font-size: 14px;
							color: rgba(0,0,0,0.87);
							text-align: left;
						}
						.active {
							color: #FF7F4A;
						}
						.filter_item_icon {
							width: 24px;
							height: 24px;
						}
					}
				}
				.filter_box {
					position: absolute;
					top: 96px;
					width: 100%;
					flex: 1;
					background: rgba(0,0,0,0.38);
					.filter_container {
						width: 100%;
						height: 400px;
						display: flex;
						.filter_left {
							width: 126px;
							height: 400px;
							overflow: scroll;
							background: #f5f5f5;
							.filter_left_item {
								padding: 0 10px 0 4px;
								box-sizing: border-box;
								width: 126px;
								height: 40px;
								display: flex;
								justify-content: space-between;
								align-items: center;
								.filter_left_item_icon {
									width: 3px;
									height: 16px;
									background: #f5f5f5;
									border-radius: 2px;
								}
								.filter_left_item_text {
									flex: 1;
									font-family: PingFangSC-Regular;
									font-size: 14px;
									color: rgba(0,0,0,0.38);
									text-align: center;
								}
								.filter_left_item_arrow {
									width: 16px;
									height: 16px;
								}
							}
							.filter_left_item_active {
								background: #fff;
								.filter_left_item_icon {
									background: #FF7F4A;
								}
								.filter_left_item_text {
									color: rgba(0,0,0,0.87);
								}
							}
						}
						.filter_right {
							padding-left: 16px;
							box-sizing: border-box;
							flex: 1;
							height: 400px;
							overflow: scroll;
							background: #fff;
							.filter_right_item {
								// width: 102px;
								height: 40px;
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: rgba(0,0,0,0.38);
								text-align: left;
								line-height: 40px;
							}
							.filter_right_item_active {
								color: #FF7F4A;
							}
						}
					}
				}
			}
			.hall_container_fixed {
				position: fixed;
			}

			.hall_container_all {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
			.intention {
				// margin-top: 96px;
				padding: 12px;
				box-sizing: border-box;
				width: 100%;
				background: #f5f5f5;
				flex: 1;
				// overflow: scroll;
				.intention_item {
					margin-bottom: 12px;
					position: relative;
					padding: 12px 16px;
					box-sizing: border-box;
					width: 100%;
					background: #FFFFFF;
					border-radius: 4px;
					.intention_item_type {
						position: absolute;
						top: 0;
						right: 0;
						width: 54px;
						height: 54px;
					}
					.intention_item_detail {
						position: absolute;
						top: 63px;
						right: 16px;
						width: 72px;
						height: 28px;
						background-image: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
						border-radius: 2px;
						font-family: PingFangSC-Medium;
						font-size: 13px;
						color: #FFFFFF;
						line-height: 28px;
						text-align: center;
					}
					.intention_item_top {
						margin-bottom: 12px;
						display: flex;
						align-items: center;
						.intention_item_name {
							margin-right: 12px;
							font-family: PingFangSC-Medium;
							font-size: 16px;
							color: rgba(0,0,0,0.87);
							line-height: 22px;
						}
						.intention_item_status {
							border: 1px solid #FFAD71;
							padding: 0 5px;
							border-radius: 100px 100px 100px 0;
							font-family: PingFangSC-Medium;
							font-size: 12px;
							color: #FFAD71;
							line-height: 16px;
						}
						.intention_item_status1 {
							border: 1px solid #FFAD71;
							color: #FFAD71;
						}
						.intention_item_status2 {
							border: 1px solid #5BB3A4;
							color: #5BB3A4;
						}
					}
					.intention_item_info {
						width: 208px;
						margin-bottom: 4px;
						font-family: PingFangSC-Regular;
						font-size: 13px;
						color: rgba(0,0,0,0.60);
						line-height: 18px;
						text-align: left;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.intention_item_bottom {
						margin-top: 8px;
						display: flex;
						align-items: center;
						.intention_item_date {
							flex: 1;
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(0,0,0,0.26);
							line-height: 16px;
							text-align: left;
						}
						.intention_item_icon {
							margin-right: 6px;
							width: 14px;
							height: 14px;
						}
						.intention_item_push {
							font-family: PingFangSC-Medium;
							font-size: 12px;
							color: rgba(0,0,0,0.26);
							line-height: 16px;
						}
					}
				}
				.load_more{
			        width: 100%;
			        margin-left: auto;
			        margin-right: auto;
			        display: flex;
			        height: 40px;
			        flex-flow: column;
			        align-items: center;
			        justify-content: center;
			        // margin-top: 16px;
			        // border-bottom: 1px solid rgba(0,0,0,0.04);
			        cursor: pointer;
			        span{
			            font-size: 14px;
			            color: rgba(0,0,0,0.60);
			        }
		      	}
			}
			.intention_top {
				margin-top: 96px;
			}
		}
	}
</style>