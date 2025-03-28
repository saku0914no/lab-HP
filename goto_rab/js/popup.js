// popup
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