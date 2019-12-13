<template>
	<div class="container">
		<img class="img" src="@/assets/body_01.png">
		<img class="img" src="@/assets/body_02.png">
		<div class="bottom_box">
			<div class="bottom_btn" @click="init">立即入驻</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		name: '',
		data() {
			return {
				hasBind: true
			}
		},
		watch: {

		},
		computed: {

		},
		methods: {
			init() {
				if(!this.hasBind) {
					this.$router.replace('/bindPhone');
				}else {
					this.$router.replace({ path: '/hall' });
				}
			}
		},
		created() {
			let code = this.$route.query.code
			if(code){
				let params = {
					code: this.$route.query.code
				}
				api.registerHasBind(params).then(res => {
					console.log(res)
					if(res.code == 0){
						localStorage.setItem('openId', res.data.openId)
						if(res.data.hasBind == false){
							this.hasBind = false
						}else {
							this.hasBind = true
							let merchant = res.data.merchant.id;
							localStorage.setItem('merchant', merchant)
							location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9adab1432e4d7cf1&redirect_uri=${location.origin}/hall&response_type=code&scope=snsapi_base&state=123#wechat_redirect`)
						}
					}
				})
				.catch((error) => {
					console.log(error)
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 68px;
		.img {
			width: 100%;
		}
		.bottom_box {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 68px;
			background: #FFFFFF;
			box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
			display: flex;
		    align-items: center;
		    justify-content: center;
		    .bottom_btn {
		    	display: block;
		        width: 328px;
		        height: 36px;
		        line-height: 36px;
		        text-align: center;
		        background: linear-gradient(135deg, #FF7F4A 0%, #FB5332 100%);
		        box-shadow: 0 2px 4px 0 rgba(255,173,113,0.30);
		        border-radius: 18px;
		        font-size: 15px;
		        color: #FFFFFF;
		    }
		}
	}
</style>