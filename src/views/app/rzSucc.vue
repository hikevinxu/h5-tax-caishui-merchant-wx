<template>
	<div class="container">
		<div class="content_info">
			<div class="content_info_item">
				<div class="content_info_key">商户名称</div>
				<div class="content_info_value1">{{info.name}}</div>
			</div>
			<div class="content_info_item">
				<div class="content_info_key">负责人</div>
				<div class="content_info_value1">{{info.contactName}}</div>
			</div>
			<div class="content_info_item">
				<div class="content_info_key">商户账号</div>
				<div class="content_info_value1">{{info.contactPhone}}</div>
			</div>
		</div>
		<div class="content_title">账户资质</div>
		<div class="content_info">
			<div class="content_img">
				<div class="idcrad_box">
					<img class="idcrad_img" :src="info.businessLicenseImg">
				</div>
				<div class="idcrad_default_text">营业执照</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		name: '',
		data() {
			return {
				info: {}
			}
		},
		watch: {

		},
		computed: {

		},
		methods: {
			getData() {
				api.authenticationInfo({}).then(res => {
					if(res.code == 0) {
						this.info = res.data;
					}
				})
			}
		},
		created() {
			this.getData();
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		background: #F5F5F5;
		.content_title {
			padding-left: 16px;
			box-sizing: border-box;
			width: 100%;
			height: 52px;
			font-family: PingFangSC-Medium;
			font-size: 14px;
			color: rgba(0,0,0,0.87);
			text-align: left;
			line-height: 52px;
		}
		.content_info {
			width: 100%;
			background: #ffffff;
			.content_info_item {
				padding: 0 16px;
				box-sizing: border-box;
				width: 100%;
				height: 48px;
				display: flex;
				align-items: center;
				.content_info_key {
					width: 64px;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(0,0,0,0.60);
					text-align: left;
					line-height: 20px;
				}
				.content_info_value1 {
					flex: 1;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(0,0,0,0.87);
					text-align: right;
					line-height: 20px;
				}
			}
			.content_img {
				width: 100%;
				box-sizing: border-box;
				padding: 20px 32px 12px;
				.idcrad_box {
					position: relative;
					width: 84px;
					height: 84px;
					.idcrad_img {
						width: 84px;
						height: 84px;
					}
				}
				.idcrad_default_text {
					width: 84.1px;
					margin-top: 8px;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: rgba(0,0,0,0.26);
					text-align: center;
					line-height: 18px;
				}
			}
		}
	}
</style>