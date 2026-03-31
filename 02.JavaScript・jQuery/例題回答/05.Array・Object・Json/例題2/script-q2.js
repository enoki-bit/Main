// 使用する配列を定義
let prefectures = ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
                   '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
                   '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
                   '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
                   '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
                   '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
                   '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'];
let genders = ['男性', '女性', 'どちらでもない'];
let fruits = ['りんご', 'いちご', 'みかん', 'もも', 'バナナ', 'すいか', 'メロン'];

// HTMLが読込完了後に動作するイベントとして定義
document.addEventListener('DOMContentLoaded', function()
{
    let intCnt = 0;

    // 果物の配列の要素をループして、sel_4にoptionタグを追加していく
    for(let fruit of fruits)
    {
        let opt_elem = document.createElement('option');

        opt_elem.value = intCnt + 1;
        opt_elem.textContent = fruit;

        document.getElementById('sel_4').appendChild(opt_elem);

        intCnt++;
    }

    // 都道府県の配列の要素をループして、sel_3にoptionタグを追加していく
    intCnt = 0;
    for(let prefecture of prefectures)
    {
        let opt_elem = document.createElement('option');

        // 初回の処理の際のみ、先頭に空白行を追加する
        if(intCnt == 0)
        {
            let opt_elem_blank = document.createElement('option');

            opt_elem_blank.value = intCnt;
            opt_elem_blank.textContent = '';

            document.getElementById('sel_3').appendChild(opt_elem_blank);

            intCnt++;
        }

        opt_elem.value = intCnt;
        opt_elem.textContent = prefecture;

        document.getElementById('sel_3').appendChild(opt_elem);

        intCnt++;
    }

    // 性別の配列の要素をループして、genderにinput[type='radio']を追加する
    intCnt = 0;
    for(let gender of genders)
    {
        let radio_elem = document.createElement('input');
        let lbl_elem = document.createElement('label');

        radio_elem.type = 'radio';
        radio_elem.name = 'gender';
        radio_elem.id = 'gender_' + (intCnt + 1).toString
        radio_elem.value = intCnt + 1;

        if(intCnt == 0)
        {
            radio_elem.checked = true;
        }

        lbl_elem.htmlFor = radio_elem.id;
        lbl_elem.textContent = gender;

        document.getElementById('gender').appendChild(radio_elem);
        document.getElementById('gender').appendChild(lbl_elem);

        intCnt++;
    }

    // 【例題2】ボタンにクリックイベントの追加
    let btn = document.getElementById('ft_btn');
    btn.addEventListener('click', function()
    {
        appendTable();
    });
});

// 入力結果を連想配列に取得し、table要素に動的に追加する
function appendTable()
{
    let entry_result = {};

    // 入力結果を連想配列に追加
    entry_result.name = document.getElementById('txt_2').value;
    entry_result.gender = document.querySelector('input[name="gender"]:checked').value;
    entry_result.prefecture = document.getElementById('sel_3').value;
    entry_result.fruit = document.getElementById('sel_4').value;

    if(entry_result.name != null)
    {
        // tableのtr要素を作成
        let tr_elem = document.createElement('tr');

        for(let key in entry_result)
        {
            // td要素を作成
            let td_elem = document.createElement('td');

            // td要素に値を追加
            switch(key)
            {
                case 'name':
                    td_elem.textContent = entry_result[key];
                    break;
                case 'gender':
                    td_elem.textContent = genders[entry_result[key] - 1];
                    break;
                case 'prefecture':
                    td_elem.textContent = prefectures[entry_result[key] - 1];
                    break;
                case 'fruit':
                    td_elem.textContent = fruits[entry_result[key] - 1];
                    break;
                default:
                    break;
            }

            // tr要素にtd要素を追加
            tr_elem.appendChild(td_elem);
        }

        document.getElementById('result').appendChild(tr_elem);
    }
}