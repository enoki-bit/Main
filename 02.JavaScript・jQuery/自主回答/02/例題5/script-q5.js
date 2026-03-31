// 合計を格納する変数の定義
let intSum = null;

// 合計値の初期化
intSum = 0;

// 1～20まで繰り返す
for(let i = 1; i < 21; i++)
{
    // 3で割った余りが0の場合のみ、合計用変数に加算する
    if(i % 3 == 0)
    {
        intSum += i;
    }

    // 三項演算子を使用した例
    // intSum += i % 3 == 0 ? i : 0;
}

// 結果の表示
alert(intSum);