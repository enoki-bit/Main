// HTMLで使用しているidの取得
const keyword = document.getElementById("keyword");
const searchButton = document.getElementById("searchButton");
const message = document.getElementById("message");
const results = document.getElementById("results");
const detail = document.getElementById("detail");

document.addEventListener('DOMContentLoaded', function()
{
  // ボタンが押された時に走るイベント
  searchButton.addEventListener("click", searchBooks);

  async function searchBooks() {
    const word = keyword.value;

    results.innerHTML = "";
    detail.innerHTML = "ここに本の詳細を表示します";

    if (word === "") {
      message.textContent = "文字を入力してください";
      return;
    }

    message.textContent = "検索中...";

    const url = "https://openlibrary.org/search.json?q=" + word;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.docs.length === 0) {
        message.textContent = "本が見つかりませんでした";
        return;
      }

      message.textContent = data.docs.length + "件見つかりました";

      for (let i = 0; i < 5; i++) {
        const book = data.docs[i];

        if (!book) {
          break;
        }

        const li = document.createElement("li");

        let title = "タイトル不明";
        if (book.title) {
          title = book.title;
        }

        let author = "著者不明";
        if (book.author_name) {
          author = book.author_name[0];
        }

        li.textContent = title + " / " + author;

        li.addEventListener("click", function () {
          let year = "不明";
          if (book.first_publish_year) {
            year = book.first_publish_year;
          }

          detail.innerHTML =
            "<h2>" + title + "</h2>" +
            "<p>著者: " + author + "</p>" +
            "<p>出版年: " + year + "</p>";
        });

        results.appendChild(li);
      }
    } catch (error) {
      message.textContent = "エラーが起きました";
    }
  }
});