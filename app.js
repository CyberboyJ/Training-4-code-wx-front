// app.js
App({
  data:{
    userInfo:""
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.request({
      url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx13a056b75e72e3e4&secret=cb9b91d2388c03d7bd7bc3b1002e1c0a`,
      success(res) {
        console.log(res.data.access_token)
        wx.setStorageSync('access_token', res.data.access_token)
        // console.log( wx.getStorageSync('access_token'))
      }
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    isLogin:false ,
    userInfo: null
  }
})
