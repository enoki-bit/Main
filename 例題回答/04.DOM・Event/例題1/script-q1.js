document.addEventListener('DOMContentLoaded', function()
{
    // ① タイトルの変更
    // 変更前のタイトルの文字列を変数に取得する
    let strTitle = document.getElementById('txt_title').textContent;

    // 取得した変更前のタイトルに追加の文字列を加えて、再セットする
    document.getElementById('txt_title').textContent = strTitle + 'の勉強';

    // ② pタグの文字を取得して、アラートに表示
    // pタグの要素から文字列を取得し、変数に格納する
    let strPTxt = document.querySelector('#main_body p').textContent;

    alert(strPTxt);

    // ③ spanタグの文字色変更
    document.getElementById('sp_1').style.color = 'red';

    // ④ intput[type='text']の背景色をグレーに変更
    let arrTxt = document.querySelectorAll('input[type="text"]');

    for(const target of arrTxt)
    {
        target.style.backgroundColor = '#F3F3F3';
    }

    // ⑤ 入力項目2にplaceholderを設定する
    document.getElementById('txt_2').placeholder = '入力項目2';
});
