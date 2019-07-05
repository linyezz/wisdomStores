// pages/camera/upidCard/upidCard.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width:0,
    height:0,
    tempFilePath: "",
    baseWidth:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this;
    that.path = options.path;
    that.face = options.char;
    try{
      let system = wx.getSystemInfoSync();
      let baseWidth=system.windowWidth/750;
      let phtotLeft=(system.windowWidth - 600*baseWidth)/2
      that.setData({
        width: system.windowWidth,
        height: system.windowHeight,
        baseWidth: baseWidth,
      }) 
         wx.getImageInfo({
        src: that.path,
        success: function(res){
          that.canvas = wx.createCanvasContext("image-canvas", that)
          //过渡页面中，图片的路径坐标和大小
          that.canvas.drawImage(that.path, 0, 0, that.data.width, that.data.height)
          wx.showLoading({
            title: '数据处理中',
            mask: true
          })
          // that.canvas.strokeRect(phtotLeft, 120*baseWidth, 600*baseWidth, 960*baseWidth)
          that.canvas.draw()
          setTimeout(function () {
            wx.canvasToTempFilePath({//裁剪对参数
              canvasId: "image-canvas",
              x: phtotLeft,//画布x轴起点
              y: 50*baseWidth,//画布y轴起点
              width: 600*baseWidth,//画布宽度
              height: 960*baseWidth,//画布高度
              destWidth: 600*baseWidth,//输出图片宽度
              destHeight: 960*baseWidth,//输出图片高度
              canvasId: 'image-canvas',
              success: function (res) {
                that.filePath = res.tempFilePath
                //清除画布上在该矩形区域内的内容。
                that.canvas.clearRect(0, 0, that.data.width, that.data.height)
                that.canvas.drawImage(that.filePath,phtotLeft, 50*baseWidth, 600*baseWidth, 960*baseWidth)
                that.canvas.draw()
                wx.hideLoading()
                //在此可进行网络请求
                if (that.face==1){
                  app.globalData.idCardFont = that.filePath
                }else{
                  app.globalData.idCardBack = that.filePath
                }
              },
              fail:function(e){
                wx.hideLoading()
                wx.showToast({
                  title: '出错啦...',
                  icon: 'loading'
                })
              }
            });
          }, 1000);
        }
      })
    }catch(e){
      console.log(e)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

 

})