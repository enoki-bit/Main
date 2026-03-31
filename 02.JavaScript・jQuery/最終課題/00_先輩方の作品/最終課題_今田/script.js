// HTMLの読み込みが完了したときに実行される//
document.addEventListener('DOMContentLoaded', () => {
let btn = document.getElementById('get-info');
let teamSelect = document.getElementById('team-select');
let display = document.getElementById('info-display');

btn.addEventListener('click', async () => {

    const selectedId = teamSelect.value;
    if (!selectedId) return;


    // 一旦カードを透明にして、読み込み感を出す//
    display.style.opacity = '0';
    display.style.transform = 'translateY(20px)';


    try {
        const response = await fetch('teams.json');
        const data = await response.json();
        const team = data.find(item => item.id === selectedId);


        if (team) {
            // 少し時間を置いてから表示（アニメーションのため）//
            setTimeout(() => {
                display.style.borderTop = `10px solid ${team.color}`;
                display.innerHTML = `
                    <h2>${team.name}</h2>
                    <p>🏟️ <strong>本拠地</strong><br>${team.stadium}</p>
                    <p>🧢 <strong>監督</strong><br>${team.manager}</p>
                `;
                // ふわっと表示させる//
                display.style.opacity = '1';
                display.style.transform = 'translateY(0)';
            }, 300);
        }
    } catch (error) {
        display.innerHTML = 'データの取得に失敗しました。';
        display.style.opacity = '1';
    }

});

});