function createContextMenu() {
    chrome.contextMenus.removeAll();
    chrome.contextMenus.create({'title': 'Upload to iShark', 'contexts': ['image', 'link']});
}
