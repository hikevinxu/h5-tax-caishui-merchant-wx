<template>
	<div class="mine">
		<div class="mine_top" @click="goRz">
			<img class="mine_icon" :src="componyInfo.logo ? componyInfo.logo : require('@/assets/profile-photo@3x.png')">
			<div class="mine_info">
				<div class="mine_compony">
					<div class="mine_compony_name">{{componyInfo.name || '未认证公司'}}</div>
					<div class="mine_rz" v-if="status < 102">
						<span>去认证</span>
						<img src="@/assets/mine-redright.png">
					</div>
				</div>
				<div class="mine_user">
					<span>{{componyInfo.merchantName}}</span>
					<div class="mine_rz_status" v-if="status >= 102" :class="{mine_rz_finish: status == 103}">({{statusList[status]}})</div>
				</div>
			</div>
			<img class="mine_arrow" v-if="status >= 102" src="@/assets/ic_chevron_right_small@3x.png">
		</div>
		<div class="mine_wallet">
			<div class="mine_wallet_item">
				<div class="mine_wallet_num">{{data.balance}}</div>
				<div class="mine_wallet_text">金币</div>
			</div>
			<div class="line"></div>
			<div class="mine_wallet_item">
				<div class="mine_wallet_num">{{data.bonusBalance}}</div>
				<div class="mine_wallet_text">赠币</div>
			</div>
		</div>
		<div class="mine_bottom">
			<div class="mine_bottom_item" @click="goMyAccount">
				<img class="mine_bottom_item_icon" src="@/assets/mine-account@3x.png">
				<div class="mine_bottom_item_text">我的账户</div>
				<img class="mine_bottom_item_arrow" src="@/assets/ic_chevron_right_small.png">
			</div>
			<div class="mine_bottom_item" @click="goRecharge">
				<img class="mine_bottom_item_icon" src="@/assets/mine-top-up@3x.png">
				<div class="mine_bottom_item_text">充值</div>
				<img class="mine_bottom_item_arrow" src="@/assets/ic_chevron_right_small.png">
			</div>
			<div class="mine_bottom_item" @click="changePhone">
				<img class="mine_bottom_item_icon" src="@/assets/mine-replace.png">
				<div class="mine_bottom_item_text">更换手机号</div>
				<img class="mine_bottom_item_arrow" src="@/assets/ic_chevron_right_small.png">
			</div>
			<div class="mine_bottom_item" @click="unlinkWechat">
				<img class="mine_bottom_item_icon" src="@/assets/mine-wechat.png">
				<div class="mine_bottom_item_text">解绑微信</div>
				<img class="mine_bottom_item_arrow" src="@/assets/ic_chevron_right_small.png">
			</div>
			<!-- <div class="mine_bottom_item" @click="changePassword">
				<img class="mine_bottom_item_icon" src="@/assets/mine-wechat.png">
				<div class="mine_bottom_item_text">修改密码</div>
				<img class="mine_bottom_item_arrow" src="@/assets/ic_chevron_right_small.png">
			</div> -->
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		name: 'mine',
		data() {
			return {
				data: {
			        balance: 0,
			        bonusBalance: 0
			    },
			    componyInfo: {},
			    hasBind: false,
			    status: '',
			    statusList: {
			    	'100': '未认证',
			    	'101': '未认证',
			    	'102': '审核中',
			    	'103': '已认证',
			    	'999': '审核失败'
			    }
			}
		},
		methods: {
			applyStatus() {
				api.applyStatus({}).then(res => {
					if(res.code == 0) {
						this.status = res.data.status;
						localStorage.setItem('status', res.data.status);
					}else if(res.code == 10000) {
						console.log(111111);
			        	location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9adab1432e4d7cf1&redirect_uri=${location.origin}/bindPhone&response_type=code&scope=snsapi_base&state=123#wechat_redirect`)
			        }
				})
			},
			merchantDetail() {
				api.merchantDetail().then(res => {
					console.log(res)
					if(res.code == 0){
						this.data = res.data
						if(!res.data.bonusBalance){
							this.data.bonusBalance = 0
						}
					}
				})
			},
			getComponyInfo() {
				api.companyInfo({}).then(res => {
					if(res.code == 0){
						this.componyInfo = res.data;
					}
				})
			},
			goMyAccount() {
				this.$router.push({
					path: '/myAccount'
				})
			},
			goRecharge() {
				this.$router.push({
					path: '/recharge'
				})
			},
			changePhone() {
				this.$router.push('/changePhone')
			},
			unlinkWechat() {
				this.$router.push('/unlinkWechat')
			},
			changePassword() {
				this.$router.push('/changePassword')
			},
			goRz() {
				if(this.status == 102 || this.status == 999) {
					this.$router.push({
						path: '/rzResult',
						query: {
							status: this.status
						}
					});
				}else if(this.status < 102) {
					this.$router.push({
						path: '/renzheng'
					})
				}else {
					this.$router.push({
						path: '/rzSucc'
					})
				}
			}
		},
		created() {
			this.merchantDetail();
			this.getComponyInfo();
			this.applyStatus();
			// if(localStorage.getItem('merchant')) {
			// 	this.merchantDetail();
			// 	this.getComponyInfo();
			// }else {
			// 	let params = {
			// 		code: this.$route.query.code
			// 	}
			// 	api.weixinHasBind(params).then(res => {
			// 		console.log(res)
			// 		if(res.code == 0){
			// 			this.openId = res.data.openId
			// 			localStorage.setItem('openId',this.openId)
			// 			if(res.data.hasBind == false){
			// 				this.hasBind = false
			// 				location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9adab1432e4d7cf1&redirect_uri=https://wb.caishuiyu.com/bindPhone&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
			// 			}else {
			// 				this.hasBind = true
			// 				let merchant = res.data.merchant.id
			// 				console.log(merchant)
			// 				localStorage.setItem('merchant', merchant)
			// 				this.merchantDetail();
			// 				this.getComponyInfo();
			// 			}
			// 		}else {
			// 			location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9adab1432e4d7cf1&redirect_uri=https://wb.caishuiyu.com/bindPhone&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
			// 		}
			// 	})
			// }
		},
		mounted() {
			console.log(1);
		}
	}
