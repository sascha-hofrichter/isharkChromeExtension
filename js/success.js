$(document).ready( function () {
    $('#preview').css('background-image', 'url("' + getiSharkImgUrl() + '")');
    $('#urlInp').val(getiSharkImgUrl());
    $('#urlInp').click( function (event) {
        this.select();
    });
});
