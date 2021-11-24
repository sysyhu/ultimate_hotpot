var common = require("../common.js");

Page({
  data: {
    board_title: "",
    board_description: "",
    steps: [],
    step_input_value: "",
    frisbees: [], // 飞盘初始状态;
    offences: [], // 进攻方初始状态;
    defences: [], // 防守方初始状态;
  },

  onLoad: function(options) {
    this.board_id = options.board_id;

    // 生成飞盘、队员初始状态, 储存在 this.status 里;
    var frisbees = common.original_status("frisbee", [101], 290, "", "on_field", "sideline_no_helper", false);
    var offences = common.original_status('offence', [11, 41, 71, 101, 131, 161, 191], 68, "", "on_field", "sideline_no_helper", false);
    var defences = common.original_status('defence', [6, 36, 66, 96, 126, 156, 186], 507, "force_direction_none", "on_field", "sideline_no_helper", false);
    this.status = {
      frisbees: frisbees,
      offences: offences,
      defences: defences
    };

    this.setData({
      board_title: options.board_title,
      board_description: options.board_description,
      frisbees: frisbees,
      offences: offences,
      defences: defences
    });

    // 隐藏页面左上角"返回";
    wx.hideHomeButton();
  },

  current_position: function(e){
    // 绑定事件: touchend;
    // 获取被操作元素当前相对于 field 坐标, 更新 this.status;
    var that = this;
    // field 相对于 page 坐标;
    var field = wx.createSelectorQuery();
    field.select('.field').boundingClientRect();
    field.exec(function(res){
      that.field_offset_x = res[0].left // field 横坐标偏移;
      that.field_offset_y = res[0].top // field 纵坐标偏移;
    });
    // 获取被操作元素信息;
    var obj_name = e.currentTarget.id;
    var selector = "#" + obj_name;
    var obj_list = obj_name.split("_")[0] + "s";
    var obj_index = obj_name.split("_")[1] - 1;
    var query = wx.createSelectorQuery();
    query.select(selector).boundingClientRect();
    query.exec(function(res){
      //被操作元素相对于 field 坐标 = 被操作元素相对于 page 坐标 - filed 相对于 page 坐标 - sideline 宽度;
      var x = res[0].left - that.field_offset_x - 2; 
      var y = res[0].top - that.field_offset_y - 2;
      that.status[obj_list][obj_index]["x"] = x;
      that.status[obj_list][obj_index]["y"] = y;
    });
  },

  change_force_direction: function(e){
    // 绑定事件: tap;
    // 更改被操作防守队员 force_direction 状态, 通过 class 样式控制;
    // 更新 this.status;
    var that = this;
    // 5 种 force_direction 状态, 每 tap 一次更改为下一种状态, 循环;
    var directions = [
      "force_direction_none",
      "force_direction_forehand", 
      "force_direction_ho",
      "force_direction_backhand",
      "force_direction_v",
    ];
    // 获取被操作防守队员信息;
    var obj_name = e.currentTarget.id;
    var force_direction = e.currentTarget.dataset.force_direction;
    var selector = "#" + obj_name;
    var obj_index = obj_name.split("_")[1] - 1;
    var query = wx.createSelectorQuery();
    query.select(selector).boundingClientRect();
    query.exec(function(res){
      for(var i=0; i<directions.length; i++){
        if(force_direction == directions[i] && i + 1 != directions.length){
          force_direction = directions[i + 1];
          break;
        }else if(force_direction == directions[i] && i + 1 == directions.length){
          force_direction = directions[0];
          break;
        }
      };
      that.status["defences"][obj_index]["force_direction"] = force_direction;
      that.setData({
        defences:  that.status["defences"],
      });
    });    
  },

  go_to_sideline: function(e){
    var that = this;
    var obj_name = e.currentTarget.id;
    var obj_list = obj_name.split("_")[0] + "s";
    var selector = "#" + obj_name;
    var obj_index = obj_name.split("_")[1] - 1;
    var query = wx.createSelectorQuery();
    query.select(selector).boundingClientRect();
    query.exec(function(res){
      that.status[obj_list][obj_index]["on_field"] = "on_sideline";
      that.status[obj_list][obj_index]["sideline_helper"] = "sideline_helper";
      if(obj_list == "frisbees"){
        that.setData({
          frisbees: that.status[obj_list],
        });
      }else if(obj_list == "offences"){
        that.setData({
          offences: that.status[obj_list],
        });
      }else{
        that.setData({
          defences: that.status[obj_list],
        });
      };   
    });
  },

  go_to_field: function(e){
    var that = this;
    var frisbees_x_list = [101];
    var offences_x_list = [11, 41, 71, 101, 131, 161, 191];
    var defences_x_list = [6, 36, 66, 96, 126, 156, 186];
    var obj_name = e.currentTarget.id;
    var obj_list = obj_name.split("_")[0] + "s";
    var selector = "#" + obj_name;
    var obj_index = obj_name.split("_")[1] - 1;
    var query = wx.createSelectorQuery();
    query.select(selector).boundingClientRect();
    query.exec(function(res){
      that.status[obj_list][obj_index]["on_field"] = "on_field";
      that.status[obj_list][obj_index]["sideline_helper"] = "sideline_no_helper";
      if(obj_list == "frisbees"){
        that.status[obj_list][obj_index]["x"] = frisbees_x_list[obj_index];
        that.status[obj_list][obj_index]["y"] = 290;
        that.setData({
          frisbees: that.status[obj_list],
        });
      }else if(obj_list == "offences"){
        that.status[obj_list][obj_index]["x"] = offences_x_list[obj_index];
        that.status[obj_list][obj_index]["y"] = 68;
        that.setData({
          offences: that.status[obj_list],
        });
      }else{
        that.status[obj_list][obj_index]["x"] = defences_x_list[obj_index];
        that.status[obj_list][obj_index]["y"] = 507;
        that.setData({
          defences: that.status[obj_list],
        });
      };    
    });
  },

  formSubmit: function(e){
    // 创建步骤;
    // 返回当前 board 所有 steps;
    var that = this;
    wx.request({
      url: common.server_url + '/steps',
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
        });
        that.setData({
          steps: common.steps(res.data),
          step_input_value: "",
        });
      },
    });
  },

  play: function(){
    // 绑定事件: tap;
    // 处理未被操作的飞盘、队员, 处理方法待定;
    // highlight 第一步, 方法待定;
    // 剩余步骤依次执行, movable-view 动画效果;
    // 恢复未被操作的飞盘、队员;
    var that = this;
    wx.request({
      url: common.server_url + '/steps/play',
      method: 'POST',
      data: { board_id: this.board_id },
      success: (res)=>{
        var data = res.data;
        var len = data.length;
        var i = 0;
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
        }.bind(that), 1500);
      },
    });
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
          defences: status.defences,
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
        console.log(res);
        if(res.data[1] == null){
          var frisbees = common.original_status("frisbee", [101], 290, "", "on_field", "sideline_no_helper", false);
          var offences = common.original_status('offence', [11, 41, 71, 101, 131, 161, 191], 68, "", "on_field", "sideline_no_helper", false);
          var defences = common.original_status('defence', [6, 36, 66, 96, 126, 156, 186], 507, "force_direction_none", "on_field", "sideline_no_helper", false);
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
        }else{
          var status = JSON.parse(res.data[1].status); 
          that.status = {
            frisbees: frisbees,
            offences: offences,
            defences: defences
          }  
          that.setData({
            steps: common.steps(res.data[0]),
            frisbees: status.frisbees,
            offences: status.offences,
            defences: status.defences
          });
        }   
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
    this.setData({
      animation: false
    })
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
              var frisbees = common.original_status("frisbee", [101], 290, "", "on_field", "sideline_no_helper", false);
              var offences = common.original_status('offence', [11, 41, 71, 101, 131, 161, 191], 68, "", "on_field", "sideline_no_helper", false);
              var defences = common.original_status('defence', [6, 36, 66, 96, 126, 156, 186], 507, "force_direction_none", "on_field", "sideline_no_helper", false);
              that.status = {
                frisbees: frisbees,
                offences: offences,
                defences: defences,
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
  },
})