</script>

<style lang="scss" scoped>
	.mine {
		padding: 0 24px;
		box-sizing: border-box;
		width: 100%;
		.mine_top {
			width: 100%;
			height: 112px;
			display: flex;
			align-items: center;
			.mine_icon {
				margin-right: 16px;
				width: 64px;
				height: 64px;
			}
			.mine_info {
				.mine_compony {
					font-family: PingFangSC-Medium;
					font-size: 20px;
					color: rgba(0,0,0,0.87);
					line-height: 30px;
					text-align: left;
					display: flex;
					.mine_compony_name {
						max-width: 160px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.mine_rz {
						margin-left: 12px;
						align-self: flex-start;
						margin-top: 10px;
						display: flex;
						align-items: center;
						span {
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #FF7F4A;
							line-height: 16px;
							white-space: nowrap;
						}
						img {
							width: 16px;
							height: 16px;
						}
					}
				}
				.mine_user {
					margin-top: 8px;
					font-family: PingFangSC-Medium;
					font-size: 16px;
					color: rgba(0,0,0,0.60);
					line-height: 22px;
					text-align: left;
					display: flex;
					align-items: flex-end;
					.mine_rz_status {
						margin-left: 8px;
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #FB5332;
						line-height: 16px;
					}
					.mine_rz_finish {
						color: #5AB3A4;
					}
				}
			}
			.mine_arrow {
				width: 16px;
				height: 16px;
			}
		}
		.mine_wallet {
			border: 1px solid rgba(255,173,113,0.16);
			border-radius: 2px;
			padding: 12px 0;
			width: 100%;
			background: rgba(255,173,113,0.04);
			display: flex;
			justify-content: space-between;
			align-items: center;
			.mine_wallet_item {
				flex: 1;
				.mine_wallet_num {
					font-family: PingFangSC-Medium;
					font-size: 20px;
					color: #FF7F4A;
					text-align: center;
					line-height: 30px;
				}
				.mine_wallet_text {
					margin-top: 4px;
					font-family: PingFangSC-Medium;
					font-size: 14px;
					color: rgba(0,0,0,0.60);
					text-align: center;
					line-height: 20px;
				}
			}
			.line {
				width: 0;
				height: 20px;
				opacity: 0.3;
				border-left: 1px solid rgba(255,173,113,0.40);
			}
		}
		.mine_bottom {
			margin-top: 16px;
			.mine_bottom_item {
				width: 100%;
				height: 56px;
				display: flex;
				align-items: center;
				.mine_bottom_item_icon {
					margin-right: 16px;
					width: 24px;
					height: 24px;
				}
				.mine_bottom_item_text {
					flex: 1;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(0,0,0,0.60);
					text-align: left;
					line-height: 20px;
				}
				.mine_bottom_item_arrow {
					width: 16px;
				}
			}
		}
	}
</style>