  const hyoudai = [
    "A. あなたの仕事についてうかがいます。<br>最もあてはまるものを選択してください。 ", 
    "B. 最近 1 か月間のあなたの状態についてうかがいます。<br>最もあてはまるものを選択してください。",
   "C. あなたの周りの方々についてうかがいます。<br>最もあてはまるものを選択してください。",
    "D. 満足度について"
  ]
  const question = [
    ["非常にたくさんの仕事をしなければならない",
    "時間内に仕事が処理しきれない",
    "一生懸命働かなければならない",
    "かなり注意を集中する必要がある",
    "高度の知識や技術が必要なむずかしい仕事だ",
    "勤務時間中はいつも仕事のことを考えていなければならない",
    "からだを大変よく使う仕事だ",
    "自分のペースで仕事ができる",
    "自分で仕事の順番・やり方を決めることができる",
    "職場の仕事の方針に自分の意見を反映できる",
    "自分の技能や知識を仕事で使うことが少ない",
    "私の部署内で意見のくい違いがある",
    "私の部署と他の部署とはうまが合わない",
    "私の職場の雰囲気は友好的である",
    "私の職場の作業環境（騒音、照明、温度、換気など）はよくない",
    "仕事の内容は自分にあっている",
    "働きがいのある仕事だ"],
    ["活気がわいてくる",
     "元気がいっぱいだ",
     "生き生きする",
     "怒りを感じる",
     "内心腹立たしい",
     "イライラしている",
     "ひどく疲れた",
     "へとへとだ",
     "だるい",
     "気がはりつめている",
     "不安だ",
     "落着かない",
     "ゆううつだ",
     "何をするのも面倒だ",
     "物事に集中できない",
     "気分が晴れない",
     "仕事が手につかない",
     "悲しいと感じる",
     "めまいがする",
     "体のふしぶしが痛む",
     "頭が重かったり頭痛がする",
     "首筋や肩がこる",
     "腰が痛い",
     "目が疲れる",
     "動悸や息切れがする",
     "胃腸の具合が悪い",
     "食欲がない",
     "便秘や下痢をする",
     "よく眠れない"
    ],
    ["<span>上司</span>にどのくらい気軽に話ができますか？",
     "<span>職場の同僚</span>にどのくらい気軽に話ができますか？",
     "<span>配偶者、家族、友人等</span>にどのくらい気軽に話ができますか？",
      "あなたが困った時、<span>上司</span>はどのくらい頼りになりますか？",
     "あなたが困った時、<span>職場の同僚</span>はどのくらい頼りになりますか？",
     "あなたが困った時、<span>配偶者、家族、友人等</span>はどのくらい頼りになりますか？",
     "あなたの個人的な問題を相談したら、<span>上司</span>はどのくらい聞いてくれますか？",
     "あなたの個人的な問題を相談したら、<span>職場の同僚</span>はどのくらい聞いてくれますか？",
     "あなたの個人的な問題を相談したら、<span>配偶者、家族、友人等</span>はどのくらい聞いてくれますか？"
    ],
    ["仕事に満足だ",
     "家庭生活に満足だ"
    ]
  ];

  const answers = [
    ["そうだ",
    "まあそうだ",
    "ややちがう",
    "ちがう"
     ],
    [
      "ほとんどなかった",
      "ときどきあった",
      "しばしばあった",
      "ほとんどいつもあった"    
    ],
    ["非常に",
     "かなり",
     "多少",
     "全くない"
    ],
    ["満足",
     "まあ満足",
     "やや不満足",
     "不満足"
    ]
  ];
  var kaitou_suu=0;
 
function count(){
    let tmp = 0;
    for(let i = 0; i < question.length; i++){
      tmp += question[i].length; 
    }
    return tmp;
  }
  var q_count = count();
  var kaitou =[];
  var questionIndex = 0;
  const progress = document.getElementById("sinkoudo");
  progress.max = q_count;
  const progress_tag = document.getElementById("pct");
  const hyoudai_tag = document.getElementById("hyoudai");
  const question_tag = document.getElementById("js-question");
  const button = document.getElementsByClassName("btn btn-primary");
  const return_button = document.getElementById("return_button");
  const slider_value = document.getElementById("value");
  const slider_label = document.getElementById("value_label");
  var test = new Vue({
    el: "#test",
    data: {
	seenFlag: true
    },
    methods:{
	mouseOverAction(){
		this.seenFlag = true;
	},
	mouseLeaveAction(){
		this.seenFlag = false;
	}
    }
  })
  let range_value = function(slider_value,slider_label){
    return function(evt){
      slider_label.textContent = slider_value.value;
    }
  }
 // slider_value.addEventListener("input",range_value(slider_value,slider_label));
  return_button.addEventListener("click",function(){
    if(questionIndex <= 0){
      if(Index<=0){
        window.alert("戻れません");
        return;
      }else{
        Index--;
        questionIndex = question[Index].length-1;
        kaitou.pop();
        sitsumon = question[Index];
        question_tag.innerHTML = questionIndex +1 +"."+sitsumon[questionIndex];
        hyoudai_tag.innerHTML = hyoudai[Index];
        for(let i = 0; i < answers[Index].length; i++){
          button[i].textContent = answers[Index][i];
        }
      }
    }else{
      kaitou.pop();
      kaitou_suu--;
      let tmp1 =  (kaitou_suu / q_count) *100
      progress.value = kaitou_suu;
      progress_tag.innerHTML = Math.round(tmp1);
      questionIndex--;
      question_tag.innerHTML = questionIndex +1 +"."+sitsumon[questionIndex];
    }
  });
  let sitsumon = question[0];
  let Index = 0;
  init();
  function check_index(){
    if(questionIndex >= sitsumon.length-1){
      if(Index >= question.length-1){
	let q = JSON.stringify(question);
	let a = JSON.stringify(answers);
	let k = JSON.stringify(kaitou);
        sessionStorage.setItem("questions",q);
        sessionStorage.setItem("answers",a);
        sessionStorage.setItem("kaitou",k);
        window.location.href = 'result.html'
        return;
      }else{
        Index++;
      }
      hyoudai_tag.innerHTML = hyoudai[Index];  
      sitsumon = question[Index];
       for(let i = 0; i < answers[Index].length; i++){
        button[i].innerHTML = answers[Index][i];
       }
      questionIndex = -1;
    }
    questionIndex++;
    next_question();
  }


  function init(){
    hyoudai_tag.innerHTML = hyoudai[Index];
    question_tag.textContent = questionIndex+1+"."+sitsumon[questionIndex];
    for(let i = 0; i < answers[Index].length; i++){
    button[i].innerHTML = answers[Index][i];
    button[i].addEventListener("click",function(){
        kaitou.push(i);
        kaitou_suu++;
	let tmp1 = (kaitou_suu / q_count) *100;
        progress.value = kaitou_suu ;
        progress_tag.innerHTML = Math.round(tmp1);
        check_index();
      
    });
  }
  }

  function next_question(){
      question_tag.innerHTML = questionIndex +1 +"."+sitsumon[questionIndex];
  }