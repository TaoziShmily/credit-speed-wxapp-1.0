//index.js
const app = getApp();
import {apiRequest} from '../../utils/util';
var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage;

Page({
  data: {
    list: [],
    loan_title:'',
    loan_logo:'',
    xmad: {
        adData: {},
        ad: {
            banner: "xmed55e5cfa8d71180adee52d73f7a48", // 按需引  
            // insert: "xmc019334f61782c285ce65d50afa766", // 按需引  
            // fixed: "xmb59594541cdb293c1b24ee969606b6" // 按需引 
        }
    }
  },
  // 获取首页数据
  getData () {
    apiRequest('/i/loan/index?id=1040','POST',{},{'content-type':'application/x-www-form-urlencoded'}).then(res => {
    	console.log('res',res)
      if (res.data.status == "SUCCEED") {
        this.setData({
          list: res.data.quickLoans,
          loan_title: res.data.loan_title,
          loan_logo: res.data.loan_logo
        })
        wx.setNavigationBarTitle({
          title: this.data.loan_title
        })
        if (wx.hideToast) {
          wx.hideToast();
        }

      } else {
        wx.showModal({
            title: '错误提示',
            content: '请求出错',
            showCancel:false
        })
      }
    }, res => {
      wx.showModal({
          title: '错误提示',
          content: res.data.errmsg,
          showCancel:false
      })
    })
  },
  // 跳转
  goWebViewPage(e){
  	var jump_url = e.currentTarget.dataset.jump_url;
  	wx.navigateTo({
      url: '/pages/webView/webView?jump_url='+jump_url
    })
  },
  // 页面加载
  onLoad: function () {
    if (wx.showToast) {
      wx.showToast({
          title: '拼命加载中...',
          icon: 'loading',
          duration: 10000
      })
    }
      //更新数据
      this.getData();
  },
   // 分享功能
  onShareAppMessage:function(){
      return{
          title:this.data.loan_title,
          path: '/pages/index/index'
      }
  }
})
