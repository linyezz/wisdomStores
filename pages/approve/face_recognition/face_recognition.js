// pages/approve/face_recognition/face_recognition.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //去录制视频
  beginStart(){
   wx.navigateTo({
     url: '/pages/camera/takeVideo/takeVideo',
     success: function(res) {},
     fail: function(res) {},
     complete: function(res) {},
   })
  }
})