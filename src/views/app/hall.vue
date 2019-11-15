<template>
	<div class="hall">
		<div class="banner" :class="{height0: !showBanner}">
			<div class="swiper-container1">
			    <div class="swiper-wrapper">
			      	<img class="swiper-slide banner_item" v-for="(item, index) in imgList" :src="item" :key="index">
			    </div>
	  		</div>
		</div>
		<div class="hall_container">
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
						      	<div class="swiper-slide message_item" v-for="(item, index) in messageList" :src="item" :key="index" v-html="">
						      		<img src="@/assets/notice@3x.png">
						      		<p>{{item.name}}已对接<span>{{item.area}}</span>的<span>{{item.business}}</span>业务</p>
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
				</div>
				<div class="filter_box" v-show="showFilter" @click.self="closeFilter">
					<div class="filter_container">
						<div class="filter_left">
							<div class="filter_left_item">
								<div class="filter_left_item_icon"></div>
								<div class="filter_left_item_text">全部</div>
								<div class="filter_left_item_arrow"></div>
							</div>
							<div class="filter_left_item" v-for="item in city" :key="item.code" :class="{filter_left_item_active: fatherItem.code == item.code}" @click="select1(item)">
								<div class="filter_left_item_icon"></div>
								<div class="filter_left_item_text">{{item.name}}</div>
								<img class="filter_left_item_arrow" src="@/assets/right@3x.png" v-if="item.childs.length > 1">
								<div class="filter_left_item_arrow" v-else></div>
							</div>
						</div>
						<div class="filter_right">
							<div class="filter_right_item" v-for="item_ in childs" :key="item_.code" :class="{filter_right_item_active: childItem.code == item_.code}" @click="select2(item_)">{{item_.name}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="intention">
				<div class="intention_item">
					<img class="intention_item_type" src="@/assets/label-1@3x.png">
					<div class="intention_item_detail">查看详情</div>
					<div class="intention_item_top">
						<div class="intention_item_name">刘先生</div>
						<div class="intention_item_status">对接中</div>
					</div>
					<div class="intention_item_info">询问类目：工商服务-公司注册</div>
					<div class="intention_item_info">需求区域：杭州市-西湖区</div>
					<div class="intention_item_info">客户意向：行业制造业，收入规模哈哈哈</div>
					<div class="intention_item_bottom">
						<div class="intention_item_date">2019.09.16 23:24</div>
						<img class="intention_item_icon" src="@/assets/has-pushed@3x.png">
						<div class="intention_item_push">已推给我</div>
					</div>
				</div>
				<div class="intention_item">
					<img class="intention_item_type" src="@/assets/label-1@3x.png">
					<div class="intention_item_detail">查看详情</div>
					<div class="intention_item_top">
						<div class="intention_item_name">刘先生</div>
						<div class="intention_item_status">对接中</div>
					</div>
					<div class="intention_item_info">询问类目：工商服务-公司注册</div>
					<div class="intention_item_info">需求区域：杭州市-西湖区</div>
					<div class="intention_item_info">客户意向：行业制造业，收入规模哈哈哈</div>
					<div class="intention_item_bottom">
						<div class="intention_item_date">2019.09.16 23:24</div>
						<img class="intention_item_icon" src="@/assets/has-pushed@3x.png">
						<div class="intention_item_push">已推给我</div>
					</div>
				</div>
				<div class="intention_item">
					<img class="intention_item_type" src="@/assets/label-1@3x.png">
					<div class="intention_item_detail">查看详情</div>
					<div class="intention_item_top">
						<div class="intention_item_name">刘先生</div>
						<div class="intention_item_status">对接中</div>
					</div>
					<div class="intention_item_info">询问类目：工商服务-公司注册</div>
					<div class="intention_item_info">需求区域：杭州市-西湖区</div>
					<div class="intention_item_info">客户意向：行业制造业，收入规模哈哈哈</div>
					<div class="intention_item_bottom">
						<div class="intention_item_date">2019.09.16 23:24</div>
						<img class="intention_item_icon" src="@/assets/has-pushed@3x.png">
						<div class="intention_item_push">已推给我</div>
					</div>
				</div>
				<div class="intention_item">
					<img class="intention_item_type" src="@/assets/label-1@3x.png">
					<div class="intention_item_detail">查看详情</div>
					<div class="intention_item_top">
						<div class="intention_item_name">刘先生</div>
						<div class="intention_item_status">对接中</div>
					</div>
					<div class="intention_item_info">询问类目：工商服务-公司注册</div>
					<div class="intention_item_info">需求区域：杭州市-西湖区</div>
					<div class="intention_item_info">客户意向：行业制造业，收入规模哈哈哈</div>
					<div class="intention_item_bottom">
						<div class="intention_item_date">2019.09.16 23:24</div>
						<img class="intention_item_icon" src="@/assets/has-pushed@3x.png">
						<div class="intention_item_push">已推给我</div>
					</div>
				</div>
				<div class="intention_item">
					<img class="intention_item_type" src="@/assets/label-1@3x.png">
					<div class="intention_item_detail">查看详情</div>
					<div class="intention_item_top">
						<div class="intention_item_name">刘先生</div>
						<div class="intention_item_status">对接中</div>
					</div>
					<div class="intention_item_info">询问类目：工商服务-公司注册</div>
					<div class="intention_item_info">需求区域：杭州市-西湖区</div>
					<div class="intention_item_info">客户意向：行业制造业，收入规模哈哈哈</div>
					<div class="intention_item_bottom">
						<div class="intention_item_date">2019.09.16 23:24</div>
						<img class="intention_item_icon" src="@/assets/has-pushed@3x.png">
						<div class="intention_item_push">已推给我</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import city from '@/mock/city_code'
	export default {
		data() {
			return {
				imgList: [require('@/assets/ic_articlelist_date.png'), require('@/assets/ic_articlelist_rewarded.png')],
				userNum: 0,
				typeNum: 0,
				messageList: [
					{
						id: 1,
						name: '刘先生',
						area: '浙江省-杭州市-西湖区',
						business: '公司注册'
					},{
						id: 2,
						name: '张先生',
						area: '浙江省-杭州市-余杭区',
						business: '公司注册'
					}
				],
				filterType: '',
				showBanner: true,
				showBanner_: true,
				city: city,
				fatherItem: {},
				childs: [],
				childItem: {},
				showFilter: false,
				cityText: '筛选城市',
				serveText: '筛选服务',
				typeText: '筛选类型'
			}
		},
		watch: {
			showFilter(val) {
				if(val) {
					this.showBanner = !val;
				}
			}
		},
		computed: {

		},
		methods: {
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
			closeFilter() {
				this.filterType = '';
				this.showFilter = '';
			},
			filter(type) {
				this.filterType = this.filterType == type ? '' : type;
				this.showFilter = this.filterType ? true : false;
				this.$nextTick(() => {
					document.getElementsByClassName('filter_box')[0].style.height = window.innerHeight - 96 + 'px';
				})
			},
			select1(item) {
				this.childItem = {};
				this.fatherItem = item;
				this[this.filterType + 'Text'] = item.name;
				if(item.childs.length > 1) {
					this.childs = item.childs;
				}else {
					setTimeout(() => {
						this.showFilter = false;
						this.filterType = '';
					}, 100);
				}
			},
			select2(item) {
				this.childItem = item;
				this[this.filterType + 'Text'] = item.name;
				setTimeout(() => {
					this.showFilter = false;
					this.filterType = '';
				}, 100);
				
			}
		},
		created() {
			this.getNum();
		},
		mounted() {
			// banner轮播
			new Swiper('.swiper-container1', {
		      	autoplay: {
			        delay: 2500,
			        disableOnInteraction: false,
		      	},
		      	loop : true,
		    });
		    // 消息轮播
		    new Swiper('.swiper-container2', {
		    	direction: 'vertical',
		      	autoplay: {
		        	delay: 2500,
		        	disableOnInteraction: false,
		      	},
		      	loop : true,
		    });
		    // 监听用户行为判断是否展示banner
		    let scroll_y = 0;
		    window.addEventListener('scroll', () => {
		    	if(scroll_y == 0 && window.scrollY > 0) {
		    		this.showBanner = false;
		    	}
		    	if(window.scrollY == 0 && !this.showFilter) {
		    		this.showBanner = true;
		    	}
		    	scroll_y = window.scrollY;
		    })
		    let clientY = '';
		    let distance;
		    window.addEventListener('touchmove', (e) => {
		    	if(clientY && !this.showFilter) {
		    		console.log(e.target);
		    		distance = e.target.classList.includes['swiper-container1'] ? 20 : 1;
		    		if(clientY + distance < e.targetTouches[0].clientY) {
			    		this.showBanner = true;
			    	}
			    	if(clientY > e.targetTouches[0].clientY + distance) {
			    		this.showBanner = false;
			    	}
		    	}
		    	clientY = e.targetTouches[0].clientY;
		    })
		}
	}
</script>

<style lang="scss" scoped>
	.hall {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		.banner {
			width: 100%;
			height: 130px;
			overflow: auto;
			.banner_item {
				height: 130px;
			}
		}
		.height0 {
			height: 0;
			overflow: hidden;
		}
		.hall_container {
			position: relative;
			flex: 1;
			padding-bottom: 48px;
			display: flex;
			flex-direction: column;
			.hall_container_top {
				position: absolute;
				top: 0;
				width: 100%;
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
								height: 32px;
								padding-left: 16px;
								display: flex;
								align-items: center;
								img {
									margin-right: 8px;
									width: 18px;
									height: 18px;
								}
								p {
									font-family: PingFangSC-Regular;
									font-size: 12px;
									color: rgba(0,0,0,0.60);
									line-height: 18px;
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
								width: 102px;
								height: 40px;
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: rgba(0,0,0,0.38);
								text-align: center;
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
				margin-top: 96px;
				padding: 12px 12px 0;
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
			}
		}
	}
</style>