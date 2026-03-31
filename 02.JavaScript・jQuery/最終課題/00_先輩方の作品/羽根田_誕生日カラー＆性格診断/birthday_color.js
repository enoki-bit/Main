// --------------------------------------
// 月と日のプルダウン生成
// --------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const monthSelect = document.getElementById("month");
  const daySelect = document.getElementById("day");

  // 初期表示
  monthSelect.innerHTML = '<option value="">月</option>';
  daySelect.innerHTML = '<option value="">日</option>';
  daySelect.disabled = true; // ← 日を選べないようにする

  // 月（1〜12）
  for (let m = 1; m <= 12; m++) {
    const option = document.createElement("option");
    option.value = m;
    option.textContent = m;
    monthSelect.appendChild(option);
  }

  // 日数を更新する関数
  function updateDays(month) {
    daySelect.innerHTML = '<option value="">日</option>';

    if (!month) {
      daySelect.disabled = true; // 月が未選択なら日を選べない
      return;
    }

    daySelect.disabled = false; // 月が選ばれたので日を選べる

    const daysInMonth = {
      1: 31,
      2: 29,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31
    };

    const maxDay = daysInMonth[month];

    for (let d = 1; d <= maxDay; d++) {
      const option = document.createElement("option");
      option.value = d;
      option.textContent = d;
      daySelect.appendChild(option);
    }
  }

  // 月が選ばれたら日数を更新
  monthSelect.addEventListener("change", () => {
    updateDays(Number(monthSelect.value));
  });
});



// --------------------------------------
// 診断ボタンのイベント処理
// --------------------------------------
document.getElementById("searchBtn").addEventListener("click", async () => {
  const month = document.getElementById("month").value;
  const day = document.getElementById("day").value;

  if (!month || !day) {
    alert("月と日を選択してください");
    return;
  }

  const url = `https://birthday-color-api.vercel.app/api?month=${month}&day=${day}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    document.getElementById("colorBox").style.background = data.color;
    document.getElementById("colorName").textContent = `${data.name}（${data.color}）`;
    document.getElementById("colorMessage").textContent = data.message;

    document.getElementById("resultBox").style.display = "block";

  } catch (e) {
    alert("エラーが発生しました: " + e.message);
  }
});




// --------------------------------------
// APIからの結果を受け取って表示する処理
// --------------------------------------
document.getElementById("searchBtn").addEventListener("click", async () => {
  const month = document.getElementById("month").value;
  const day = document.getElementById("day").value;

  if (!month || !day) {
    alert("月と日を選択してください");
    return;
  }

  const url = `https://birthday-color-api.vercel.app/api?month=${month}&day=${day}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    // 結果のDOM反映
    document.getElementById("colorBox").style.background = data.color;
    document.getElementById("colorName").textContent = `${data.name}（${data.color}）`;
    document.getElementById("colorMessage").textContent = data.message;

   const resultBox = document.getElementById("resultBox");
  resultBox.style.display = "block";



  } catch (e) {
    alert("エラーが発生しました: " + e.message);
  }



  // サイト全体にランダムなラメ粒を生成
const twinkleLayer = document.querySelector(".twinkle-layer");

for (let i = 0; i < 100; i++) {  
  const spark = document.createElement("span");
  spark.textContent = "✦"; 
  

  spark.style.left = Math.random() * 100 + "vw";
  spark.style.top = Math.random() * 100 + "vh";


  spark.style.animationDelay = Math.random() * 3 + "s";

  twinkleLayer.appendChild(spark);
}


});

