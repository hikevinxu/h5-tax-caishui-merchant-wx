<template>
	<div class="mine">
		<div class="mine_top">
			<img class="mine_icon" src="@/assets/profile-photo@3x.png">
			<div class="mine_info">
				<div class="mine_compony">浙江安牛科技有限公司</div>
				<div class="mine_user">6753用户</div>
			</div>
		</div>
		<div class="mine_wallet">
			<div class="mine_wallet_item">
				<div class="mine_wallet_num">122</div>
				<div class="mine_wallet_text">金币</div>
			</div>
			<div class="line"></div>
			<div class="mine_wallet_item">
				<div class="mine_wallet_num">1000</div>
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
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
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
		},
		created() {

		},
		mounted() {

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
				}
				.mine_user {
					margin-top: 8px;
					font-family: PingFangSC-Medium;
					font-size: 16px;
					color: rgba(0,0,0,0.60);
					line-height: 22px;
					text-align: left;
				}
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