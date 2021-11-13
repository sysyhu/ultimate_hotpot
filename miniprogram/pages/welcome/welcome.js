var common = require("../../pages/common.js");

Page({
  data: {
    boards: [],
    fisbee_animation: {}
  },

  onLoad: function (options) {
    var that = this;
   
    // 飞盘动画
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
    });
    that.animation = animation;
    animation.rotate(1800).step();
    that.setData({
      fisbee_animation: animation.export()
    });

    // 获取必备战术
    wx.request({
      url: common.server_url,
      method: 'GET',
      success: (res)=>{
        that.setData({
          boards: common.boards(res.data)
        })
      }
    })
  },

  // 点击查看必备战术
  show_board: function(e){
    var that = this;
    var board_id = e.currentTarget.dataset.board_id;
    wx.reLaunch({
      url: '../board/show?board_id=' + board_id,
    })
  },

})