<template>
	<div class="container">
		<img class="rz_img" :src="status == 102 ? require('@/assets/img_page_complete.png') : require('@/assets/img_page_failed.png')">
		<div class="rz_text1">{{rz_text1}}</div>
		<div class="rz_text2" v-show="status == 102">1个工作日内将通知您审核结果</div>
		<div class="rz_text2" v-show="status == 999">因{{failCause}}，审核失败<br/>请重新提交，感谢您的合作</div>
		<div class="submit_btn" v-if="status != 102" @click="reset">重新提交</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		name: '',
		data() {
			return {
				status: '',
				failCause: ''
			}
		},
		watch: {

		},
		computed: {
			rz_text1() {
				return this.status == 102 ? ' 商户认证申请提交成功' : '商户认证申请审核失败';
			}
		},
		methods: {
			reset() {
				api.reset({}).then(res => {
					if(res.code == 0) {
						this.$router.replace('/renzheng');
					}
				})
			},
			applyStatus() {
				api.applyStatus({}).then(res => {
					if(res.code == 0) {
						this.status = res.data.status;
						this.failCause = res.data.failCause;
					}
				})
			},
		},
		created() {
			this.applyStatus();
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-top: 140px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.rz_img {
			width: 120px;
			height: 120px;
		}
		.rz_text1 {
			margin-top: 16px;
			font-family: PingFangSC-Medium;
			font-size: 16px;
			color: rgba(0,0,0,0.87);
			text-align: center;
			line-height: 22px;
		}
		.rz_text2 {
			margin-top: 8px;
			font-family: PingFangSC-Regular;
			font-size: 12px;
			color: rgba(0,0,0,0.38);
			text-align: center;
			line-height: 18px;
		}
		.submit_btn {
			margin-top: 24px;
			width: 240px;
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