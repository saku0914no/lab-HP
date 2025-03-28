// insert news
document.addEventListener("DOMContentLoaded", function () {
    let N_list = document.getElementById("news");
    fetch("/insert_data/index-html/news.json")
        // 取得したデータをjsonに変換
        .then(response => response.json())
        .then(data => {
            data.newsList.forEach(newsData => {
                let li = document.createElement("li");

                // 日付
                let date = document.createElement("span");
                date.className = "news-date";
                date.textContent = newsData.date;
                li.appendChild(date);
                // 改行
                li.appendChild(document.createElement("br"));

                // 内容
                let newsContent = document.createElement("span");
                newsContent.innerHTML = `${newsData.newsContent} <a href="${newsData.linkURL}" \
                class="link" target="_blank" rel="noopener noreferrer">${newsData.linkText}</a> \
                ${newsData.newsContent2}`;
                li.appendChild(newsContent);
                if (newsData.linkText2 && newsData.linkURL2) {
                    li.appendChild(document.createElement("br"));
                    let link2 = document.createElement("span");
                    link2.innerHTML = `<a href="${newsData.linkURL2}" class="link" target="_blank" \
                        rel="noopener noreferrer">${newsData.linkText2}</a>`;
                    li.appendChild(link2);
                }

                // リストに追加
                N_list.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error loading news :', error);
            N_list.textContent = "データの読み込みに失敗しました。";
        });
});
// insert mark
document.addEventListener("DOMContentLoaded", function () {
    let M_list = document.getElementById("mark");
    fetch("/insert_data/index-html/mark.json")
        // 取得したデータをjsonに変換
        .then(response => response.json())
        .then(data => {
            // forEach コールバック関数を引数に取る(function(要素、インデックス、配列全体))
            data.markList.forEach((markData, index) => {
                let li = document.createElement("li");

                // title
                let title = document.createElement("h4");
                if (markData.titleLink) {
                    title.innerHTML = `<a href="${markData.titleLink}" \
                class="link" target="_blank" rel="noopener noreferrer">${markData.title}</a>`;
                } else {
                    title.textContent = markData.title;
                }
                li.appendChild(title);

                // 内容
                if (Array.isArray(markData.details)) {
                    markData.details.forEach((detail, index_D) => {
                        let span = document.createElement("span");
                        span.className = "mark-text";
                        span.textContent = detail;
                        li.appendChild(span);
                        if (index_D != markData.details.length - 1) {
                            li.appendChild(document.createElement("br"));
                        }
                    });
                }
                if (markData.linkText && markData.linkURL) {
                    li.appendChild(document.createElement("br"));
                    let link = document.createElement("span");
                    link.innerHTML = `<a href="${markData.linkURL}" class="link" target="_blank" \
                        rel="noopener noreferrer">${markData.linkText}</a>`;
                    li.appendChild(link);
                }

                // リストに追加
                M_list.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error loading mark :', error);
            M_list.textContent = "データの読み込みに失敗しました。";
        });
})