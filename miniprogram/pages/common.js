// 服务器路由
var server_url = "http://192.168.31.42:3000";

// 首页、个人主页获取战术板
function boards(board_data){
  var data = board_data;
  var boards = [];
  for(var i=0; i<data.length; i++){
    boards[i] = {
      title: data[i].title,
      description: data[i].description,
      board_id: data[i].id
    };
  };
  return boards
};

// 战术展示页、创建步骤页获取步骤
function steps(step_data){
  var data = step_data;
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
  return steps
}


module.exports = {
  server_url: server_url,
  boards: boards,
  steps: steps
}