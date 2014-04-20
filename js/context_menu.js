function createContextMenu() {
    chrome.contextMenus.removeAll();
    chrome.contextMenus.create({'title': 'Upload to iShark', 'contexts': ['image', 'link'], 'onclick': uploadToIshark});
}


function uploadToIshark(info, tab) {
    if(!getOriginalImgUrl()) {
        console.error('can not upload the image');
    } else {
        // 'upload' image to iShark
        $.ajax({
            url: 'http://ishark.dev/web/api/uploadURL',
            type: 'POST',
            timeout: 1000,
            data: {url: getOriginalImgUrl()}

        }).done(function (response) {
            setiSharkImgUrl(response.url);
            chrome.tabs.create({'url': chrome.extension.getURL('success.html'), 'active': true});
        }).fail(function (response, textStatus, errorThrown) {
            if(response.status > 0) {
                switch (response.status) {
                    case 422:
                        // url was not set
                        chrome.tabs.create({'url': chrome.extension.getURL('error/422.html'), 'active': true});
                        break;

                    default:
                    case 500:
                        // server internal error
                        chrome.tabs.create({'url': chrome.extension.getURL('error/500.html'), 'active': true});
                        break;
                }
            } else {
                // have a timeout or server are not available
                chrome.tabs.create({'url': chrome.extension.getURL('error/timeOut.html'), 'active': true});
            }
        });
    }

}
