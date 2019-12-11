<template>
	<div class="container">
		<van-loading size="30px" vertical></van-loading>
		<div class="loading_text">自动登录中...</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	import Vue from 'vue';
	import { Loading, Toast } from 'vant';

	Vue.use(Loading);
	export default {
		name: '',
		data() {
			return {

			}
		},
		watch: {

		},
		computed: {

		},
		methods: {

		},
		created() {
			let data = {
				code: this.$route.query.code
			}
			api.wechatLogin(data).then(res => {
				if(res.code == 0) {
					Toast('登录成功');
					localStorage.setItem('accessToken', res.data.accessToken);
					this.$router.back();
				}
			})
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.loading_text {
			margin-top: 16px;
			font-family: PingFangSC-Regular;
	        font-size: 20px;
	        color: rgba(0, 0, 0, 0.38);
	        line-height: 30px;
		}
	}
</style>