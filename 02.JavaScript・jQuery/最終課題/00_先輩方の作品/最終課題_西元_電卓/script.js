document.addEventListener('DOMContentLoaded', function()
{

    let disp = document.getElementById('main_disp');

    let disp2 = document.getElementById('main_disp2');


    /* 四則演算 */
    let btn = document.getElementById('btn_DIV');
    btn.addEventListener('click', async function()
    {
        disp2.text = "" + canCalc(disp.textContent, "/");
        disp.textContent = "0";
    });

    btn = document.getElementById('btn_BY');
    btn.addEventListener('click', async function()
    {
        disp2.text = "" + canCalc(disp.textContent,"*");
        disp.textContent = "0";
    });

    btn = document.getElementById('btn_MIN');
    btn.addEventListener('click', async function()
    {
        disp2.text = "" + canCalc(disp.textContentm,"-");
        disp.textContent = "0";
    });

    btn = document.getElementById('btn_PLU');
    btn.addEventListener('click', async function()
    {
        disp2.text = "" + canCalc(disp.textContent,"+");
        disp.textContent = "0";
    });

    btn = document.getElementById('btn_PM');
    btn.addEventListener('click', async function()
    {
        if (disp.textContent.indexOf('-') == -1 && disp.textContent !== "0")
        {
            disp.textContent = "-" + disp.textContent;
        }else
        {
            disp.textContent = disp.textContent.replace('-','');
        }
        disp.textContent = setMaxLength(disp.textContent);
    });

    btn = document.getElementById('btn_RAN');
    btn.addEventListener('click', async function()
    {
        disp.textContent = Math.random() * disp.textContent;
        disp.textContent = setMaxLength(disp.textContent);
    });

    btn = document.getElementById('btn_DOT');
    btn.addEventListener('click', async function()
    {
        if (disp.textContent.indexOf('.') == -1)
        {
            disp.textContent = disp.textContent + "." ;
        }
        disp.textContent = setMaxLength(disp.textContent);
    });

    btn = document.getElementById('btn_EQU');
    btn.addEventListener('click', async function()
    {
        if (disp.textContent !== "0" && disp2.text !== "0")
        {
            disp.textContent = eval(disp2.text + disp.textContent);
        }
        disp.textContent = setMaxLength(disp.textContent);
    });

    /* 数字ボタン */
    btn = document.getElementById('btn_1');
    btn.addEventListener('click', async function()
    {
        disp.textContent = "" + getFirst(disp.textContent) + 1;
    });
    btn = document.getElementById('btn_2');
    btn.addEventListener('click', async function()
    {
        disp.textContent = "" + getFirst(disp.textContent) + 2;
    });
    btn = document.getElementById('btn_3');
    btn.addEventListener('click', async function()
    {
        disp.textContent = "" + getFirst(disp.textContent) + 3;
    });
    btn = document.getElementById('btn_4');
    btn.addEventListener('click', async function()
    {
        disp.textContent = "" + getFirst(disp.textContent) + 4;
    });
    btn = document.getElementById('btn_5');
    btn.addEventListener('click', async function()
    {
        disp.textContent = "" + getFirst(disp.textContent) + 5;
    });
    btn = document.getElementById('btn_6');
    btn.addEventListener('click', async function()
    {
        disp.textContent = "" + getFirst(disp.textContent) + 6;
    });
    btn = document.getElementById('btn_7');
    btn.addEventListener('click', async function()
    {
        disp.textContent = "" + getFirst(disp.textContent) + 7;
    });
    btn = document.getElementById('btn_8');
    btn.addEventListener('click', async function()
    {
        disp.textContent = "" + getFirst(disp.textContent) + 8;
    });
    btn = document.getElementById('btn_9');
    btn.addEventListener('click', async function()
    {
        disp.textContent = "" + getFirst(disp.textContent) + 9;
    });
    btn = document.getElementById('btn_0');
    btn.addEventListener('click', async function()
    {
        disp.textContent = "" + getFirst(disp.textContent) + 0;
    });

    btn = document.getElementById('btn_C');
    btn.addEventListener('click', async function()
    {
        disp.textContent = "0";
        disp2.text = "0";
    });
   
    /* 日本円から他の通貨に変換処理 */
    btn = document.getElementById('btn_KRW');
    btn.addEventListener('click', async function()
    {
    	if (disp.textContent !== "")
        {
            convertCurrency(disp.textContent, 'JPY', 'KRW');
        }
    });

    btn = document.getElementById('btn_USD');
    btn.addEventListener('click', async function()
    {
    	if (disp.textContent !== "")
        {
            convertCurrency(disp.textContent, 'JPY', 'USD');
        }
    });

    btn = document.getElementById('btn_EUR');
    btn.addEventListener('click', async function()
    {
    	if (disp.textContent !== "")
        {
            convertCurrency(disp.textContent, 'JPY', 'EUR');
        }
    });

    btn = document.getElementById('btn_CNY');
    btn.addEventListener('click', async function()
    {
    	if (disp.textContent !== "")
        {
            convertCurrency(disp.textContent, 'JPY', 'CNY');
        }
    });
    
    btn.addEventListener('click', async function()
    {
        let api_result_data = await getData();
        let dataset = api_result_data(5);
        alert(dataset.coordinates[0]);
        //document.getElementById('cat_img').src = api_result_data[0].url
    });


});

function getFirst(val) 
{
    if (val == 0)
    {
        return "";
    } else
    {
        return val;
    }
} 

function setMaxLength(va1)
{
    /*
    if (("" + va1).length >= 12)
    {
        alert(substr(("" + va1) , 0, 11));
        va1 = substr(("" + va1) , 0, 11);
    }
        */
    
    //return substr("" + va1,0,5);
    //return ("" + val).substring(0, 11);
    //return String(val).slice(0, 11);
    let a = val.toString().substring(0, 11);
    //return val.toString().substring(0, 11);
    return a;
}

function canCalc(val1,val2)
{
    let retPar
    if(val1 < 0)
    {
        retPar = "(" + val1 + ")";
    }else
    {
        retPar = val1;
    }

    retPar = val1 + val2;
    
    return retPar;
}

/* 外貨変換API */
async function convertCurrency(amount, fromCurrency, toCurrency) {
    const apiKey = 'cb5ad9a9d9df97b4afce19f3'; 
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('ネットワーク応答が正常ではありません');
        
        const data = await response.json();
        
        if (data.result === 'success') {
            alert(`${amount} ${fromCurrency} は ${data.conversion_result} ${toCurrency} です`);
            return data.conversion_result;
        } else {
            console.error('APIエラー:', data['error-type']);
        }
    } catch (error) {
        console.error('フェッチエラー:', error);
    }
}