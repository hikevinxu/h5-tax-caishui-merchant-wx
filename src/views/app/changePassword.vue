<template>
	<div class="container">
		<div class="phone_item">
			<div class="phone_key">原密码</div>
			<input class="phone_value" ref="login_input2" type="password" placeholder="请输入原密码" v-model="password1">
		</div>
		<div class="phone_item">
			<div class="phone_key">新密码</div>
			<input class="phone_value" ref="login_input2" type="password" placeholder="请输入新密码" v-model="password2">
		</div>
		<div class="phone_item">
			<div class="phone_key">确认密码</div>
			<input class="phone_value" ref="login_input2" type="password" placeholder="请输入重新确认密码" v-model="password3">
		</div>
		<div class="submit_btn" @click="confirmChange">确认修改</div>
		<confirm :show.sync="showConfirm" content="您确认更换手机号？" @cancel="showConfirm = false" @confirm="confirm"></confirm>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Toast } from 'vant';
	import { getScript } from '@/utils/global.js'
	import api from '@/api/api'
	import Confirm from '@/components/confirm'
	Vue.use(Toast);
	export default {
		name: '',
		components: {
			Confirm
		},
		data() {
			return {
				password1: '',
				password2: '',
				password3: '',
				index: '',
				validate: '',
				showConfirm: false,
			}
		},
		watch: {
		    password1(val) {
		    	if(val.length > 16) {
		    		this.password1 = this.password1.slice(0, 16);
		    	}
		    },
		    password2(val) {
		    	if(val.length > 16) {
		    		this.password2 = this.password2.slice(0, 16);
		    	}
		    },
		    password3(val) {
		    	if(val.length > 16) {
		    		this.password3 = this.password3.slice(0, 16);
		    	}
		    }
		},
		computed: {

		},
		methods: {
			confirmChange() {
				if(!this.code1) {
					Toast('请输入原手机号验证码');
					this.$refs.code_input1.focus();
					return ;
				}else if(!/^[0-9]{4}$/.test(this.code1)) {
					Toast('请输入4位数字验证码');
					this.$refs.code_input1.focus();
					return ;
				}else if(!this.phone2) {
					Toast('请输入现手机号');
					this.$refs.login_input2.focus();
					return ;
				}else if(!/^1([358][0-9]|4[56789]|6[67]|7[0135678]|9[189])[0-9]{8}$/.test(this.phone2)) {
					Toast('请输入正确手机号');
					this.$refs.login_input2.focus();
					return ;
				}else if(!this.code2) {
					Toast('请输入现手机号验证码');
					this.$refs.code_input2.focus();
					return ;
				}else if(!/^[0-9]{4}$/.test(this.code2)) {
					Toast('请输入4位数字验证码');
					this.$refs.code_input2.focus();
					return ;
				}else {
					this.showConfirm = true;
				}
			},
			confirm() {
				let data = {
					clientType: "h5",
					newPhone: this.phone2,
					newVerificationCode: this.code2,
					originPhone: this.phone1,
					originVerificationCode: this.code1,
				}
				api.changePhone(data).then(res => {
					if(res.code == 0) {
						Toast('更换手机号成功');
						setTimeout(() => {
							this.$router.back();
							// localStorage.removeItem('accessToken');
							// this.$router.replace('/bindPhone');
							// location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9adab1432e4d7cf1&redirect_uri=https://wb.caishuiyu.com/bindPhone&response_type=code&scope=snsapi_base&state=123#wechat_redirect');
						}, 1000);
					}else {
						Toast(res.msg)
					}
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
		.phone_text {
			margin-top: 16px;
			margin-bottom: 32px;
			font-family: PingFangSC-Medium;
			font-size: 14px;
			color: rgba(0,0,0,0.87);
			text-align: center;
		}
		.phone_item {
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
				flex-shrink: 0;
			}
			.phone_value {
				flex: 1;
				width: 120px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(0,0,0,0.6);
				text-align: left;
				line-height: 20px;
				flex-shrink: 1;
			}
			.line1 {
				width: 1px;
				height: 24px;
				background: rgba(0,0,0,0.12);
				flex-shrink: 0;
			}
			.login_code_btn {
				margin-left: 16px;
				width: 66px;
				flex-shrink: 0;
				font-family: PingFangSC-Medium;
				font-size: 13px;
				color: #FFAD71;
				line-height: 16px;
				white-space: nowrap;
			}
			.login_code_btn_send {
				color: rgba(0, 0, 0, 0.26);
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