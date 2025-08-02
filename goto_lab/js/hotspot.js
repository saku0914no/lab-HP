document.addEventListener('DOMContentLoaded', function () {
    // ホットスポットのクリックイベントを設定
    document.querySelectorAll('.hotspot').forEach(hotspot => {
        hotspot.addEventListener('click', function () {
            const aboutpopId = hotspot.dataset.aboutpop; // 対応するポップアップIDを取得
            const aboutpop = document.getElementById(aboutpopId);
            // 他のポップアップを非表示にする
            document.querySelectorAll('.aboutpop').forEach(p => p.classList.remove('active'));
            // 選択されたポップアップを表示
            aboutpop.classList.add('active');
            // オーバーレイを表示
            document.getElementById('overlay').style.display = 'block';
        });
    });

    // ポップアップ外をクリックで閉じる
    document.getElementById('overlay').addEventListener('click', function () {
        document.querySelectorAll('.aboutpop').forEach(aboutpop => aboutpop.classList.remove('active'));
        document.getElementById('overlay').style.display = 'none';
    });
});
