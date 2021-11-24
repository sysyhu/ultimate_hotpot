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
    // frisbee players original position
    frisbees: [], // frisbee original position
    offences: [], // offence original position
    defences: [], // defence original position
  },

  onLoad: function(options){
    var that = this;
    var board_id = options.board_id;
    this.board_id = board_id;
    wx.hideHomeButton(); // 隐藏左上角"返回"

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
          frisbees: status.frisbees,
          offences: status.offences,
          defences: status.defences
        })
      }
    })
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
          if(i == 0){
            // highlight 第一步, 方法待定;
            var status = JSON.parse(data[i]["status"]);
            that.setData({
              frisbees: status.frisbees,
              offences: status.offences,
              defences: status.defences,
            });
            i += 1;
          }else if(i != 0 && i < len){
            var status = JSON.parse(data[i]["status"]);
            var last_status = JSON.parse(data[i-1]["status"]);
            for(var n=0; n<last_status["frisbees"].length; n++){
              if(last_status["frisbees"][n]["on_field"] != "on_sideline"){
                status["frisbees"][n]["animation"] = true
              };
            };
            for(var n=0; n<last_status["offences"].length; n++){
              if(last_status["offences"][n]["on_field"] != "on_sideline"){
                status["offences"][n]["animation"] = true
              };
            };
            for(var n=0; n<last_status["defences"].length; n++){
              if(last_status["defences"][n]["on_field"] != "on_sideline"){
                status["defences"][n]["animation"] = true
              };
            };
            that.setData({
              frisbees: status.frisbees,
              offences: status.offences,
              defences: status.defences,
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
          frisbees: status.frisbees,
          offences: status.offences,
          defences: status.defences
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