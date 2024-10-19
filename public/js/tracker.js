//$('#elementId');
//$('.className');

$(document).ready(function() {
    updateColor('#trackingNumber', 1);

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

    if (checkEmpty(id, '#trackingNumber')) {
        $('#errorTracker').html("Please input a tracker ID.");
        return;
    } 

    $.post('/tracker', idData, function(message, status) {
        console.log("response data: ", message, status);
        if (message.exists) {
            $('#trackingNumber').val("");
            window.location.href = "/tracker/" + id;
            console.log("/tracker/" + id);
        } else {
            $('#errorTracker').html("The tracking ID is invalid or might have expired.");
            $('#errorTracker').css('background-color', 'red');
            $('#errorTracker').css('color', 'white');
        }
    });
}