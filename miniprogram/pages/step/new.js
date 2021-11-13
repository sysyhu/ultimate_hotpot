Page({
  data: {
    board_title: "123333",
    board_description: "232323232",
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

  onLoad: function(options) {
    var that = this;
    var board_id = options.board_id;
    // var board_id = 1205;
    this.board_id = board_id;
    var board_title = options.board_title;
    var board_description = options.board_description;
    that.board_id = board_id;
    that.setData({
      board_title: board_title,
      board_description: board_description
    });

  },

  onShow: function(){
    wx.hideHomeButton({
      complete: (res) => {
        console.log(res);
      },
    })
  },

  position: function(e){
    var that = this;
    const query = wx.createSelectorQuery()
    query.select('.field').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
      that.field_offset_y = res[0].top // field 位置坐标偏移
      that.field_offset_x = res[0].left // field 位置坐标偏移
      that.field_scroll_y = res[1].scrollTop
      that.field_scroll_x = res[1].scrollLeft
    });
    const frisbee = wx.createSelectorQuery()
    frisbee.select('.frisbee').boundingClientRect()
    frisbee.exec(function(res){
      that.frisbee_offset_x = res[0].left // frisbee 相对于页面位置坐标偏移
      that.frisbee_offset_y = res[0].top // frisbee 相对于页面位置坐标偏移
    });
    const offence_1 = wx.createSelectorQuery()
    offence_1.select('.offence_1').boundingClientRect()
    offence_1.exec(function(res){
      that.offence_1_offset_x = res[0].left
      that.offence_1_offset_y = res[0].top 
    });
    const offence_2 = wx.createSelectorQuery()
    offence_2.select('.offence_2').boundingClientRect()
    offence_2.exec(function(res){
      that.offence_2_offset_x = res[0].left
      that.offence_2_offset_y = res[0].top 
    });
    const offence_3 = wx.createSelectorQuery()
    offence_3.select('.offence_3').boundingClientRect()
    offence_3.exec(function(res){
      that.offence_3_offset_x = res[0].left
      that.offence_3_offset_y = res[0].top 
    });
    const offence_4 = wx.createSelectorQuery()
    offence_4.select('.offence_4').boundingClientRect()
    offence_4.exec(function(res){
      that.offence_4_offset_x = res[0].left
      that.offence_4_offset_y = res[0].top 
    });
    const offence_5 = wx.createSelectorQuery()
    offence_5.select('.offence_5').boundingClientRect()
    offence_5.exec(function(res){
      that.offence_5_offset_x = res[0].left
      that.offence_5_offset_y = res[0].top 
    });
    const offence_6 = wx.createSelectorQuery()
    offence_6.select('.offence_6').boundingClientRect()
    offence_6.exec(function(res){
      that.offence_6_offset_x = res[0].left
      that.offence_6_offset_y = res[0].top 
    });
    const offence_7 = wx.createSelectorQuery()
    offence_7.select('.offence_7').boundingClientRect()
    offence_7.exec(function(res){
      that.offence_7_offset_x = res[0].left
      that.offence_7_offset_y = res[0].top 
    });
    const defence_1 = wx.createSelectorQuery()
    defence_1.select('.defence_1').boundingClientRect()
    defence_1.exec(function(res){
      that.defence_1_offset_x = res[0].left
      that.defence_1_offset_y = res[0].top 
    });
    const defence_2 = wx.createSelectorQuery()
    defence_2.select('.defence_2').boundingClientRect()
    defence_2.exec(function(res){
      that.defence_2_offset_x = res[0].left
      that.defence_2_offset_y = res[0].top 
    });
    const defence_3 = wx.createSelectorQuery()
    defence_3.select('.defence_3').boundingClientRect()
    defence_3.exec(function(res){
      that.defence_3_offset_x = res[0].left
      that.defence_3_offset_y = res[0].top 
    });
    const defence_4 = wx.createSelectorQuery()
    defence_4.select('.defence_4').boundingClientRect()
    defence_4.exec(function(res){
      that.defence_4_offset_x = res[0].left
      that.defence_4_offset_y = res[0].top 
    });
    const defence_5 = wx.createSelectorQuery()
    defence_5.select('.defence_5').boundingClientRect()
    defence_5.exec(function(res){
      that.defence_5_offset_x = res[0].left
      that.defence_5_offset_y = res[0].top 
    });
    const defence_6 = wx.createSelectorQuery()
    defence_6.select('.defence_6').boundingClientRect()
    defence_6.exec(function(res){
      that.defence_6_offset_x = res[0].left
      that.defence_6_offset_y = res[0].top 
    });
    const defence_7 = wx.createSelectorQuery()
    defence_7.select('.defence_7').boundingClientRect()
    defence_7.exec(function(res){
      that.defence_7_offset_x = res[0].left
      that.defence_7_offset_y = res[0].top 
    });

  },

  formSubmit: function(e){
    var that = this;
    wx.request({
      url: 'http://192.168.31.42:3000/steps',
      method: 'POST',
      data: {description: e.detail.value.description, 
        board_id: this.board_id, 
        status: {
          frisbee_x: this.frisbee_offset_x - this.field_offset_x - 2,
          frisbee_y: this.frisbee_offset_y - this.field_offset_y - 2,
          offence_1_x: this.offence_1_offset_x - this.field_offset_x - 2,
          offence_1_y: this.offence_1_offset_y - this.field_offset_y - 2,
          offence_2_x: this.offence_2_offset_x - this.field_offset_x - 2,
          offence_2_y: this.offence_2_offset_y - this.field_offset_y - 2,
          offence_3_x: this.offence_3_offset_x - this.field_offset_x - 2,
          offence_3_y: this.offence_3_offset_y - this.field_offset_y - 2,
          offence_4_x: this.offence_4_offset_x - this.field_offset_x - 2,
          offence_4_y: this.offence_4_offset_y - this.field_offset_y - 2,
          offence_5_x: this.offence_5_offset_x - this.field_offset_x - 2,
          offence_5_y: this.offence_5_offset_y - this.field_offset_y - 2,
          offence_6_x: this.offence_6_offset_x - this.field_offset_x - 2,
          offence_6_y: this.offence_6_offset_y - this.field_offset_y - 2,
          offence_7_x: this.offence_7_offset_x - this.field_offset_x - 2,
          offence_7_y: this.offence_7_offset_y - this.field_offset_y - 2,
          defence_1_x: this.defence_1_offset_x - this.field_offset_x - 2,
          defence_1_y: this.defence_1_offset_y - this.field_offset_y - 2,
          defence_2_x: this.defence_2_offset_x - this.field_offset_x - 2,
          defence_2_y: this.defence_2_offset_y - this.field_offset_y - 2,
          defence_3_x: this.defence_3_offset_x - this.field_offset_x - 2,
          defence_3_y: this.defence_3_offset_y - this.field_offset_y - 2,
          defence_4_x: this.defence_4_offset_x - this.field_offset_x - 2,
          defence_4_y: this.defence_4_offset_y - this.field_offset_y - 2,
          defence_5_x: this.defence_5_offset_x - this.field_offset_x - 2,
          defence_5_y: this.defence_5_offset_y - this.field_offset_y - 2,
          defence_6_x: this.defence_6_offset_x - this.field_offset_x - 2,
          defence_6_y: this.defence_6_offset_y - this.field_offset_y - 2,
          defence_7_x: this.defence_7_offset_x - this.field_offset_x - 2,
          defence_7_y: this.defence_7_offset_y - this.field_offset_y - 2,
      }
    },
      success: (res) => {
        var data = res.data;
        var steps = [];
        for(var i=0; i<data.length; i++){
          var str = "";
          var step_id = data[i].id;
          var step_order = i + 1;
          if(data[i].description == ''){
            str = "Step " + step_order + ". " + "暂时没有步骤描述。";
          }else{
            str = "Step " + step_order + ". " + data[i].description;
          }
          steps[i] = {a_step: str, step_id: step_id};
        };
        wx.showToast({
          icon: "none",
          title: '创建成功，请下滑查看',
        })
        that.setData({
          steps: steps,
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
        let i = 0;
        let interval = 1500;
        setInterval(function(){
          if(i < len){
            let status = JSON.parse(data[i]["status"]);
            that.setData({
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
            i += 1;
          };
        }.bind(that), interval)
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

  del_a_step: function(res){
    var that = this;
    var step_id = res.target.dataset.step_id;
    wx.request({
      url: 'http://192.168.31.42:3000/steps/' + step_id,
      method: 'DELETE',
      data: {step_id: step_id},
      success: function(res){
        console.log(res);
        var data = res.data;
        var steps = [];
        for(var i=0; i<data.length; i++){
          var str = "";
          var step_id = data[i].id;
          var step_order = i + 1;
          if(data[i].description == ''){
            str = "Step " + step_order + ". " + "暂时没有步骤描述。";
          }else{
            str = "Step " + step_order + ". " + data[i].description;
          }
          steps[i] = {a_step: str, step_id: step_id};
        };
        that.setData({
          steps: steps,
          step_input_value: ""
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
        console.log(res);
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
              wx.showToast({
                icon: "none",
                title: '已重置，请重新创建',
              })
              that.setData({
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
              })
            }
          })
        }
      }
    })
  }
})