<template>
	<div class="container">
		<div class="phone_item">
			<div class="phone_key">原密码</div>
			<input class="phone_value" id="password1" type="password" placeholder="请输入原密码" v-model="password1">
		</div>
		<div class="phone_item">
			<div class="phone_key">新密码</div>
			<input class="phone_value" id="password2" type="password" placeholder="请输入新密码" v-model="password2">
		</div>
		<div class="phone_item">
			<div class="phone_key">确认密码</div>
			<input class="phone_value" id="password3" type="password" placeholder="请输入重新确认密码" v-model="password3">
		</div>
		<div class="submit_btn" @click="confirmChange">确认修改</div>
		<confirm :show.sync="showConfirm" content="您确认修改密码吗？" @cancel="showConfirm = false" @confirm="confirm"></confirm>
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

				if (this.password1 == '' && this.password1 == undefined) {
					Toast('请输入原密码！')
					document.getElementById('password1').focus();
					this.$refs.password1.focus;
					return
				}
				if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.password1)) {
					Toast('原密码错误，密码必须为6～16位数字字母组合！')
					document.getElementById('password1').focus();
					return
				}
				if (this.password2 == '' && this.password2 == undefined) {
					Toast('请输入新密码！')
					document.getElementById('password2').focus();
					return
				}
				if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.password2)) {
					Toast('新密码错误，密码必须为6～16位数字字母组合！')
					document.getElementById('password2').focus();
					return
				}
				if (this.password3 == '' && this.password3 == undefined) {
					Toast('请输入确认密码！')
					document.getElementById('password3').focus();
					return
				}
				if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.password3)) {
					Toast('确认密码错误，密码必须为6～16位数字字母组合！')
					document.getElementById('password3').focus();
					return
				}
				this.showConfirm = true;
			},
			confirm() {
				let data = {
					oldPassword: this.password1,
					newPassword: this.password2,
					confirmPassword: this.password3
				}
				api.changePassword(data).then(res => {
					if(res.code == 0) {
						Toast('更换密码成功');
						localStorage.setItem('password', this.password2);
						setTimeout(() => {
							this.$router.back();
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