Page({
  //页面的初始数据
  data:{
    //当前选中的商品分类
    currentGoodsType:{},
    //当前选中的商品列表
    currentGoodsList:[],
    currentGoodsTypeImg:"",
    //所有的商品分类数据
    goodsTypes:[],
    
    title:"这是title"
  },
   /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //获取当前page对象
        let _this=this
        //取data中的属性值
        //_this.data.属性名
        // _this.data.title="abc"
        _this.setData({title:"abc"})
        console.log(_this.data.title)

        //发起web请求，获取所有商品分类数据
        wx.request({
          url: 'http://127.0.0.1:7001/selectGoodsTypeAll', //仅为示例，并非真实的接口地址
          method:"get",
          header: {
            'content-type': 'application/json' // 默认值
          },
          data:{
          },
          success (res) {
            console.log("test onload")
              console.log(res.data[0])
              _this.setData({goodsTypes:res.data})
              _this.setData({currentGoodsType:res.data[0]})
              _this.setData({currentGoodsTypeImg:res.data[0].goodsTypeImg})
          }
        })
        wx.request({
          url: 'http://127.0.0.1:7001/selectGoodsByGoodsTypeId', //仅为示例，并非真实的接口地址
          method:"get",
          header: {
            'content-type': 'application/json' // 默认值
          },
          data:{
            goodsTypeId:1
          },
          success (res) {
            console.log("test first line")
            console.log(res.data)
            _this.setData({currentGoodsList:res.data})
            // _this.setData({goodsTypes:res.data})
            // _this.setData({currentGoodsType:res.data[0]})
            // _this.setData({currentGoodsTypeImg:res.data[0].goodsTypeImg})
        }
        })
    },
    changeType(event){
      //event 事件信息
      console.log(event)
      console.log(event.currentTarget.dataset.tid)
      let _this=this
      let tId=event.currentTarget.dataset.tid;
      this.data.goodsTypes.forEach(item=>{
        if(item.goodsTypeId==tId){
          _this.setData({currentGoodsType:item})
          _this.setData({currentGoodsList:item.children})
          _this.setData({currentGoodsTypeImg:item.goodsTypeImg})
          //获取当前所选的type的商品列表
          wx.request({
            url: 'http://127.0.0.1:7001/selectGoodsByGoodsTypeId', //仅为示例，并非真实的接口地址
            method:"get",
            header: {
              'content-type': 'application/json' // 默认值
            },
            data:{
              goodsTypeId:tId
            },
            success (res) {
              console.log("test single line request")
              console.log(res.data)
              _this.setData({currentGoodsList:res.data})
              // _this.setData({goodsTypes:res.data})
              // _this.setData({currentGoodsType:res.data[0]})
              // _this.setData({currentGoodsTypeImg:res.data[0].goodsTypeImg})
          }
          })
        }
      })
    },
    toGoods(e){
      // wx.navigateTo("pages/goods/goods")
      wx.navigateTo({url: `../goods/goods?gid=${e.currentTarget.dataset.gid}`})
    },
    onUnload(){
      console.log("首页卸载！")
    }



})