// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      goodsId:0,
      goods:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      //取使用navigateTo路由跳转中的带的参数
      console.log(options.gid)
      let _this=this
      _this.setData({goodsId:options.gid})

       //发起web请求，获取所有商品分类数据
       wx.request({
        url: `http://127.0.0.1:7001/selectGoodsById`,
        method:"get",
        header: {
          'content-type': 'application/json' // 默认值
        },
        data:{
          goodsId:options.gid
        },
        success (res) {
          console.log(res.data)
            _this.setData({goods:res.data[0]})
        
        }
      })
  },
  toBack(){
    wx.navigateBack({
      delta: 1
    })
  },
  toCart(){
    wx.switchTab({
      url: '../index/index'
    })
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