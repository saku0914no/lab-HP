// insert introductions
document.addEventListener("DOMContentLoaded", function () {
    // Solubility and Dissolution Rate
    let SaDRCHECK = document.getElementById("SolubilityAndDissolutionRate");
    if (SaDRCHECK === null) {
        console.error("エラー: SolubilityAndDissolutionRateがありません。");
        popup()
        return;
    }
    fetch("/insert_data/introductions/Solubility_and_Dissolution_Rate.html")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const SaDRData = doc.querySelector("#SaDR");
            document.getElementById("SolubilityAndDissolutionRate").appendChild(SaDRData);
            popup();
        });
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
            }

            window.onclick = function (event) {
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
}