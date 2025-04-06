// insert introductions
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname !== "/introduction.html") {
        console.error("ページが異なるためintroductionを読み込みませんでした。");
        popup();
        return;
    }

    let introList = {
        // Solubility and Dissolution Rate
        SaDR: {
            link: "/insert_data/introductions/Solubility_and_Dissolution_Rate.html",
            originID: "#SaDR",
            recipient: "SolubilityAndDissolutionRate"
        },
        // Supramolecular Complex of Cyclodextrins
        SCoC: {
            link: "/insert_data/introductions/Supramolecular_Complex_of_Cyclodextrins.html",
            originID: "#SCoC",
            recipient: "SupramolecularComplexOfCyclodextrins"
        },
        // Membranes and Active Oxygens
        MaAO: {
            link: "/insert_data/introductions/Membranes_and_Active_Oxygens.html",
            originID: "#MaAO",
            recipient: "MembranesAndActiveOxygens"
        },
        // Proteins and Amyloids
        PaA: {
            link: "/insert_data/introductions/Proteins_and_Amyloids.html",
            originID: "#PaA",
            recipient: "ProteinsAndAmyloids"
        }
    }
    // const fetchPromises = 
    Object.values(introList).forEach(item => {
        fetch(item.link)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const dataElement = doc.querySelector(item.originID);
                document.getElementById(item.recipient).appendChild(dataElement);
                popup();
            })
            .catch(error => {
                console.error(`エラー: ${item.link} の取得に失敗しました。`, error);
            });
    });

    // Promise.all(fetchPromises)
    //     .then(()=> {
    //         popup();
    //     });
});

// popup
function popup() {
    const popups = document.querySelectorAll(".popup");
    if (popups.length === 0) {
        console.error("エラー: popupが見つかりませんでした。");
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
            };

            window.onclick = function (event) {
                // popup-contentが一番前に来ているのでpopup == 背景
                if (event.target == popup) {
                    popup.style.display = "none";
                    stopAudioAndVideo(popup);
                }
            };
        });
    });
    function stopAudioAndVideo(popup) {
        const audioAndVideos = popup.querySelectorAll("audio, video");
        audioAndVideos.forEach(audioAndVideo => {
            audioAndVideo.pause();
            audioAndVideo.currentTime = 0;
        });
    }
};