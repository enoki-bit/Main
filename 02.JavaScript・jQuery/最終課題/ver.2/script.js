// HTMLが読み込まれた後に動くように定義する
document.addEventListener('DOMContentLoaded', function()
{
  // idの取得
  const keyword = document.getElementById("keyword");
  const searchButton = document.getElementById("searchButton");
  const message = document.getElementById("message");
  const result = document.getElementById("result");
  const detail = document.getElementById("detail");

  // ボタンが押された時に走るイベント
  searchButton.addEventListener("click", searchBooks);

  // 本を検索する関数(メインの処理)
  async function searchBooks() {

    // 入力された文字を取得して変数wordに入れる
    const word = keyword.value; 

    // 結果と詳細を初期化する
    result.innerHTML = "";
    detail.innerHTML = "ここに本の詳細を表示します";

    // 文字が入力されていない時の処理
    if (word === "") {
      message.textContent = "文字を入力してください";
      return;
    }

    message.textContent = "検索中...";

    // APIのURLを作成する
    const url = "https://openlibrary.org/search.json?q=" + word;

    try {
      const response = await fetch(url);  // APIにアクセスして結果をresponseに入れる
      const data = await response.json(); // responseをjson形式に変換してJavaScriptで使える形に変える

      // 本が見つからなかった時の処理
      if (data.docs.length === 0) {
        message.textContent = "本が見つかりませんでした";
        return;
      }

      // 見つかった本の数を表示する
      message.textContent = data.docs.length + "件見つかりました";

      // 最初の5件の本のタイトルと著者を表示する
      for (let i = 0; i < 5; i++) {
        const book = data.docs[i];  // i番目の本の情報を定数bookに入れる

        // bookが存在しない場合はループを抜ける
        if (!book) {
          break;
        }

        // HTMLにli要素を作成する
        const li = document.createElement("li");

        let title = "タイトル不明"; // タイトルがない場合の初期値
        if (book.title) {
          title = book.title;
        }

        let author = "著者不明";  // 著者がいない場合の初期値
        if (book.author_name) {
          author = book.author_name;
        }

        // li要素のテキストにタイトルと著者を入れる
        li.textContent = title + " / " + author;

        // li要素がクリックされたときのイベント
        li.addEventListener("click", function () {

          let year = "不明";  // 出版年がない場合の初期値
          if (book.first_publish_year) {
            year = book.first_publish_year;
          }

          // 詳細表示の内容を作成してdetailに入れる
          detail.innerHTML =
            "<h2>" + title + "</h2>" +
            "<p>著者: " + author + "</p>" +
            "<p>出版年: " + year + "</p>";
        });

        // li要素をresultに追加する
        result.appendChild(li);
      }
    } catch (error) {
      message.textContent = "エラーが起きました";
    }
  }
});