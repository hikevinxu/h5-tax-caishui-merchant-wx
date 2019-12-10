<template>
	<div class="container">
		<img class="phone_icon" src="@/assets/change-phone.png">
		<div class="phone_text">您的手机号：{{phone1}}</div>
		<div class="phone_item">
			<div class="phone_key">原手机号验证码</div>
			<input class="phone_value" ref="code_input1" type="text" placeholder="请输入名称" v-model="code1">
			<div class="line1"></div>
			<div class="login_code_btn" :class="{login_code_btn_send: !isSend1}" id="getPhoneCode1" @click.stop.prevent="getCode('1')">{{codeText1}}</div>
		</div>
		<div class="phone_item">
			<div class="phone_key">现手机号码</div>
			<input class="phone_value" ref="login_input2" type="text" placeholder="请输入手机号码" v-model="phone2">
		</div>
		<div class="phone_item">
			<div class="phone_key">现手机验证码</div>
			<input class="phone_value" ref="code_input2" type="text" placeholder="请输入名称" v-model="code2">
			<div class="line1"></div>
			<div class="login_code_btn" :class="{login_code_btn_send: !isSend2}" id="getPhoneCode2" @click.stop.prevent="getCode('2')">{{codeText2}}</div>
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
				phone1: '17865922909',
				phone2: '',
				code1: '',
				code2: '',
				codeText1: '获取验证码',
				codeText2: '获取验证码',
				isSend1: true,
				isSend2: true,
				index: '',
				time1: null,
				timer2: null,
				validate: '',
				showConfirm: false,
			}
		},
		watch: {

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
						Toast('更换手机号成功，请重新登录');
						setTimeout(() => {
							this.$router.replace('/bindPhone');
							// location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9adab1432e4d7cf1&redirect_uri=https://wb.caishuiyu.com/bindPhone&response_type=code&scope=snsapi_base&state=123#wechat_redirect');
						}, 1000);
					}else {
						Toast(res.msg)
					}
				})
			},
			getCode(index){
				if(!/^1([358][0-9]|4[56789]|6[67]|7[0135678]|9[189])[0-9]{8}$/.test(this[`phone${index}`])) {
					this.$refs[`login_input${index}`].focus();
					Toast('请输入正确的手机号后获取')
				}else {
					this.index = index;
					this.inst && this.inst.verify();
				}
			},
			setCaptcha(){
				getScript('//cstaticdun.126.net/load.min.js',()=>{
					this.initCaptcha('1');
					this.initCaptcha('2');
				})
			},
			initCaptcha(index){
				let self = this
				initNECaptcha({
					captchaId: 'ed852fa384a14b579172a3f93ba4c934',
					element: `#getPhoneCode${index}`,
					mode: 'bind',
					width: 320,
					onVerify: function (err, data) {
						if(data){
							self.validate = data.validate
							self.sendPhoneCode()
						}
					}
				}, function onload (instance) {
					self.inst = instance
				}, function onerror (err) {
					Toast('验证码初始化失败，请刷新页面');
				})
			},
			sendPhoneCode() {
				let index = this.index
				if(this[`isSend${index}`]) {
					let data
					if(/^1([358][0-9]|4[56789]|6[67]|7[0135678]|9[189])[0-9]{8}$/.test(this[`phone${index}`])) {
						data = {
							phone: this[`phone${index}`],
				            captchaValidate: this.validate,
				            clientType: 'h5'
						}
					}else {
						Toast('请输入正确的手机号');
						return false;
					}
					let self = this;
					let methodList = ['sendVerifyOrigin', 'verifyNew'];
					api[methodList[this.index - 1]](data).then(res => {
						self.initCaptcha(index);
						if (res.code == 0) {
							Toast('发送验证码成功');
							let seconds = 60;
							let getCode = function () {
								if (seconds > 0) {
									self[`isSend${index}`] = false;
									self[`codeText${index}`] = seconds + '秒';
									seconds--;
								} else {
									self[`codeText${index}`] = '已发送';
									clearInterval(self[`timer${index}`]);
									setTimeout(() => {
										self[`isSend${index}`] = true;
										self[`codeText${index}`] = '获取验证码'
									}, 1000)
								}
							}
							getCode();
							self[`timer${index}`] = setInterval(getCode, 1000);
						} else {
							Toast(res.msg)
						}
					})
				}
			},
		},
		created() {
			this.$nextTick(() => {
				this.setCaptcha();
			})
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