// pages/camera/takeCardPhoto/takeCardPhoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    height: 0,
    gap: 0,
    hasTakePhoto: false,
    src: "",
    phtotLeft:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.ctx = wx.createCameraContext()
    wx.getSystemInfo({
      success: function (res) {
        let baseWidth=res.windowWidth/750;
        let phtotLeft=(res.windowWidth - 600*baseWidth)/2
        that.setData({
          width: res.windowWidth,
          height: res.windowHeight,
          gap: 20,
          baseWidth: res.windowWidth/750,
          phtotLeft:phtotLeft
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  
  /**
   * 拍照
   */
  takePhoto: function() {
    var that = this
    that.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.setStorage({
          key: 'originalImagePath',
          data: res.tempImagePath,
        })
        
        wx.navigateTo({
          url: '/pages/camera/upidCard/upidCard?path=' + res.tempImagePath + '&char=0'
        })
      }
    })
  }

})