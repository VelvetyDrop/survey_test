const question = JSON.parse(sessionStorage.getItem("questions"));
const answers  = JSON.parse(sessionStorage.getItem("answers"));
const kaitou   = JSON.parse(sessionStorage.getItem("kaitou"));

let str = "";
var count = 0;
const table = document.getElementById("result_table");
let newRow;
let newCell;
for(let i = 0; i < question.length; i++){
  for(let j = 0; j < question[i].length; j++){
    newRow = table.insertRow(-1);
    newCell = newRow.insertCell(-1);
    str = document.createTextNode(question[i][j].replace(/<\/*span>/g,""));
    newCell.appendChild(str);
    
    newCell = newRow.insertCell(-1);
    str = "<select>";
    for(let k =0; k < answers[i].length; k++){
        str += "<option value="+ k; 
        if(k == kaitou[count]){
	    str += " selected";
	}
        str += ">"+answers[i][k]+"</option>";

    }
    str += "</select>"
    newCell.innerHTML = str;
    count ++;
  }
}
const sub_button = document.getElementById("submit_button");
sub_button.addEventListener("click",function(){
    const sub_kaitou = document.getElementsByTagName("select");
    for(let i = 0; i < sub_kaitou.length; i++){
       kaitou[i] = parseInt(sub_kaitou[i].value);
    }
    //　回答送る処理
    sessionStorage.clear();
    calc_score();
    window.alert("回答ありがとうございました。\n5秒後にページを遷移します");
    window.setTimeout(function(){
	  window.location.href =  "https://www.google.com";
        },5000);
});

function calc_score(){
  let score =[0,0,0,0];
  let count = 0;
  for(let i = 0; i < question.length; i++){
    for(let j = 0; j < question[i].length; j++){
      if(i == 0 && ((j >= 0 && j < 7) || (j >= 10 && j < 13) || j == 14)){
	score[i] += (5 - kaitou[count]);
      }else if(i == 1 && j >= 0 && j < 3){
	score[i] += (5 - kaitou[count]);
      }else{
	score[i] += kaitou[count];
      }
            count++;
    }
  }
  if(score[1] >= 77){
    window.alert("高ストレス者です");
  }else if(score[0]+score[2] >= 76 && score[1] >=63){
    window.alert("高ストレス者です");
  }else{
    window.alert("問題ないです");
  }
  window.alert(score);
}
