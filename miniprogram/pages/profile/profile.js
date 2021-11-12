// pages/profile/profile.js
Page({

  data: {
    my_boards: [],
    display_none: "",
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    my_boards_display_none: "",
    not_login_display_none: ""
  },

  onLoad: function(res){
    var that = this;
    wx.checkSession({
      success () {
        var user_info = wx.getStorageSync('user_info');
        if(user_info){
          that.setData({
            userInfo: user_info,
            hasUserInfo: true,
            display_none: "display_none",
            my_boards_display_none: "",
            not_login_display_none: "not_login_display_none"
          })
        }else{
          that.setData({
            display_none: "",
            my_boards_display_none: "my_boards_display_none",
            not_login_display_none: ""
          })
        }
      },
      fail () {
        that.setData({
          display_none: "",
          my_boards_display_none: "my_boards_display_none",
          not_login_display_none: ""
         })
      }
    })
  },

  onShow: function(){
    var that = this;
    var user_id = wx.getStorageSync('user_id');
    if(user_id){
      wx.request({
        url: 'http://192.168.31.42:3000/boards/my_boards',
        method: 'POST',
        data: {user_id: user_id},
        success: function(res){
          var data = res.data;
          var my_boards = [];
          for(var i=0; i<data.length; i++){
            my_boards[i] = {
              title: data[i].title,
              description: data[i].description,
              board_id: data[i].id
            };
          };
          that.setData({
            my_boards: my_boards
          })
          console.log(my_boards)
        }
      })
    }
  },
  
  login: function(e){
    var that = this;
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: function(res){
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          display_none: "display_none",
          my_boards_display_none: "",
          not_login_display_none: "not_login_display_none"
        });
        wx.setStorageSync('user_info', res.userInfo)
        wx.login({
          success (res) {
            console.log(res);
            var user_id = res.code;
            if (res.code) {
              wx.request({
                url: 'http://192.168.31.42:3000/users',
                method: 'POST',
                data: {
                  user_id: res.code,
                },
                success (res) {
                  console.log(res.data.message)
                  wx.setStorageSync('user_id', user_id)
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
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

  del_a_board: function(e){
    var that = this;
    var board_id = e.currentTarget.dataset.board_id;
    wx.showModal({
      title: "提示",
      content: "删除后将无法恢复",
      success: function(res){
        if(res.confirm){
          wx.request({
            url: 'http://192.168.31.42:3000/boards/' + board_id,
            method: 'DELETE',
            data: {board_id: board_id},
            success: function(res){
              console.log(res.data.message);
              that.onShow()
            }
          })
        }
      }
    }) 
  }


})