// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(wx.getStorageSync('user')){
      this.setData({isLogin:true})
      this.setData({userInfo:wx.getStorageSync('user')})
    }else{
      this.setData({isLogin:false})
    }
 

  },
  getMyUserInfo(e){
    //e 事件信息
      console.log(e.detail.userInfo)
      if(e.detail.errMsg=="getUserInfo:ok"){
          wx:wx.request({
            url: 'http://127.0.0.1:7001/user/selectUserByName',
            data: {
              uname:e.detail.userInfo.nickName
            },
            method:"post",
            success: (resp) => {
                if(resp.data!=null){
                  wx.setStorageSync('user', resp.data)
                  wx.showToast({
                    title: '登录成功',
                    icon: 'error',
                    duration: 2000
                  })
                  this.setData({isLogin:true})
                  this.setData({userInfo:wx.getStorageSync('user')})
                }
            },
          })
      }else{
        wx.showToast({
          title: '授权失败',
          icon: 'error',
          duration: 2000
        })
      
      }
  },
  getUserPhone(e){
    console.log(e.detail)
    var _this=this
    //获取动态口令
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      // 可以获取到encryptedData和iv
      console.log(e.detail.code)
      console.log(wx.getStorageSync('access_token'))
      //使用动态口令获取当前授权的手机号码
      wx.request({
        url: `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${wx.getStorageSync('access_token')}`,
        method:"POST",
        data:{
          code:e.detail.code
        },
        success(res) {
          var phone=res.data.phone_info.phoneNumber
          console.log(phone)
          wx.setStorageSync('phoneNumber',phone)
          // 根据获取的手机号，查询用户信息
          _this.getUerInfoByPhone(phone)
        }
      })
    } else {
      // 用户拒绝授权获取手机号
      console.log('用户拒绝授权获取手机号');
    }
  },
  getUerInfoByPhone(phone){
    console.log(phone)
    let _this=this
    wx.request({
        url: 'http://127.0.0.1:7001/user/selectUserByTel',
        method:"POST",
        data: {
          tel:phone
        },
        success(res) {
            // console.log(res)
            if(res){
              wx.setStorageSync('user', res.data)
              console.log(wx.getStorageSync("user"))
              _this.setData({isLogin:true})
              _this.setData({userInfo:wx.getStorageSync('user')})
            }else{
              wx.showToast({
                title: '该手机号未注册',
                icon: 'warn',
                duration: 2000
              })
              //跳转到注册页面
            }
         
        },
        fail() {
          // 解密失败处理
          console.log('解密失败');
        }
      });
   
  },
  logOut(){
    wx.removeStorageSync('user')
    this.setData({isLogin:false})
    this.setData({userInfo:{}})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})