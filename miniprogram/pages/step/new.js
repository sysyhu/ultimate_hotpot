var common = require("../common.js");

Page({
  data: {
    board_title: "",
    board_description: "",
    steps: [],
    step_input_value: "",
    frisbees: [], // frisbee original position
    offences: [], // offence original position
    defences: [], // defence original position
  },

  onLoad: function(options) {
    var that = this;

    this.board_id = options.board_id;
    var board_title = options.board_title;
    var board_description = options.board_description;
    var frisbees = common.original_position([101], 290, "frisbee", "");
    var offences = common.original_position([11, 41, 71, 101, 131, 161, 191], 68, 'offence', "");
    var defences = common.original_position([6, 36, 66, 96, 126, 156, 186], 507, 'defence', "force_direction_none");
    this.status = {
      frisbees: frisbees,
      offences: offences,
      defences: defences
    };
    this.setData({
      board_title: board_title,
      board_description: board_description,
      frisbees: frisbees,
      offences: offences,
      defences: defences
    });

    wx.hideHomeButton({
      complete: (res) => {
        console.log(res);
      },
    })
  },

  position: function(e){
    var that = this;

    const field = wx.createSelectorQuery()
    field.select('.field').boundingClientRect()
    field.selectViewport().scrollOffset()
    field.exec(function(res){
      that.field_offset_y = res[0].top // field 位置坐标偏移
      that.field_offset_x = res[0].left // field 位置坐标偏移
    });

    var obj_name = e.currentTarget.id;
    var force_direction = e.currentTarget.dataset.force_direction;
    var selector = "." + obj_name;
    var obj_list = obj_name.split("_")[0] + "s";
    var obj_num = obj_name.split("_")[1];
    var obj_index = obj_num - 1;
    const query = wx.createSelectorQuery();
    query.select(selector).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function(res){
      var x = res[0].left - that.field_offset_x - 2;
      var y = res[0].top - that.field_offset_y - 2;
      that.status[obj_list][obj_index]["x"] = x;
      that.status[obj_list][obj_index]["y"] = y;
    });
  },

  change_force_direction: function(e){
    var that = this;
    var force_direction = e.currentTarget.dataset.force_direction;
    var obj_name = e.currentTarget.id;
    var selector = "." + obj_name;
    var obj_index = obj_name.split("_")[1] - 1;
    const query = wx.createSelectorQuery();
    query.select(selector).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function(res){
      var direction = [
        "force_direction_none",
        "force_direction_forehand", 
        "force_direction_ho",
        "force_direction_backhand",
        "force_direction_v",
      ];
      for(var i=0; i<direction.length; i++){
        if(force_direction == direction[i] && i + 1 != direction.length){
          force_direction = direction[i + 1];
          break;
        }else if(force_direction == direction[i] && i + 1 == direction.length){
          force_direction = direction[0];
          break;
        }
      };
      var defences = that.status["defences"];
      defences[obj_index]["force_direction"] = force_direction;
      that.setData({
        defences: defences
      });
    });    
  },

  formSubmit: function(e){
    var that = this;
    wx.request({
      url: 'http://192.168.31.42:3000/steps',
      method: 'POST',
      data: {
        description: e.detail.value.description, 
        board_id: this.board_id, 
        status: this.status,
      },
      success: (res) => {
        wx.showToast({
          icon: "none",
          title: '创建成功，请下滑查看',
        })
        that.setData({
          steps: common.steps(res.data),
          step_input_value: ""
        });
      }
    })
  },

  play: function(){
    var that = this;
    wx.request({
      url: 'http://192.168.31.42:3000/steps/play',
      method: 'POST',
      data: {board_id: this.board_id},
      success: (res)=>{
        var data = res.data;
        var len = data.length;
        var i = 0;
        setInterval(function(){
          if(i < len){
            var status = JSON.parse(data[i]["status"]);
            that.setData({
              frisbees: status.frisbees,
              offences: status.offences,
              defences: status.defences,
            });
            i += 1;
          };
        }.bind(that), 1500);
      }
    })
  },

  play_a_step: function(res){
    var that = this;
    var step_id = res.target.dataset.step_id;
    wx.request({
      url: 'http://192.168.31.42:3000/steps/play_a_step',
      method: 'POST',
      data: {step_id: step_id},
      success: function(res){
        var status = JSON.parse(res.data["status"])
        that.setData({
          frisbees: status.frisbees,
          offences: status.offences,
          defences: status.defences
        })
      }
    })
  },

  del_a_step: function(res){
    var that = this;
    var step_id = res.target.dataset.step_id;
    wx.request({
      url: 'http://192.168.31.42:3000/steps/' + step_id,
      method: 'DELETE',
      data: {step_id: step_id},
      success: function(res){
        that.setData({
          steps: common.steps(res.data),
        });
      }
    })
  },

  done: function(){
    var that = this;
    wx.request({
      url: 'http://192.168.31.42:3000/steps/done',
      method: 'POST',
      data: {board_id: this.board_id},
      success: function(res){
        if(res.data.message == "请至少创建一个步骤"){
          wx.showToast({
            icon: "none",
            title: '请至少创建一个步骤',
          })
        }else{
          wx.showModal({
            title: "提示",
            content: "点击完成后将无法修改",
            success: function(res){
              if(res.confirm){
                wx.reLaunch({
                  url: '../board/show?board_id=' + that.board_id,
                })
              }
            }
          }) 
        }
      }
    })
  },

  reset: function(){
    var that = this;
    wx.showModal({
      title: "提示",
      content: "重置将删除所有已创建的步骤",
      success: function(res){
        if(res.confirm){
          wx.request({
            url: 'http://192.168.31.42:3000/steps/reset',
            method: 'POST',
            data: {board_id: that.board_id},
            success: (res)=>{
              var frisbees = common.original_position([101], 290, "frisbee", "");
              var offences = common.original_position([11, 41, 71, 101, 131, 161, 191], 68, 'offence', "");
              var defences = common.original_position([6, 36, 66, 96, 126, 156, 186], 507, 'defence', "force_direction_none");
              that.status = {
                frisbees: frisbees,
                offences: offences,
                defences: defences
              }
              that.setData({
                steps: [],
                frisbees: frisbees,
                offences: offences,
                defences: defences
              });
              wx.showToast({
                icon: "none",
                title: '已重置，请重新创建',
              });
            }     
          })
        }
      }
    })
  }
})