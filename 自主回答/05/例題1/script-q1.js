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

document.addEventListener('DOMContentLoaded',function()
{
    let count = 0;

    for(let fruit of fruits)
    {
        // オプションタグを新しく作る
        let op_element = document.createElement('option');　// <option></option>が作られる
        
        // オプションタグ内に配列の値を代入する
        op_element.value = count + 1;　// valueを設定することで、<option value = '値'></option>の形に変化する

        // オプションタグの中に配列を入れる
        op_element.textContent = fruit;　// .textContentで文字を選択。fruitの配列から要素番号を持ってきて、文字化する
                                        //　これで、<option value = 0> りんご </option>の形になる
        
        // HTMLに出来たオプションタグを子要素として入れ込む ←これ忘れがち！
        document.getElementById("sel_4").appendChild(op_element);

        // countをインクリメントする
        count++

    }

    let count2 = 0;

    // if文でcount2が０の時、空白を入れるコードを先に記述できる？
    if(count2 == 0)
    {
        let op_element0 = document.createElement('option'); // <option></option>
        op_element0.value = count2; // <option value = '値'></option>
        op_element0.textContent = '';   // .textContentで文字を選択。<option value = 0> </option>の形になり、空白行ができる
        document.getElementById("sel_3").appendChild(op_element0);  // HTMLに入れ込む
    }

    for(let prefecture of prefectures)
    {
        // オプションタグを新しく作る
        let op_element = document.createElement('option');　// <option></option>が作られる
        
        // オプションタグ内に配列の値を代入する
        op_element.value = count2 + 1;　// valueを設定することで、<option value = '値'></option>の形に変化する

        // オプションタグの中に配列を入れる
        op_element.textContent = prefecture;　// .textContentで文字を選択。fruitの配列から要素番号を持ってきて、文字化する
                                              //　これで、<option value = 1> 北海道 </option>の形になる
        
        // HTMLに出来たオプションタグを子要素として入れ込む
        document.getElementById("sel_3").appendChild(op_element);

        // countをインクリメントする
        count++

    }

    // ラジオ（input[type=radio]）を作成する
    let count3 = 0
    for(let gender of genders)
    {
        // 最初にinputタグを作成する
        let in_element = document.createElement('input');

        // inputタグ内にinput type = 'radio'を作成する
        // 

    }
});