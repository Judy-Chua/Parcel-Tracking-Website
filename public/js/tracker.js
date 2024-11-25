//$('#elementId');
//$('.className');

$(document).ready(function() {
    $('#submitTracker').click(function(e) {
        e.preventDefault();
        checkTrackerID();
    });

    $('#close-btn').click(function(e) {
        e.preventDefault();
        $('#popup').fadeOut(300);
    })

    $('#searchBranch').on('input', function() {
        var branchName = $(this).val().toLowerCase();
        $('.branch').each(function() {
            var branchH3 = $(this).find('h3').text().toLowerCase();
            if (branchH3.includes(branchName)) {
                $(this).show(); // Show the matching branch
            } else {
                $(this).hide(); // Hide non-matching branches
            }
        });
    });
});

/*  validates the tracker ID inputted by the user
    returns true if it is VALID; otherwise, false
*/
function checkTrackerID() {
    const id = $('#trackingNumber').val().trim();
    var capitalize = id.slice(0, 3).toUpperCase() + id.slice(3);
    var idData = {
        id: capitalize
    }

    $.post('/search_parcel', idData, function(message, status) {
        if (message.exists) {
            $('#trackingNumber').val("");
            window.location.href = "/search_parcel/track=" + capitalize;
        } else {    
            $('#popup').show();    
            
            setTimeout(function() {
                if ($('#popup').is(':visible')) {
                    $('#popup').hide();
                }
            }, 10000);
        }
    });
}

function showBranch() {
    
}