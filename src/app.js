var App = require('./utils/xmadx_sdk.min.js').xmad(App,'App').xmApp;
App({

	// 小程序冷热启动方式
	onLaunch:function(){
		const updateManager = wx.getUpdateManager()
		// 当向微信后台请求完新版本信息，会进行回调
		updateManager.onCheckForUpdate(function (res) {
			// 请求完新版本信息的回调
			console.log(111,res.hasUpdate)
		})
		// 当新版本下载完成，会进行回调
		updateManager.onUpdateReady(function () {
			wx.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success: function (res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate()
					}
				}
			})
		})
		// 当新版本下载失败，会进行回调
		updateManager.onUpdateFailed(function () {
		// 新的版本下载失败
			wx.showModal({
				title: '更新提示',
				content: '新版本下载失败',
				showCancel:false
			})
		})
	},
	globalData:{
		userInfo:null,
		API_PATH: 'https://api.topeffects.cn/',
		postHeader: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	}
})