<template>
	<transition name='model'>
		<div class="model" v-show="show" @click="$emit('update:show', false)">
			<div class="confirm" @clicl.stop>
				<div class="confirm_title">{{title}}</div>
				<div class="confirm_content">{{content}}</div>
				<div class="confirm_btn_box">
					<div class="btn cancel_btn" @click="$emit('update:show', false)">
						<span>{{cancelText}}</span>
					</div>
					<div class="btn confirm_btn" @click="$emit('confirm')">
						<span>{{confirmText}}</span>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			show: {
				default: false,
				type: Boolean
			},
			title: {
				default: '提示',
				type: String
			},
			content: {
				default: '',
				type: String
			},
			cancelText: {
				default: '取消',
				type: String
			},
			confirmText: {
				default: '确认',
				type: String
			}
		}
	}
</script>

<style lang="scss" scoped>
	.model {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 2000;
		// padding-top: 25%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		.confirm {
			padding: 24px;
			box-sizing: border-box;
			width: 296px;
			background: #ffffff;
			box-shadow: 0 8px 8px 0 rgba(0,0,0,0.04);
			border-radius: 2px;
			.confirm_title {
				font-family: PingFangSC-Medium;
				font-size: 16px;
				color: rgba(0,0,0,0.87);
				text-align: center;
				line-height: 22px;
			}
			.confirm_content {
				margin-top: 16px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: rgba(0,0,0,0.60);
				line-height: 22px;
				text-align: left;
			}
			.confirm_btn_box {
				margin-top: 24px;
				width: 100%;
				height: 40px;
				display: flex;
				justify-content: space-between;
				.btn {
					box-sizing: border-box;
					border-radius: 2px;
					width: 116px;
					height: 40px;
					display: flex;
					justify-content: center;
					align-items: center;
					font-family: PingFangSC-Medium;
					font-size: 16px;
					text-align: center;
				}
				.cancel_btn {
					border: 1px solid #FF7F4A;
					color: #FF7F4A;
				}
				.confirm_btn {
					background: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
					color: #FFFFFF;
				}
			}
		}
	}
</style>