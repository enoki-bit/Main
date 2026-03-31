// ▼ HTML要素の取得
const selectCat = document.getElementById("category");
const selectMeal = document.getElementById("meal");
const result = document.getElementById("result");
const btn = document.getElementById("load");
const slider = document.getElementById("slider");

/* ============================================================
   共通：料理の詳細を表示する関数（ボタン・スライダー両方で使う）
============================================================ */
function loadMealDetail(id) {
  fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
    .then(res => res.json())
    .then(data => {
      const m = data.meals[0];

      // 表示エリアをクリア
      result.innerHTML = "";

      // ▼料理名
      const h3 = document.createElement("h3");
      h3.textContent = m.strMeal;
      result.appendChild(h3);

      // ▼画像
      const img = document.createElement("img");
      img.src = m.strMealThumb;
      result.appendChild(img);

      // ▼カテゴリ
      const p1 = document.createElement("p");
      p1.innerHTML = "<strong>カテゴリ：</strong> " + m.strCategory;
      result.appendChild(p1);

      // ▼地域
      const p2 = document.createElement("p");
      p2.innerHTML = "<strong>地域：</strong> " + m.strArea;
      result.appendChild(p2);

      // ▼材料リスト
      const ul = document.createElement("ul");
      for (let i = 1; i <= 10; i++) {
        const ing = m["strIngredient" + i];
        const mea = m["strMeasure" + i];
        if (ing) {
          const li = document.createElement("li");
          li.textContent = ing + " - " + mea;
          ul.appendChild(li);
        }
      }
      result.appendChild(ul);
    });
}

/* ============================================================
   ① カテゴリ一覧を読み込む
============================================================ */
fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
  .then(res => res.json())
  .then(data => {
    selectCat.innerHTML = '<option value="">カテゴリを選択</option>';

    for (let i = 0; i < data.meals.length; i++) {
      const op = document.createElement("option");
      op.value = data.meals[i].strCategory;
      op.textContent = data.meals[i].strCategory;
      selectCat.appendChild(op);
    }
  });

/* ============================================================
   ② カテゴリ選択 → 料理一覧を読み込む
============================================================ */
selectCat.addEventListener("change", function() {
  const cat = selectCat.value;

  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + cat)
    .then(res => res.json())
    .then(data => {
      selectMeal.innerHTML = '<option value="">料理を選択</option>';

      for (let i = 0; i < data.meals.length; i++) {
        const op = document.createElement("option");
        op.value = data.meals[i].idMeal;
        op.textContent = data.meals[i].strMeal;
        selectMeal.appendChild(op);
      }
    });
});

/* ============================================================
   ③ 「詳細を表示」ボタン → 詳細表示
============================================================ */
btn.addEventListener("click", function() {
  const id = selectMeal.value;
  if (id) loadMealDetail(id);
});

/* ============================================================
   ④ 下固定スライダー：全料理の画像を流し込む
   ＋ クリックで詳細表示できるようにする
============================================================ */
fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
  .then(res => res.json())
  .then(data => {

    for (let i = 0; i < data.meals.length; i++) {
      const cat = data.meals[i].strCategory;

      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + cat)
        .then(res => res.json())
        .then(mealsData => {

          for (let j = 0; j < mealsData.meals.length; j++) {
            const img = document.createElement("img");
            img.src = mealsData.meals[j].strMealThumb;

            // ▼ 料理IDを画像に埋め込む
            img.dataset.id = mealsData.meals[j].idMeal;

            // ▼ クリックしたら詳細表示
            img.addEventListener("click", function () {
              loadMealDetail(this.dataset.id);
            });

            slider.appendChild(img);
          }
        });
    }
  });
