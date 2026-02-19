document.addEventListener('DOMContentLoaded', function()
{
    // id btnを使えるようにする
    const btn = document.getElementById('btn');
    // id cat_imgを使えるようにする
    const cat_img = document.getElementById('cat_img');

    // ボタンをクリックしたときの処理
    btn.addEventListener('click', async function()
    {
        // API処理をする
        let api_result_data = await getData();

        // API処理で持ってきたurlの配列を抜き出す
        const caturl = api_result_data[0].url;

        // 取ってきた配列を画像データとしてcat_imgに入れる
        cat_img.src = caturl;
    });

});

// ボタン処理をした時のawait/async形式の処理
async function getData()
        {
            let result = await fetch('https://api.thecatapi.com/v1/images/search');

            let data = await result.json();

            return data;
        }