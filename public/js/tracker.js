//$('#elementId');
//$('.className');

$(document).ready(function() {
    updateColor('#trackingNumber', 1);
    console.log("ready");

    $('#submitTracker').click(function() {
        checkTrackerID();
    });

});

/*  validates the tracker ID inputted by the user
    returns true if it is VALID; otherwise, false
*/
function checkTrackerID() {
    const id = $('#trackingNumber').val();
    var idData = {
        id: id
    }

    if (checkEmpty(id, '#trackingNumber')) {
        $('#errorTracker').html("Please input a tracker ID.");
        return;
    } 

    $.post('/tracker/check-tracker', idData, function(message, status) {
        console.log("response data: ", message, status);
        if (message.exists) {
            console.log("why");
            $('#trackingNumber').val("");
            location.href = "/";
            //location.href = "/tracker/"+id;
        } else {
            $('#errorTracker').html("Invalid tracker ID.");
        }
    });
}