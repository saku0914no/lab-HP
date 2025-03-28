// insert header and footer and nav
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

            // PCnavの固定処理
            const PCnavPosition = document.getElementById('PCnav');
            const PCnavOffset = PCnavPosition.offsetTop;
            window.addEventListener('scroll', function () {
                if (this.window.pageYOffset > PCnavOffset) {
                    PCnavPosition.classList.add('fitmenu');
                } else {
                    PCnavPosition.classList.remove('fitmenu');
                }
            });
        })
        .catch(error => console.error('Error loading header and footer :', error));
});

// jump page top
document.addEventListener("scroll", function () {
    const pageTopBtn = document.getElementById("page_top_btn");
    if (window.scrollY > 100) {
        pageTopBtn.style.display = "block";
    } else {
        pageTopBtn.style.display = "none";
    }
});
document.querySelector("#page_top_btn").addEventListener("click", function () {
    // scrollTo = スクロール位置の変更（scrollYはスクロール位置の取得で、操作はしない
    window.scrollTo({ top: 0, behavior: "smooth" });
})

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

document.addEventListener("DOMContentLoaded", function() {
    const popups = document.querySelectorAll(".popup");
    if (popups.length === 0){
        return;
    }
    const items = document.querySelectorAll(".item");

    items.forEach(item => {
        item.addEventListener("click", () => {
            const popupId = item.getAttribute("data-popup");
            const popup = document.getElementById(popupId);
            const closeBtn = popup.querySelector(".close");
            popup.style.display = "block";

            closeBtn.onclick = function () {
                popup.style.display = "none";
                stopAudioAndVideo(popup);
            }

            window.onclick = function(event) {
                // popup-contentが一番前に来ているのでpopup == 背景
                if (event.target == popup) {
                    popup.style.display = "none";
                    stopAudioAndVideo(popup);
                }
            }
            
        });
    });
    function stopAudioAndVideo(popup) {
        const audioAndVideos = popup.querySelectorAll("audio, video");
        audioAndVideos.forEach(audioAndVideo => {
            audioAndVideo.pause();
            audioAndVideo.currentTime = 0;
        });
    }
});