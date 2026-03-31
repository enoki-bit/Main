document.addEventListener('DOMContentLoaded', function()
{
    // id btnを使えるようにする
    const btn = document.getElementById('btn');
    // id latitude(経度)を使えるようにする
    const latitude = document.getElementById('latitude');    
    // id longitude(緯度)を使えるようにする
    const longitude = document.getElementById('longitude');

    // ボタンを押したときの処理
    btn.addEventListener('click', async function()
    {
        // API処理をする
        let api_result_data = await getData();

        // API処理で持ってきたurlの配列を抜き出す
        const URL = api_result_data[0];

        // アラートでJSONを表示する
        alert(URL);
    });
});

// ボタン処理をした時のawait/async形式の処理
async function getData()
        {
            let result = await fetch('https://api.latlng.work/api?q=Kagoshima');

            let data = await result.json();

            return data;
        }