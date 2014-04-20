document.addEventListener('DOMContentLoaded', function () {
    createContextMenu();

    chrome.runtime.onMessage.addListener(onMessage);
});

function onMessage(request, sender, sendResponse) {
    // save image url into the local storage
    setOriginalImgUrl(encodeURIComponent(request.imageUrl));
}

