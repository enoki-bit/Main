document.addEventListener('DOMContentLoaded', function()
{
    // ボタンクリックイベントを実装するために、ボタン要素を取得
    let btn = document.getElementById('btn');

    // ボタンクリックイベントを定義
    // APIの結果を受けて処理を行うため、コールバック関数はasync functionにする
    btn.addEventListener('click', async function()
    {
        // APIを実行し、responseを受け取る
        let response = await fetch('https://api.thecatapi.com/v1/images/search');

        // responseをJSONに変換
        let data = await response.json();

        // responseからimgタグに画像を表示
        await dispImg(data);
    });
});

// imgタグに画像を表示する
async function dispImg(data)
{
    // 画像の表示対象のimgタグの要素を取得
    let img = document.getElementById('cat_img');

    // 元の画像が表示されていた場合に、一旦クリアするためimgタグのsrc属性を初期化
    img.setAttribute('src', '');

    // パラメータのJSONのURLをimgタグのsrc属性にセット
    img.setAttribute('src', data[0].url);

    // 画像の縦横比を変えずに表示するために、imgタグのwidthをautoに変更
    img.style.width = 'auto';
}