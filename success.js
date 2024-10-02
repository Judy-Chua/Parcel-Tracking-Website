$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var randomNumber = urlParams.get('randomNumber');
    if (randomNumber) {
        $('#controlID').html(randomNumber);
    }
});