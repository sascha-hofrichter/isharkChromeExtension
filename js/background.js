document.addEventListener('DOMContentLoaded', function () {
    createContextMenu();

    chrome.runtime.onMessage.addListener(onMessage);
});

function onMessage(request, sender, sendResponse) {
    console.log('onMessage' , request.imageUrl);
}

