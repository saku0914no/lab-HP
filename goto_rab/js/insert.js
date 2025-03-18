// insert news
document.addEventListener("DOMContentLoaded", function() {
    fetch("/insert_data/index_news.json")
        // 取得したデータをjsonに変換
        .then(response => response.json())
        .then(data => {
            let list = document.getElementById("news");
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

                li.appendChild(document.createElement("br"));
                let link2 = document.createElement("span");
                link2.innerHTML = `<a href="${newsData.linkURL2}" class="link" target="_blank" \
                rel="noopener noreferrer">${newsData.linkText2}</a>`;
                li.appendChild(link2);

                // リストに追加
                list.appendChild(li);
            });
        })
        .catch(error => console.error('Error loading news :', error));
});

// publicationとかで使えるからおいとく

// document.addEventListener("DOMContentLoaded", function() {
//     fetch("/insert_data/index_news.json")
//         // 取得したデータをjsonに変換
//         .then(response => response.json())
//         .then(data => {
//             let list = document.getElementById("content");
//             data.papers.forEach(paper => {
//                 let li = document.createElement("li");

//                 // タイトル
//                 let title = document.createElement("strong");
//                 title.textContent = paper.title;
//                 li.appendChild(title);

//                 // 改行
//                 li.appendChild(document.createElement("br"));

//                 // 英語タイトル
//                 let titleEn = document.createElement("span");
//                 titleEn.textContent = paper.title_en;
//                 li.appendChild(titleEn);

//                 // 改行
//                 li.appendChild(document.createElement("br"));

//                 // 著者名
//                 let authors = document.createElement("span");
//                 authors.textContent = paper.authors;
//                 li.appendChild(authors);

//                 // 改行
//                 li.appendChild(document.createElement("br"));

//                 // 学会リンク
//                 let link = document.createElement("a");
//                 link.href = paper.conference.link;
//                 link.textContent = paper.conference.name;
//                 link.className = "link";
//                 link.target = "_blank";
//                 link.rel = "noopener noreferrer";
//                 li.appendChild(link);

//                 // 学会場所と年
//                 let location = document.createTextNode(" " + paper.location);
//                 li.appendChild(location);

//                 // リストに追加
//                 list.appendChild(li);
//             });
//         })
//         .catch(error => console.error('Error loading news :', error));
// });

// jsonの書き方⇓

// "title": "Soac法を用いた一重項酸素消去活性におけるカロテノイド類とクロシンの速度論的比較",
// "title_en": "Kinetic comparison of singlet oxygen quenching activity of carotenoids and crocin using the soac method",
// "authors": "棚田 怜央, 高塚 美和, 槌田 智裕, 後藤 了",
// "conference": {
//     "name": "日本化学会第105春季年会",
//     "link": "https://pub.confit.atlas.jp/ja/event/csj105th"
// },
// "location": "関西大学千里山キャンパス 2025"