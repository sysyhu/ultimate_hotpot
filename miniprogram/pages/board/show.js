// pages/board/show.js
Page({
  data: {
    eye: "open_eye",
    note: "",
    note_display_none: "",
    board_title: "",
    board_description: "",
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
    console.log(options);
    var that = this;
    var board_id = options.board_id;
    this.board_id = board_id;
    wx.request({
      url: 'http://192.168.31.42:3000/boards/' + board_id,
      method: 'GET',
      success: function(res){
        console.log(res);
        var status = JSON.parse(res.data[2]["status"]);
        that.setData({
          board_title: res.data[0].title,
          board_description: res.data[0].description,
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
        var data = res.data[1];
        var steps = [];
        var step_1_description = "Step 1. " + res.data[1][0].description;
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
          step_input_value: "",
          note: step_1_description
        });
      }
    })
  },

  onShow: function(){
    wx.hideHomeButton({
      complete: (res) => {
        console.log(res);
      },
    })
  },

  play: function(){
    var that = this;
    wx.request({
      url: 'http://192.168.31.42:3000/steps/play',
      method: 'POST',
      data: {board_id: this.board_id},
      // data: {board_id: 1128},
      success: (res)=>{
        var data = res.data;
        console.log(data);
        var len = data.length;
        var i = 0;
        var interval = 1500;
        setInterval(function(){
          if(i < len){
            var status = JSON.parse(data[i]["status"]);
            var step_order = i + 1;
            var description = "Step " + step_order + ". " + data[i].description;
            console.log(description);
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

  play_a_step: function(res){
    var that = this;
    var step_id = res.target.dataset.step_id;
    wx.request({
      url: 'http://192.168.31.42:3000/steps/play_a_step',
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

  home: function(){
    wx.switchTab({
      url: '../../pages/profile/profile',
    })
  }


})