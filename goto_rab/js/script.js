// insert header and footer
document.addEventListener("DOMContentLoaded", function () {
    fetch("/insert_data/header_and_footer.html")
        // 取得したデータを文字列に変換
        .then(response => response.text())
        // promiseでは前の結果が次の工程に渡される（ここのdataは前の結果を受け取っている引数）
        .then(data => {
            // new = 新しいインスタンスを作成, DOMParser = 文字列を解析するツール
            const parser = new DOMParser();
            // parseFromString = 文字列を解析してDOM（HTML）に変換する
            const doc = parser.parseFromString(data, 'text/html');

            // querySelector = 指定された要素の内「最初に見つかったひとつ」を取得
            // querySelectorAllなら指定された要素全てを取得
            // CSSセレクタを使って要素を取得するので、書き方はクラスなら.class、IDなら#ID
            const header = doc.querySelector('header');
            const humberger = doc.querySelector('#humberger');
            const PCnav = doc.querySelector('#PCnav');
            const footer = doc.querySelector('footer');

            // appendChild = 要素に子要素を追加
            document.getElementById('header').appendChild(header);
            document.getElementById('humberger').appendChild(humberger);
            document.getElementById('PCnav').appendChild(PCnav);
            document.getElementById('footer').appendChild(footer);

            // appendでデータの挿入は完了しているので、あとは普通にdocumentから取ってくる
            const openMenuBtn = document.getElementById('openMenuBtn');
            const closeMenuBtn = document.getElementById('closeMenuBtn');
            const sideNav = document.getElementById('sideNav');

            openMenuBtn.onclick = function () {
                sideNav.classList.add('open');
            };
            closeMenuBtn.onclick = function () {
                sideNav.classList.remove('open');
            };
            window.onclick = function (event) {
                if (
                    event.target !== sideNav &&
                    event.target !== openMenuBtn &&
                    !sideNav.contains(event.target)
                ) {
                    sideNav.classList.remove('open');
                }
            };

        })
        .catch(error => console.error('Error loading header and footer :', error));
});

// swiper
// https://qiita.com/TakahiRoyte/items/cdab6fca64da386a690b
document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".swiper", {
        // ループさせる
        loop: true,
        autoplay: {
            delay: 5000,
            // ユーザが触っても自動再生を止めない
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            // ページネーションをクリックできるように
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });

    // const swiper = new Swiper(".swiper");
});
