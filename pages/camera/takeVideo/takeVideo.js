// pages/camera/takeVideo/takeVideo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: '00',
    is_record:true,
    tempThumbPath:'',
    tempVideoPath:'',
    record_finish:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    try {
      let system = wx.getSystemInfoSync();
      let basewidth = system.windowWidth / 750;
      that.data.basewidth = basewidth;
      that.ctx = wx.createCanvasContext('canvas', that);
      that.ctx.draw(false);
      // that.drawCanvas()
     
    } catch (e) {

    }
  },
  recordingStart () {
    let that=this;
    let is_record = that.data.is_record;
    let basewidth = that.data.basewidth;
    that.ctx.draw();
    if(is_record){
      that.setData({
        is_record:false
      })
      this.camera.startRecord({
        
      })
      let i = 0;
      let circle = setInterval(function(){
        i++;
        if(i>60){
          clearInterval(circle)
          that.getVideo()
          return;
          
        }
        var time = '';
          var s = parseInt(i / 20);
          var min = Math.floor(s / 60) % 60;
          var sec = s % 60;
          if (min < 10) { time += "0"; }
          time += min + ":";
          if (sec < 10) { time += "0"; }
          time += sec;
          // console.log(time)
          that.setData({
            times:time
          })
        that.ctx.setStrokeStyle('#EC6B7B');
        that.ctx.setLineWidth(8 * basewidth)
        that.ctx.beginPath();
        that.ctx.arc(750 * basewidth / 2, 85 * basewidth, 80* basewidth, 0, Math.PI * (2 / 60) * i  );
        that.ctx.stroke();
        that.ctx.draw(false);
        that.data.circle = circle;
      },50)
      
      
      
    }
  },
  //相机加载完成
  loadCamera(){
    const context = wx.createCameraContext();
    this.camera = context;
  },
  
  getVideo(){
    let that=this;
    this.camera.stopRecord({
      success(res) {
       that.setData({
         tempThumbPath:res.tempThumbPath,
         tempVideoPath:res.tempVideoPath,
         record_finish:true
       }) 
       
      },
      fail() {
        console.log('失败')
      }
    })
  },
  recordingAgain(){
    var that=this;
    that.setData({
      is_record:true,
      record_finish:false
    }) 
    that.recordingStart()
  }
 
})
