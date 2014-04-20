/**
 * Saves the original-URL to image into the local-storage.
 * @param imgUrl
 */
function setOriginalImgUrl(imgUrl) {
    if(!imgUrl) {
        return;
    }

    localStorage.setItem('originalImgUrl', imgUrl);
}

function getOriginalImgUrl() {
    return localStorage.getItem('originalImgUrl');
}

/**
 * Saves the iShark-URL to image into the local-storage.
 * @param imgUrl
 */
function setiSharkImgUrl(imgUrl) {
    if (!imgUrl) {
        return;
    }
    localStorage.setItem('isharkImgUrl', imgUrl);
}

function getiSharkImgUrl() {
   return localStorage.getItem('isharkImgUrl');;
}