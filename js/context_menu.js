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
            console.log(response.url);
        }).fail(function (response, textStatus, errorThrown) {
            if(response.status > 0) {
                switch (response.status) {
                    case 422:
                        // url was not set
                        console.error('no URL to image');
                        break;

                    default:
                    case 500:
                        // server internal error
                        console.error('Internal server error');
                        break;
                }
            } else {
                // have a timeout or server are not available
                console.error('iShark-Server is not available');
            }
        });
    }

}
