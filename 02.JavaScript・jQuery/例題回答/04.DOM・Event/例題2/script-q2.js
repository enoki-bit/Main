document.addEventListener('DOMContentLoaded', function()
{
    alert('HTMLの読み込みが完了しました');

    const txt_1 = document.getElementById('txt_1');
    const txt_2 = document.getElementById('txt_2');
    const sel_5 = document.getElementById('sel_5');
    const btn = document.getElementById('ft_btn');

    txt_1.addEventListener('blur', function()
    {
        alert('入力項目1からフォーカスが離れました');
    });

    txt_2.addEventListener('input', function()
    {
        if(this.value.substring(this.value.length - 1, this.value.length) === 'a')
        {
            alert('[a]が入力されました');
        }
    });

    // txt_2.addEventListener('keydown', function(e)
    // {
    //     if(e.ctrlKey || e.altKey || e.shiftKey)
    //     {
    //         return;
    //     }

    //     if(e.key === 'a')
    //     {
    //         alert('[a]が入力されました');
    //     }
    // });

    sel_5.addEventListener('change', function()
    {
        if(this.value !== '')
        {
            alert('入力項目5が選択されました');
        }
    });

    btn.addEventListener('click', function()
    {
        alert('ボタンがクリックされました');
    });
});
