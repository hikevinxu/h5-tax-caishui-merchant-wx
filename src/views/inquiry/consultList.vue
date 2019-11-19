<template>
	<div class="consult">
		<div class="consult_list" v-if="consultList.length > 0">
			<div class="consult_item" v-for="(item, index) in consultList" :key="item.id" @click="goDetail(item)">
				<div class="consult_item_top">
					<div class="consult_item_name">{{item.name}}</div>
					<div class="consult_item_price" v-show="item.status == 1 || item.status == 2">未报价</div>
					<div class="consult_item_price" v-show="item.status == 3" style="color: #FF7F4A">{{item.quotedPrice}}元</div>
					<div class="consult_item_price" v-show="item.status == 4 || item.status == 5">已过期</div>
					<div class="consult_item_time">{{item.createTime}}</div>
				</div>
				<div class="consult_item_bottom">
					<div class="consult_item_text">
						<div>询问类目：{{item.intention}}</div>
						<div v-if="item.area">需求区域：{{areaHandle(item.area)}}</div>
					</div>
					<span v-if="item.phone.indexOf('*') == -1" @click.stop="stopCall(item)"><a :href="'tel:' + item.phone"><img class="consult_item_phone" src="../../assets/ic_firm_call@3x.png"></a></span>
				</div>
			</div>
		</div>
		<div class="consult_none" v-else>
			<img class="consult_none_icon" src="@/assets/expense-calendar.png">
			<div class="consult_none_text">暂无线索，赶紧去抢单吧~</div>
		</div>
		<div class="load_more" @click="loadingMore" v-show="showLoad && !noMore">
            <span v-show="!loading_more">点击加载更多</span>
            <van-loading style="width: 10px;" v-show="loading_more == true" type="spinner" />
        </div>
        <div class="load_more" v-show="showLoad && noMore">
            <span>已经到底了</span>
        </div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import api from '@/api/api'
	import { Toast, Button, Loading } from 'vant'
	Vue.use(Loading);
	export default {
		data() {
			return {
		      	noMore: false,
		      	loading: false,
		      	loading_more: false,
		      	pageNum: 1,
		      	total: 0,
		      	consultList: [],
			}
		},
		computed: {
			showLoad() {
				return this.total > this.pageNum * 10;
			}
		},
		methods: {
			getList() {
				let data = {
					pageNum: this.pageNum,
					pageSize: 10
				}
				api.getConsultList(data).then(res => {
			        if(res.code == 0){
			          	this.consultList = this.consultList.concat(res.data.items)
			          	this.total = res.data.total
			          	this.loading_more = false
			          	if(res.data.items.length < 10){
			              	this.noMore = true
			          	}else{
			              	this.noMore = false
			          	}
			        }
			    })
			},
			loadingMore() {
				this.loading_more = true;
				this.pageNum ++;
				this.getList();
			},
			goDetail(item) {
				if(item.status != 2) {
					this.$router.push({
						path: '/inquiryDetail',
						query: {
							intentionId: item.id,
							from: 'clues_page'
						}
					})
				}else {
					this.$router.push({
						path: '/feedback',
						query: {
							intentionId: item.id,
							from: 'clues_page'
						}
					})
				}
				
			},
			stopCall(item) {
				let typeList = ['预审', '询价单']
				sa.track('WebCheckOnTheOfferBtn', {
			        type: typeList[item.intentionType - 1],
			        service_name: item.intention,
			        service_code: item.intentionCode,
			        service_area: item.area
			      })
			},
		    areaHandle(area) {
		      	let list = area.split('-').reverse();
		      	if(list.length > 2) {
		        	return `${list[1]}-${list[0]}`;
		      	}else {
		        	return area;
		      	}
		    }
		},
		created() {
			if(localStorage.getItem('merchant')) {
				this.getList();
		    }else {
		      	let params = {
		        	code: this.$route.query.code
		      	}
		      	api.weixinHasBind(params).then(res => {
		        	console.log(res)
		        	if(res.code == 0){
		          		let openId = res.data.openId
		          		localStorage.setItem('openId', openId)
		          		if(res.data.hasBind == false){
		            		this.hasBind = false
		            		this.$router.push({ path: '/bindPhone' })
		          		}else {
		            		this.hasBind = true
		            		let merchant = res.data.merchant.id
		            		console.log(merchant)
		            		localStorage.setItem('merchant', merchant)
							this.getList();
		          		}
		        	}
		      	})
		    }
		}
	}
</script>

<style lang="scss" scoped>
	.consult {
		padding: 16px;
		width: 100%;
		box-sizing: border-box;
		.consult_list {
			width: 100%;
			.consult_item {
				margin-bottom: 12px;
				border-bottom: 1px solid rgba(0,0,0,0.04);
				padding-bottom: 12px;
				width: 100%;
				&:last-child {
					margin-bottom: 0;
				}
				.consult_item_top {
					width: 100%;
					display: flex;
					align-items: center;
					.consult_item_name {
						font-family: PingFangSC-Medium;
						font-size: 16px;
						color: rgba(0,0,0,0.87);
						line-height: 22px;
					}
					.consult_item_price {
						margin-left: 12px;
						font-family: PingFangSC-Medium;
						font-size: 13px;
						color: #FB5332;
						line-height: 16px;
						flex: 1;
						text-align: left;
					}
					.consult_item_time {
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(0,0,0,0.38);
						line-height: 22px;
					}
				}
				.consult_item_bottom {
					margin-top: 4px;
					display: flex;
					align-items: center;
					.consult_item_text {
						flex: 1;
						font-family: PingFangSC-Regular;
						font-size: 13px;
						color: rgba(0,0,0,0.60);
						line-height: 22px;
						div {
							margin-bottom: 2px;
							text-align: left;
							&:last-child {
								margin-bottom: 0;
							}
						}
					}
					.consult_item_phone {
						width: 24px;
						height: 24px;
					}
				}
			}
		}
		.consult_none {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -60%);
			width: 100%;
			.consult_none_icon {
				margin: 0 auto;
				width: 80px;
				height: 80px;
				display: block;
			}
			.consult_none_text {
				margin-top: 16px;
				font-family: PingFangSC-Regular;
				font-size: 16px;
				color: rgba(0,0,0,0.38);
				line-height: 28px;
				text-align: center;
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
</style>