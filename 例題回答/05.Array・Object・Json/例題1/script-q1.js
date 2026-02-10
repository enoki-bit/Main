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

    // ① 果物の配列の要素をループして、sel_4にoptionタグを追加していく
    for(let fruit of fruits)
    {
        let opt_elem = document.createElement('option'); // → <option></option>

        opt_elem.value = intCnt + 1; // → <option value="1"></option>
        opt_elem.textContent = fruit; // → <option value="1">りんご</option>

        document.getElementById('sel_4').appendChild(opt_elem); // → sel_4にoptionタグを追加

        intCnt++; // → value属性に入れる値をインクリメント
    }

    // ② 都道府県の配列の要素をループして、sel_3にoptionタグを追加していく
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

    // ③ 性別の配列の要素をループして、genderにinput[type='radio']を追加する
    intCnt = 0;
    for(let gender of genders)
    {
        let radio_elem = document.createElement('input');
        let lbl_elem = document.createElement('label');

        radio_elem.type = 'radio';
        radio_elem.name = 'gender';
        radio_elem.id = 'gender_' + (intCnt + 1).toString
        radio_elem.value = intCnt + 1;

        // [男性]を選択状態にする
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
});