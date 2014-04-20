var lastClickedElement = null;

/**
 * Sets a event listener on 'right-click' to the whole document.
 * And looking for an image tag in the clicked element.
 */
document.body.addEventListener('contextmenu',onRightClick);

/**
 * Click handler.
 * @param event
 */
function onRightClick(event) {
    lastClickedElement = event.target;
    var imgUrl = null;

    try {
        imgUrl = getUrlFromImg(lastClickedElement);
    } catch(error) {
        // is no image tag
        // find image tag.
        var img = $(lastClickedElement).find('img');
        if(img) {
            // has image tag
            try {
                imgUrl = getUrlFromImg(img);
            } catch(e) {
                // is no valid image tag
                console.error('clicked element is or has no image tag');
            }
        }
    }

    if(imgUrl) {
        if(isRelativPath(imgUrl)) {
            // have a relative path to image.
            // create a full url to image.
            imgUrl = getFullImageUrl(imgUrl);
        }
    }

    // send a message to the chrome extension with the full url to image.
    chrome.extension.sendMessage({imageUrl: imgUrl});
}

/**
 * Gets the url of an image tag.
 * @param img
 * @returns {*|jQuery}
 */
function getUrlFromImg(img) {
    if($(img).is('img')) {
        return $(img).attr('src');
    } else {
        throw "is no image tag";
    }
}

/**
 * Checks the given url.
 * If it is a relative or full url to an image.
 * @param imgUrl
 * @returns {boolean}
 */
function isRelativPath(imgUrl) {
    var pattern = /^([htps:])+([\/]){2}/;
    return !pattern.test(imgUrl);
}

/**
 * Creates and returns the full url to an image.
 * @param relativeUrl
 * @returns {string}
 */
function getFullImageUrl(relativeUrl) {
    var pattern = /^([\/]){1}/;
    var url = window.location.protocol + '//' +  window.location.host;
    if(!pattern.test(relativeUrl)) {
        // url has no beginning slash
        url += '/';
    }

    url += relativeUrl;
    return url;
}



