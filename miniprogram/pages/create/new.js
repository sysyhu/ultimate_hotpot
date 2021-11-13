// pages/create/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation_player_1: {},
    animation_player_2: {},
    animation_frisbee: {},
    animation_slogan: {},
    slogan_opacity: 0,
    slogan_style: "",
    create_display_none: "create_display_none",
    button_display_none: ""
  },

  // onLoad: function() {  

  // },

  onShow: function(){
    var that = this;
    var animation_player_1 = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
    });
    var animation_player_2 = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
    });
    var animation_frisbee = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
    });
    var animation_slogan = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
      delay: 5000
    });
    that.animation_player_1 = animation_player_1;
    that.animation_player_2 = animation_player_2;
    that.animation_frisbee = animation_frisbee;
    that.animation_slogan = animation_slogan;
    // 动作 1.
    animation_player_1.translate(0, 0).step();
    animation_player_2.translate(-40, -40).step();
    animation_frisbee.translate(220, -50).rotate(720).step();
    animation_slogan.opacity(1).step();
    // 动作 2.
    animation_player_1.translate(30, -60).step();
    animation_player_2.translate(-30, -30).step();
    animation_frisbee.translate(70, -100).rotate(-720).step();

    // 动作 3.
    animation_player_1.translate(30, 700).opacity(0).step();
    animation_player_2.translate(-30, 700).opacity(0).step();
    animation_frisbee.translate(70, 700).opacity(0).step();
    
    that.setData({
      animation_frisbee: animation_frisbee.export(),
      animation_player_1: animation_player_1.export(),
      animation_player_2: animation_player_2.export(),
      animation_slogan: animation_slogan.export()
    });

    wx.checkSession({
      success () {
        var user_id = wx.getStorageSync('user_id');
        if(user_id){
          that.setData({
            create_display_none: "",
            button_display_none: "button_display_none"
          })
        }else{
          that.setData({
            create_display_none: "create_display_none",
            button_display_none: ""
          })
        }
      },
      fail () {
        that.setData({
          create_display_none: "create_display_none",
          button_display_none: ""
         })
      }
    })


  },

  login: function(e){
    var that = this;
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: function(res){
        wx.setStorageSync('user_info', res.userInfo)
        wx.login({
          success (res) {
            var user_id = res.code;
            if (res.code) {
              wx.request({
                url: 'http://192.168.31.42:3000/users',
                method: 'POST',
                data: {
                  user_id: res.code,
                },
                success (res) {
                  console.log(res.data.message);
                  wx.setStorageSync('user_id', user_id);
                  that.setData({
                    create_display_none: "",
                    button_display_none: "button_display_none"
                  })
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    });
  },


  formSubmit: function(e){
    var that = this;
    var user_id = wx.getStorageSync('user_id')
    wx.request({
      url: 'http://192.168.31.42:3000/boards',
      method: 'POST',
      data: {title: e.detail.value.title, description: e.detail.value.description, user_id: user_id},
      success: (res) => {
        console.log(res)
        console.log(res.data.message)
        if(res.data.message == "战术板创建成功"){
          wx.reLaunch({
            url: '../step/new?board_id=' + res.data.board_id + '&board_title=' + res.data.board_title + '&board_description=' + res.data.board_description,
          })
        }else{
          wx.showToast({
            icon: "none",
            title: res.data.message,
          })
        }
        
      }
    })
  },

  
})