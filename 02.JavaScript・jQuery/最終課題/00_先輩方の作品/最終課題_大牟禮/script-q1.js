// HTMLが読込完了後に動作するイベントとして定義
document.addEventListener('DOMContentLoaded', function()
{
    const selArea = document.getElementById('sel_1');
    const selPref = document.getElementById('sel_2');
    const selLine = document.getElementById('sel_3');
    const selStat = document.getElementById('sel_4');

    // セレクトボックスを初期化する関数
    function resetSelects(elements) {
        elements.forEach(el => {
            let label = "";
            if (el === selPref) label = "都道府県";
            else if (el === selLine) label = "路線";
            else if (el === selStat) label = "駅";
            
            el.innerHTML = `<option value="">${label}を選択してください</option>`;
            el.disabled = true;
        });
    }

    // エリア一覧を取得
    async function fetchAreas() {
            const url = 'https://express.heartrails.com/api/json?method=getAreas';
            const response = await fetch(url);
            const data = await response.json();
            const areas = data.response.area;
            areas.forEach(area => {
                selArea.appendChild(new Option(area, area));
            });

    }

    // セレクトボックス初期化
    resetSelects([selPref, selLine, selStat]);

    // エリア選択時の処理
    selArea.addEventListener('change', async () => {
        const selectedArea = selArea.value;
        resetSelects([selPref, selLine, selStat]);
        
        if (!selectedArea) return;

            const url = `https://express.heartrails.com/api/json?method=getPrefectures&area=${encodeURIComponent(selectedArea)}`;
            const response = await fetch(url);
            const data = await response.json();
            data.response.prefecture.forEach(pref => {
                selPref.appendChild(new Option(pref, pref));
            });
            selPref.disabled = false;

    });

    // 都道府県選択時の処理
    selPref.addEventListener('change', async () => {
        const selectedPref = selPref.value;
        resetSelects([selLine, selStat]);

        if (!selectedPref) return;

            const url = `https://express.heartrails.com/api/json?method=getLines&prefecture=${encodeURIComponent(selectedPref)}`;
            const response = await fetch(url);
            const data = await response.json();
            data.response.line.forEach(line => {
                selLine.appendChild(new Option(line, line));
            });
            selLine.disabled = false;
    });

    // 路線選択時の処理
    selLine.addEventListener('change', async () => {
        const selectedPref = selPref.value;
        const selectedLine = selLine.value;
        resetSelects([selStat]);

        if (!selectedLine) return;
        
            const url = `https://express.heartrails.com/api/json?method=getStations&prefecture=${encodeURIComponent(selectedPref)}&line=${encodeURIComponent(selectedLine)}`;
            const response = await fetch(url);
            const data = await response.json();
            const stations = data.response.station;

            stations.forEach(st => {
                const option = new Option(st.name, st.name);
                // 緯度・経度をoptionタグに設定
                option.dataset.lat = st.y; // 緯度
                option.dataset.lng = st.x; // 経度
                selStat.appendChild(option);
            });

            selStat.disabled = false;
    });

    // 実行
    fetchAreas();

    const btn = document.getElementById('ft_btn');
    const resultTable = document.getElementById('result');

    btn.addEventListener('click', function() {
        // 選択されている項目のチェック
        if (!selStat.value) {
            alert("駅まで選択してください");
            return;
        }

        // 選択された駅の緯度・経度を取得
        const selectedOption = selStat.options[selStat.selectedIndex];
        const lat = selectedOption.dataset.lat;
        const lng = selectedOption.dataset.lng;

        // --- テーブル行の作成 ---
        const newRow = resultTable.insertRow(); // tbodyの末尾に行を追加

        // 各セルを作成して値をセット
        newRow.insertCell(0).textContent = selPref.value;   // 都道府県
        newRow.insertCell(1).textContent = selLine.value;   // 路線
        // newRow.insertCell(2).textContent = selStat.value;   // 駅
        const cellStation = newRow.insertCell(2);
        const mapLink = document.createElement('a');
        // Google Maps 検索用URLを作成
        mapLink.href = `https://www.google.com/maps?q=${lat},${lng}`;
        // 別タブで開く
        mapLink.target = "_blank"; 
        mapLink.textContent = selStat.value;
        cellStation.appendChild(mapLink);
        // 緯度
        newRow.insertCell(3).textContent = lat;
        // 経度
        newRow.insertCell(4).textContent = lng;

    });

    // テーブル初期化用の処理
    const clearBtn = document.getElementById('ft_btn2');
    
    clearBtn.addEventListener('click', function() {
        if (resultTable.rows.length === 0) {
            return; // 行がない場合は何もしない
        }

        if (confirm("表示されている結果をすべて削除しますか？")) {
            // tbodyの中身を空にする
            resultTable.innerHTML = '';
        }
    });
});