// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boards: [],
    animationData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var that = this;
   
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
    });
    that.animation = animation;
    animation.rotate(1800).step();
    that.setData({
      animationData: animation.export()
    })

    wx.request({
      url: 'http://192.168.31.42:3000/',
      method: 'GET',
      success: (res)=>{
        var data = res.data;
        var boards = [];
        for(var i=0; i<data.length; i++){
          boards[i] = {
            title: data[i].title,
            description: data[i].description,
            board_id: data[i].id
          };
        };
        that.setData({
          boards: boards
        })
      }
    })
  },

  show_board: function(e){
    var that = this;
    var board_id = e.currentTarget.dataset.board_id;
    wx.reLaunch({
      url: '../board/show?board_id=' + board_id,
    })
  },

})