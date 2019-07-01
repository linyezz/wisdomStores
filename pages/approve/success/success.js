// pages/approve/success/success.js
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  toHome () {
    wx.reLaunch({
      url:'/pages/index/index'
    })
  },
  toRecharge() {
    wx.showModal({
  title: '提示',
  content: '正在进入会员支付',
  success (res) {
    if (res.confirm) {
     
    } else if (res.cancel) {
      
    }
  }
})

  }
})