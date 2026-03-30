$(document).ready(function(){

// ======================
// 花びらアニメーション
// ======================

const PETAL_COUNT = 18;

function createPetals(){

const container = $("#petals-container");

const colors = [
["#ffd6e0","#ffb3c6"],
["#ffb7c5","#ff85a1"],
["#fff0f3","#ffc2d1"],
["#fce4ec","#f48fb1"]
];

for(let i=0;i<PETAL_COUNT;i++){

const left = Math.random()*100;
const duration = 8 + Math.random()*12;
const delay = Math.random()*20;
const size = 10 + Math.random()*10;
const sway = 20 + Math.random()*40;

const color = colors[Math.floor(Math.random()*colors.length)];

const petal = $("<div>").addClass("petal-fall sakura-petal").css({

left:left+"%",
animationDuration:duration+"s",
animationDelay:delay+"s",
width:size+"px",
height:(size*1.3)+"px",
"--sway":sway+"px",
background:`linear-gradient(135deg,${color[0]},${color[1]})`

});

container.append(petal);

}

}

createPetals();


// ======================
// 月プルダウン生成
// ======================

for(let m=1;m<=12;m++){

$("#select-month").append(
$("<option>").val(String(m).padStart(2,"0")).text(m)
);

}


// ======================
// 月ごとの日数
// ======================

const daysInMonth=[31,29,31,30,31,30,31,31,30,31,30,31];

function updateDays(){

const month=parseInt($("#select-month").val());

$("#select-day").empty();

if(!month)return;

for(let d=1;d<=daysInMonth[month-1];d++){

$("#select-day").append(
$("<option>").val(String(d).padStart(2,"0")).text(d)
);

}

}

$("#select-month").on("change",updateDays);


// ======================
// 今日の日付を初期値
// ======================

function setToday(){

const today=new Date();

const month=String(today.getMonth()+1).padStart(2,"0");
const day=String(today.getDate()).padStart(2,"0");

$("#select-month").val(month);

updateDays();

$("#select-day").val(day);

}

setToday();


// ======================
// 検索ボタン
// ======================
$("#search-btn").on("click", async function() {
    const month = $("#select-month").val();
    const day = $("#select-day").val();

    if (!month || !day) {
        alert("月日を選択してください");
        return;
    }

    const mmdd = month + day;

    $("#result_area").show();
    $("#flower_name").text("");
    $("#detail").text("Loading...");

    try {
        // プロキシを corsproxy.io に変更してCORSを回避します [1]
        const url = `https://corsproxy.io/?${encodeURIComponent(`https://api.whatistoday.cyou/index.cgi/v3/birthflower/${mmdd}`)}`;
        
        const res = await fetch(url); // 非同期でデータを取得 [2]
        const data = await res.json(); // JSON形式に変換 [3]

        // データ構造の修正：_items を通さず直接取得します [4]
        $("#flower_name").text(data.flower); 
        $("#detail").text("花言葉：" + data.lang);

    } catch (e) {
        $("#flower_name").text("取得できませんでした");
        $("#detail").text("別の通信経路を試してください");
    }
});


// ======================
// Enterキー検索
// ======================

$(document).keydown(function(e){

if(e.key==="Enter"){

$("#search-btn").click();

}

});

});