<template>
	<div class="container">
		<img class="phone_icon" src="@/assets/change-phone.png">
		<div class="phone_item">
			<div class="phone_key">当前绑定微信号</div>
			<div class="phone_value">{{wechatCode}}</div>
		</div>
		<div class="submit_btn" @click="confirmChange">确认修改</div>
		<confirm :show.sync="showConfirm" content="您确认解绑当前微信吗？" @cancel="showConfirm = false" @confirm="confirm"></confirm>
	</div>
</template>

<script>
	import Confirm from '@/components/confirm'
	import { Toast } from 'vant'
	import api from '@/api/api'
	export default {
		name: '',
		components: {
			Confirm
		},
		data() {
			return {
				wechatCode: 'dmklsmwkmswl',
				showConfirm: false
			}
		},
		watch: {

		},
		computed: {

		},
		methods: {
			confirmChange() {
				this.showConfirm = true;
			},
			confirm() {
				let data = {};
				api.unLinkWechat(data).then(res => {
					if(res.code == 0) {
						Toast('解绑成功，请重新登录');
						setTimeout(() => {
							this.$router.replace('/bindPhone');
							// location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9adab1432e4d7cf1&redirect_uri=${location.origin}/bindPhone&response_type=code&scope=snsapi_base&state=123#wechat_redirect`);
						}, 1000);
					}else {
						Toast(res.msg)
					}
				})
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-top: 32px;
		min-height: 100vh;
		background: #f5f5f5;
		display: flex;
		flex-direction: column;
		align-items: center;
		.phone_icon {
			width: 52px;
			height: 80px;
		}
		.phone_item {
			margin-top: 32px;
			padding: 0 16px;
			box-sizing: border-box;
			width: 100%;
			height: 48px;
			display: flex;
			align-items: center;
			background: #ffffff;
			.phone_key {
				width: 122px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(0,0,0,0.60);
				text-align: left;
				line-height: 20px;
			}
			.phone_value {
				flex: 1;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(0,0,0,0.87);
				text-align: right;
				line-height: 20px;
			}
		}
		.submit_btn {
			margin-top: 24px;
			width: 328px;
			height: 36px;
			background: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
			border-radius: 18px;
			font-family: PingFangSC-Medium;
			font-size: 15px;
			color: #FFFFFF;
			text-align: center;
			line-height: 36px;
		}
	}
</style>