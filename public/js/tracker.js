//$('#elementId');
//$('.className');

$(document).ready(function() {
    $('#submitTracker').click(function(e) {
        e.preventDefault();
        checkTrackerID();
    });

});

/*  validates the tracker ID inputted by the user
    returns true if it is VALID; otherwise, false
*/
function checkTrackerID() {
    const id = $('#trackingNumber').val().trim();
    var idData = {
        id: id
    }

    $.post('/search_parcel', idData, function(message, status) {
        console.log("response data: ", message, status);
        if (message.exists) {
            $('#trackingNumber').val("");
            window.location.href = "/search_parcel/track=" + id;
        } else {    
            $('#popup').show();        
            setTimeout(function() {
                $('#popup').hide();
            }, 3000);
        }
    });
}