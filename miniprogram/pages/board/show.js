var common = require("../../pages/common.js");

Page({
  data: {
    // 与步骤演示同步的步骤描述，可关闭不看
    note: "",
    note_display_none: "",
    // 步骤操作按钮
    eye: "open_eye",
    // 战术板信息
    board_title: "",
    board_description: "",
    // 步骤信息
    steps: [],
    step_input_value: "",
    // frisbee original position
    frisbee_x: 101,
    frisbee_y: 290,
    // offence original position
    offence_1_x: 11,
    offence_1_y: 68,
    offence_2_x: 41,
    offence_2_y: 68,
    offence_3_x: 71,
    offence_3_y: 68,
    offence_4_x: 101,
    offence_4_y: 68,
    offence_5_x: 131,
    offence_5_y: 68,
    offence_6_x: 161,
    offence_6_y: 68,
    offence_7_x: 191,
    offence_7_y: 68,
    // defence original position
    defence_1_x: 11,
    defence_1_y: 512,
    defence_2_x: 41,
    defence_2_y: 512,
    defence_3_x: 71,
    defence_3_y: 512,
    defence_4_x: 101,
    defence_4_y: 512,
    defence_5_x: 131,
    defence_5_y: 512,
    defence_6_x: 161,
    defence_6_y: 512,
    defence_7_x: 191,
    defence_7_y: 512,
  },

  onLoad: function(options){
    var that = this;
    var board_id = options.board_id;
    this.board_id = board_id;

    wx.request({
      url: common.server_url + '/boards/' + board_id,
      method: 'GET',
      success: function(res){
        var status = JSON.parse(res.data[2]["status"]);
        that.setData({
          board_title: res.data[0].title,
          board_description: res.data[0].description,
          steps: common.steps(res.data[1]), // 获取步骤, common.js
          step_input_value: "",
          note: "Step 1. " + res.data[1][0].description,  // 第一步的描述
          frisbee_x: status.frisbee_x,
          frisbee_y: status.frisbee_y,
          offence_1_x: status.offence_1_x,
          offence_1_y: status.offence_1_y,
          offence_2_x: status.offence_2_x,
          offence_2_y: status.offence_2_y,
          offence_3_x: status.offence_3_x,
          offence_3_y: status.offence_3_y,
          offence_4_x: status.offence_4_x,
          offence_4_y: status.offence_4_y,
          offence_5_x: status.offence_5_x,
          offence_5_y: status.offence_5_y,
          offence_6_x: status.offence_6_x,
          offence_6_y: status.offence_6_y,
          offence_7_x: status.offence_7_x,
          offence_7_y: status.offence_7_y,
          defence_1_x: status.defence_1_x,
          defence_1_y: status.defence_1_y,
          defence_2_x: status.defence_2_x,
          defence_2_y: status.defence_2_y,
          defence_3_x: status.defence_3_x,
          defence_3_y: status.defence_3_y,
          defence_4_x: status.defence_4_x,
          defence_4_y: status.defence_4_y,
          defence_5_x: status.defence_5_x,
          defence_5_y: status.defence_5_y,
          defence_6_x: status.defence_6_x,
          defence_6_y: status.defence_6_y,
          defence_7_x: status.defence_7_x,
          defence_7_y: status.defence_7_y,
        })
      }
    })
  },

  onShow: function(){
    wx.hideHomeButton(); // 隐藏左上角"返回"
  },

  // 所有步骤动画演示
  play: function(){
    var that = this;
    wx.request({
      url: common.server_url + '/steps/play',
      method: 'POST',
      data: {board_id: this.board_id},
      success: (res)=>{
        var data = res.data;
        var len = data.length;
        var i = 0;
        var interval = 1500;
        setInterval(function(){
          if(i < len){
            var status = JSON.parse(data[i]["status"]);
            var step_order = i + 1;
            var description = "Step " + step_order + ". " + data[i].description;
            that.setData({
              note: description,
              note_display: "block",
              frisbee_x: status.frisbee_x,
              frisbee_y: status.frisbee_y,
              offence_1_x: status.offence_1_x,
              offence_1_y: status.offence_1_y,
              offence_2_x: status.offence_2_x,
              offence_2_y: status.offence_2_y,
              offence_3_x: status.offence_3_x,
              offence_3_y: status.offence_3_y,
              offence_4_x: status.offence_4_x,
              offence_4_y: status.offence_4_y,
              offence_5_x: status.offence_5_x,
              offence_5_y: status.offence_5_y,
              offence_6_x: status.offence_6_x,
              offence_6_y: status.offence_6_y,
              offence_7_x: status.offence_7_x,
              offence_7_y: status.offence_7_y,
              defence_1_x: status.defence_1_x,
              defence_1_y: status.defence_1_y,
              defence_2_x: status.defence_2_x,
              defence_2_y: status.defence_2_y,
              defence_3_x: status.defence_3_x,
              defence_3_y: status.defence_3_y,
              defence_4_x: status.defence_4_x,
              defence_4_y: status.defence_4_y,
              defence_5_x: status.defence_5_x,
              defence_5_y: status.defence_5_y,
              defence_6_x: status.defence_6_x,
              defence_6_y: status.defence_6_y,
              defence_7_x: status.defence_7_x,
              defence_7_y: status.defence_7_y,
            });
            i += 1;
          };
        }.bind(that), interval);
      }
    });
  },

  // 某一步骤动画演示
  play_a_step: function(res){
    var that = this;
    var step_id = res.target.dataset.step_id;
    wx.request({
      url: common.server_url + '/steps/play_a_step',
      method: 'POST',
      data: {step_id: step_id},
      success: function(res){
        var status = JSON.parse(res.data["status"]);
        var step_order = res.data.order_number;
        var description = "Step " + step_order + ". " + res.data.description;
        that.setData({
          note: description,
          note_display: "block",
          frisbee_x: status.frisbee_x,
          frisbee_y: status.frisbee_y,
          offence_1_x: status.offence_1_x,
          offence_1_y: status.offence_1_y,
          offence_2_x: status.offence_2_x,
          offence_2_y: status.offence_2_y,
          offence_3_x: status.offence_3_x,
          offence_3_y: status.offence_3_y,
          offence_4_x: status.offence_4_x,
          offence_4_y: status.offence_4_y,
          offence_5_x: status.offence_5_x,
          offence_5_y: status.offence_5_y,
          offence_6_x: status.offence_6_x,
          offence_6_y: status.offence_6_y,
          offence_7_x: status.offence_7_x,
          offence_7_y: status.offence_7_y,
          defence_1_x: status.defence_1_x,
          defence_1_y: status.defence_1_y,
          defence_2_x: status.defence_2_x,
          defence_2_y: status.defence_2_y,
          defence_3_x: status.defence_3_x,
          defence_3_y: status.defence_3_y,
          defence_4_x: status.defence_4_x,
          defence_4_y: status.defence_4_y,
          defence_5_x: status.defence_5_x,
          defence_5_y: status.defence_5_y,
          defence_6_x: status.defence_6_x,
          defence_6_y: status.defence_6_y,
          defence_7_x: status.defence_7_x,
          defence_7_y: status.defence_7_y,
        })
      }
    })
  },

  // 是否隐藏动画演示同步步骤描述
  eye: function(e){
    var that = this;
    if(e.currentTarget.dataset.eye == "open_eye"){
      that.setData({
        note_display_none: "note_display_none",
        eye: "close_eye"
      })
    }else{
      that.setData({
        note_display_none: "",
        eye: "open_eye"
      })
    }
  },

  // 跳转至首页
  home: function(){
    wx.switchTab({
      url: '../../pages/welcome/welcome',
    })
  }
})