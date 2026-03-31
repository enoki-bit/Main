// 必要なHTML要素を取得する
const keywordInput = document.getElementById('keyword');
const searchButton = document.getElementById('searchButton');
const message = document.getElementById('message');
const resultsList = document.getElementById('resultsList');
const detailArea = document.getElementById('detailArea');

// 検索ボタンが押されたら searchBooks 関数を実行する
searchButton.addEventListener('click', searchBooks);

// Enterキーでも検索できるようにする
keywordInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    searchBooks();
  }
});

// 本を検索する関数
async function searchBooks() {
  const keyword = keywordInput.value.trim();

  // 前回の検索結果を消す
  resultsList.innerHTML = '';
  detailArea.innerHTML = '検索結果から本を1冊選んでください。';
  detailArea.className = 'detail-card empty-detail';

  // 入力が空ならエラー表示して終了
  if (keyword === '') {
    showMessage('キーワードを入力してください。', 'error');
    return;
  }

  showMessage('検索中...', 'success');

  try {
    // Open Library API にアクセスするURL
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(keyword)}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('API通信に失敗しました。');
    }

    const data = await response.json();

    // 検索結果が0件ならメッセージを表示して終了
    if (data.docs.length === 0) {
      showMessage('検索結果が見つかりませんでした。', 'error');
      return;
    }

    showMessage(`${data.docs.length}件見つかりました。上位10件を表示しています。`, 'success');

    // 最大10件だけ表示する
    const books = data.docs.slice(0, 10);

    books.forEach(function (book) {
      // 1冊分のli要素を作る
      const li = document.createElement('li');
      li.className = 'result-item';

      const title = book.title || 'タイトル不明';
      const author = book.author_name ? book.author_name.join(', ') : '著者不明';
      const year = book.first_publish_year || '不明';

      li.innerHTML = `
        <div class="result-title">${title}</div>
        <p class="result-text"><strong>著者:</strong> ${author}</p>
        <p class="result-text"><strong>初版発行年:</strong> ${year}</p>
      `;

      // クリックした本の詳細を右側に表示する
      li.addEventListener('click', function () {
        showBookDetail(book);
      });

      resultsList.appendChild(li);
    });
  } catch (error) {
    showMessage('データの取得に失敗しました。時間をおいて再度試してください。', 'error');
    console.error(error);
  }
}

// メッセージ表示用の関数
function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
}

// 選択した本の詳細を表示する関数
function showBookDetail(book) {
  detailArea.className = 'detail-card';

  const title = book.title || 'タイトル不明';
  const author = book.author_name ? book.author_name.join(', ') : '著者不明';
  const year = book.first_publish_year || '不明';
  const publisher = book.publisher ? book.publisher[0] : '不明';
  const isbn = book.isbn ? book.isbn[0] : '不明';

  // cover_i があれば表紙画像URLを作る
  let coverHtml = '<p class="detail-text">表紙画像はありません。</p>';
  if (book.cover_i) {
    const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    coverHtml = `<img src="${coverUrl}" alt="${title} の表紙" class="detail-cover">`;
  }

  detailArea.innerHTML = `
    ${coverHtml}
    <h3 class="detail-title">${title}</h3>
    <p class="detail-text"><strong>著者:</strong> ${author}</p>
    <p class="detail-text"><strong>初版発行年:</strong> ${year}</p>
    <p class="detail-text"><strong>出版社:</strong> ${publisher}</p>
    <p class="detail-text"><strong>ISBN:</strong> ${isbn}</p>
  `;
}
