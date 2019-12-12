<template>
	<div class="container">
		<div class="notice">
			<img class="notice_icon" src="@/assets/notice@3x.png">
			<div class="notice_text">企业信息经过安全加密只做审核用，请放心填写</div>
		</div>
		<div class="content_title">企业信息认证</div>
		<div class="content_info">
			<div class="content_info_item" v-if="fileUrl1">
				<div class="content_info_key">机构名称</div>
				<input class="content_info_value1" type="text" placeholder="请输入名称" v-model="name">
			</div>
			<div class="content_info_item" v-if="fileUrl1">
				<div class="content_info_key">社会信用代码</div>
				<input class="content_info_value1" type="text" placeholder="请输入社会信用代码" v-model="code">
			</div>
			<div class="content_img">
				<div class="idcrad_box">
					<div class="idcrad_delete" v-show="fileUrl1" @click="deleteImg('1')">
						<img src="@/assets/close.png">
					</div>
					<div class="idcrad_default_img" v-if="!img1"></div>
					<img class="idcrad_img" :src="img1" v-else>
					<input class="idcard_input" id="file" type="file" accept="image/*" @change="getFile1">
				</div>
				<div class="idcrad_default_text">营业执照</div>
			</div>
		</div>
		<div class="content_title">法人信息认证</div>
		<div class="content_info">
			<div class="content_img">
				<div class="idcrad_box">
					<div class="idcrad_delete" v-show="img2" @click="deleteImg('2')">
						<img src="@/assets/close.png">
					</div>
					<div class="idcrad_default_img" v-if="!img2"></div>
					<img class="idcrad_img" :src="img2" v-else>
					<input class="idcard_input" type="file" accept="image/*" value="file" @change="getFile2">
				</div>
				<div class="idcrad_default_text">法人手持身份证</div>
			</div>
		</div>
		<p class="argument-agree" @click="changeAgree">
	        <img class="check" src="@/assets/checkbox_on.png" v-if="isAgreement">
	        <img class="check" src="@/assets/checkbox_off.png" v-else>
	        <span class="argument_text">已阅读并同意<span @click.stop="goAgreement">《用户服务协议》</span></span>
	    </p>
	    <div class="submit_btn" :class="{submit_btn_no: !canRz}" @click="submit">提交申请</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	import { baseURL } from '@/api/axios'
	import $ from 'zhangjia-zepto'
	import { Toast } from 'vant'
	export default {
		name: 'renzheng',
		data() {
			return {
				img1: '',
				img2: '',
				isAgreement: true,
				file1: {},
				file2: {},
				name: '',
				code: '',
				fileUrl1: '',
				fileUrl2: ''
			}
		},
		watch: {

		},
		computed: {
			canRz() {
				return this.fileUrl1 && this.name && this.code && this.fileUrl2;
			}
		},
		methods: {
			// 获取文件
			getFile1(e) {
				console.log(111);
				let self = this;
				this.file1 = e.target.files[0];
				this.submitImg1();
				var reads= new FileReader();
		        reads.readAsDataURL(e.target.files[0]);
		        reads.onload=function () {
		        	console.log(this.result)
		            self.img1 = this.result;
		        };
			},// 获取文件
			getFile2(e) {
				let self = this;
				this.file2 = e.target.files[0];
				this.submitImg2();
				var reads= new FileReader();
		        reads.readAsDataURL(e.target.files[0]);
		        reads.onload=function () {
		            self.img2 = this.result;
		        };
			},
			deleteImg(index) {
				this[`img${index}`] = '';
				this[`fileUrl${index}`] = '';
				if(index == '1') {
					document.getElementById("file").value = "";
				} 
			},
			submitImg1() {
				const formData = new FormData();
				formData.append('files', this.file1);
				var self = this;
				$.ajax({
					url: baseURL + '/wechat/enterpriseAuth/uploadBusinessLicense',
					type: 'post',
					processData: false,
					contentType: false,
					data: formData,
					dataType: 'json',
					headers: {
						'Authorization': localStorage.getItem('accessToken'),
					},
					success(res) {
						if(res.code == 0) {
							self.fileUrl1 = res.data.fileId;
							self.name = res.data.data['单位名称'].words;
							self.code = res.data.data['社会信用代码'].words;
						}else {
							Toast(res.msg);
						}
					}
			    })
			},
			submitImg2() {
				const formData = new FormData();
				formData.append('files', this.file2);
				var self = this;
				$.ajax({
					url: baseURL + '/fileupload/upload',
					type: 'post',
					processData: false,
					contentType: false,
					data: formData,
					dataType: 'json',
					headers: {
						'Authorization': localStorage.getItem('accessToken'),
					},
					success(res) {
						if(res.code == 0) {
							self.fileUrl2 = res.data[0].fileId;
							// self.tipShow = true;
						}else {
							// this.$message({
							// 	text: res.msg,
							// 	type: 'warn'
							// })
							// this.isSubmit = false;
						}
					}
			    })
			},
			submit() {
				if(!this.canRz) {
					if(!this.fileUrl1) {
						Toast('请先上传营业执照');
						return ;
					}
					if(!this.name) {
						Toast('请先填写机构名称');
						return ;
					}
					if(!this.code) {
						Toast('请先填写社会信用代码');
						return ;
					}
					if(!this.fileUrl2) {
						Toast('请先上传法人手持身份证');
						return ;
					}
				}
				let data = {
					businessLicenseImg: this.fileUrl1,
					idCardImg: this.fileUrl2,
					organization: this.name,
					socialCreditCode: this.code
				}
				api.apply(data).then(res => {
					if(res.code == 0) {
						this.$router.replace({
							path: '/rzResult',
							query: {
								status: 102
							}
						})
					}
				})
			},
			changeAgree() {
      			this.isAgreement = !this.isAgreement;
			},
		    goAgreement() {
		      	this.$router.push('/agreement');
		    },
		},
		created() {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		background: #F5F5F5;
		.notice {
			padding: 0 16px;
			box-sizing: border-box;
			width: 100%;
			height: 40px;
			display: flex;
			align-items: center;
			background: #FFEFE3;
			.notice_icon {
				margin-right: 8px;
				width: 18px;
				height: 18px;
			}
			.notice_text {
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: #FF7F4A;
				line-height: 18px;
			}
		}
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
				padding-left: 16px;
				box-sizing: border-box;
				width: 100%;
				height: 48px;
				display: flex;
				align-items: center;
				.content_info_key {
					width: 102px;
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
					text-align: left;
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
					.idcrad_delete {
						position: absolute;
						top: -8px;
						right: -8px;
						height: 16px;
						width: 16px;
						z-index: 11;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.idcrad_default_img {
						width: 84px;
						height: 84px;
						background: #F5F5F5 url('../../assets/camera-photo.png') center center no-repeat;
						background-size: 27px;
					}
					.idcrad_img {
						width: 84px;
						height: 84px;
					}
					.idcard_input {
						position: absolute;
						top: 0;
						left: 0;
						width: 84px;
						height: 84px;
						opacity: 0;
						z-index: 10;
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
		.argument-agree {
		 	margin-top: 24px;
		  	width: 100%;
		  	display: flex;
		  	justify-content: center;
		  	align-items: center;
		  	.check {
		    	margin-right: 4px;
		    	width: 16px;
		    	height: 16px;
		  	}
		  	.argument_text {
		  		font-family: PingFangSC-Medium;
			    font-size: 12px;
			    color: rgba(0,0,0,0.60);
			    text-align: center;
			    line-height: 18px;
			    span {
			    	color: #FF7F4A;
			  	}
			}
		}
		.submit_btn {
			margin: 8px auto 0;
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
		.submit_btn_no {
			background: #ccc;
		}
	}
</style>