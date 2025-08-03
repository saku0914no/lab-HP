// 検索ボタンがクリックされたときの処理
document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value;
    const orBlocks = searchTerm.split(/\s+or\s+|\s+OR\s+/).map(block => 
        block.split(/[\s　]+/).filter(term => term).map(term => term.toLowerCase())
    );
    searchInConference(orBlocks);
    searchInPublication(orBlocks);

    const searchResultsTitle = document.getElementById('searchResultsTitle');
    searchResultsTitle.textContent = `「${document.getElementById('searchInput').value}」の検索結果`;
    
    const searchResult = document.getElementById('searchResult');
    searchResult.style.display = 'block';
});

// Enterキーで検索ボタンを押す処理
document.getElementById('searchInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('searchButton').click();
    }
});

// 各データ検索
function searchInConference(orBlocks) {
    fetch('insert_data/conference/conference_now.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`htmlファイルの取得に失敗しました: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const items = doc.querySelectorAll('li');
            const title = document.getElementById('conferenceTitle');
            const results = document.getElementById('conferenceResults');
            results.innerHTML = '';

            let itemLength = 0;
            items.forEach(item => {
                const itemText = item.textContent.toLowerCase();
                if (checkOrAndMatch(itemText, orBlocks)) {
                    results.appendChild(item.cloneNode(true));
                    itemLength += 1;
                }
            });

            title.textContent = `学会発表: ${itemLength}件`;
        })
        .catch(err => console.error('データの読み込みに失敗しました - conference data:', err));
}

function searchInPublication(orBlocks) {
    fetch('insert_data/publications/publication.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`htmlファイルの取得に失敗しました: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const items = doc.querySelectorAll('li');
            const title = document.getElementById('publicationTitle');
            const results = document.getElementById('publicationResults');
            results.innerHTML = '';

            let itemLength = 0;
            items.forEach(item => {
                const itemText = item.textContent.toLowerCase();
                if (checkOrAndMatch(itemText, orBlocks)) {
                    results.appendChild(item.cloneNode(true));
                    itemLength += 1;
                }
            });

            title.textContent = `論文: ${itemLength}件`;
        })
        .catch(err => console.error('データの読み込みに失敗しました - publication data:', err));
}
function checkOrAndMatch(itemText, orBlocks) {
    return orBlocks.some(andTerms => andTerms.every(term => itemText.includes(term)));
}

// 名簿クリックで検索
document.querySelectorAll('td[data-name]').forEach(cell => {
    cell.addEventListener('click', function() {
        const searchName = this.getAttribute('data-name');
        document.getElementById('searchInput').value = searchName;
        document.getElementById('searchButton').click();
    });
});
