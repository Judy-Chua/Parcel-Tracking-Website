//$('#elementId');
//$('.className');

$(document).ready(function() {
    removeErrorMsg(); //sets all error messages to blank
    setDateLimit(); //sets the limit of possible date to input

    //change color if user inputs something (red if empty)
    updateColor('#inputSender', 1); 
    updateColor('#inputSenderNum', 1); 
    checkNumber('#inputSenderNum', '#errorSenderNum');
    updateColor('#inputReceiver', 1);
    updateColor('#inputReceiverNum', 1); 
    checkNumber('#inputReceiverNum', '#errorReceiverNum');
    updateColor('#inputCharge', 1);
    updateColor('#inputDate', 1);
    updateColor('#inputBranch', 1);
    updateColor('#inputDestBranch', 1);

    //add button for item description in case more than one item
    $('#addItem').click(function() {
        var newItem = $('<div>' +
                            '<input type="text" placeholder="Item Description" class="inputItem">' +
                         '</div>'); //new item to be placed in moreItems
        $('#moreItems').append(newItem);
    });

    //error-handling for class (item description)
    $('#moreItems').on('input', '.inputItem', function() {
        if ($(this).val() != '') { 
            $(this).css('background-color', 'white');
            $(this).css('color', 'black');
        } else {
            $(this).css('background-color', 'red');
            $(this).css('color', 'white');
        }
    });


    //validates the order form when submit button is clicked
    $('#submitOrder').click(function() { 
        if (validateInput()) {
            //remove all inputs, save to database, confirm that
            addToDatabase();
            clear();
            $("#validate").html("Order will be saved to database.");
        }
    });

});

/*  validates all the required inputs by the user
    returns true if ALL is VALID; otherwise, false
*/
function validateInput() {
    const sender = $('#inputSender').val();
    const senderNum = $('#inputSenderNum').val();
    const receiver = $('#inputReceiver').val();
    const receiverNum = $('#inputReceiverNum').val();
    const charge = $('#inputCharge').val();
    const date = $('#inputDate').val();
    const branch = $('#inputBranch').val();
    const destBranch = $('#inputDestBranch').val();

    var noError = true;
    removeErrorMsg();

    if (checkEmpty(sender, "#inputSender")) { //sender
        $('#errorSender').html("Please input sender name.");
        noError = false;
    }

    if (checkEmpty(senderNum, "#inputSenderNum")) { //sender number
        $('#errorSenderNum').html("Please input sender number.");
        noError = false;
    }

    if (checkEmpty(receiver, "#inputReceiver")) { //receiver
        $('#errorReceiver').html("Please input receiver name.");
        noError = false;
    }

    if (checkEmpty(receiverNum, "#inputReceiverNum")) { //receiver number
        $('#errorReceiverNum').html("Please input receiver number.");
        noError = false;
    }

    $('.inputItem').each(function() {
        var description = $(this).val();
        if (!description) { //check if input is empty or not 
            $(this).css('background-color', 'red');
            $(this).css('color', 'white');
            $('#errorItem').html("Please input item description.");
            noError = false;
        } else { //reset in case it is originally empty
            $(this).css('background-color', 'white');
            $(this).css('color', 'black');
        }
    });

    if (checkEmpty(charge, "#inputCharge")) { //charge
        $('#errorCharge').html("Please input charge."); //add functionality for negative
        noError = false;
    }

    if (checkEmpty(date, "#inputDate")) { //estimated date of transport
        $('#errorDate').html("Please select a date.");
        noError = false;
    } else if (checkDate()) {
        noError = false;
    }

    if (checkEmpty(branch, "#inputBranch")) { //current branch
        $('#errorBranch').html("Please input your current branch.");
        noError = false;
    }

    if (checkEmpty(destBranch, "#inputDestBranch")) { //destination branch
        $('#errorDestBranch').html("Please input your destination branch.");
        noError = false;
    }

    return noError;
}

/*  starter pack of the website
    sets the date option limited to today onwards only
*/
function setDateLimit() {
    const today = new Date();
    today.setDate(today.getDate());
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const minDate = `${yyyy}-${mm}-${dd}`;
    
    $('#inputDate').attr('min', minDate);
}

/*  validates the date the user inputs manually
    sets the CSS color based on input
    sets error message with suggested date that can be input
    returns true if INVALID date; otherwise, false
*/
function checkDate() {
    const inputDate = new Date($('#inputDate').val());
    const today = new Date();
    today.setDate(today.getDate()); //today.setDate(today.getDate() + 2); if 2 days from now

    //get month/day/year of valid date
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var dd = String(today.getDate()).padStart(2, '0');
    var yyyy = today.getFullYear();
    var validDate = `${mm}/${dd}/${yyyy}`;
    
    if (inputDate < today) {
        $('#inputDate').css('background-color', 'red');
        $('#inputDate').css('color', 'white');
        $('#errorDate').html("Please select a VALID date. (" + validDate + " onwards)");
        return true;
    } else {
        $('#inputDate').css('background-color', 'white');
        $('#inputDate').css('color', 'black');
        $('#errorDate').html("<br/>");
        return false;
    }
}

/*  starter pack of the website
    sets all error messages to newline
*/
function removeErrorMsg() {
    $('#errorSender').html('<br/>');
    $('#errorSenderNum').html('<br/>');
    $('#errorReceiver').html('<br/>');
    $('#errorReceiverNum').html('<br/>');
    $('#errorItem').html('<br/>');
    $('#errorCharge').html('<br/>');
    $('#errorDate').html('<br/>');
    $('#errorBranch').html('<br/>');
    $('#errorDestBranch').html('<br/>');
}

/*  checks if user input is empty or not
    sets the CSS color based on input    
    returns true if EMPTY; otherwise, false
*/
function checkEmpty(value, id) {
    if (!value) { //check if input is empty or not 
        $(id).css('background-color', 'red');
        $(id).css('color', 'white');
        return true;
    } else { //reset in case it is originally empty
        $(id).css('background-color', 'white');
        $(id).css('color', 'black');
    }
    return false;
}

/*  dynamically checks if the user inputs or chooses something on the order form
    sets the color red if left blank; otherwise, white
    num can only be 1 or 2
        1 means text or number input
        2 means choice 
*/
function updateColor(id, num) {
    if (num == 1) {
        $(id).on('input', function() {
            if ($(id).val() != '') { 
                $(id).css('background-color', 'white');
                $(id).css('color', 'black');
            } else {
                $(id).css('background-color', 'red');
                $(id).css('color', 'white');
            }
        });
    } else if (num == 2) {
        if ($(id).val() != "") { 
            $(id).css('background-color', 'white');
            $(id).css('color', 'black');
        } else {
            $(id).css('background-color', 'red');
            $(id).css('color', 'white');
        }
    }
    
}

/*  dynamically checks if the user inputs numbers or not
    automatically clears the input field if there is non-number in the input
*/
function checkNumber(id) {
    $(id).on('input', function() {
        var value = $(id).val();
        value = value.replace(/[^0-9]/g, ''); // clear if not number
        $(id).val(value);
    });
}

function clear() {
    $('#inputSender').val('');
    $('#inputSenderNum').val('');
    $('#inputReceiver').val('');
    $('#inputReceiverNum').val();
    $('#inputItem').val('');
    $('#inputCharge').val('');
    $('#inputDate').val('');
    $('#inputBranch').val('');
    $('#inputDestBranch').val('');
    
    $('#moreItems').empty();
}

function addToDatabase() {
    const sender = $('#inputSender').val();
    const senderNum = $('#inputSenderNum').val();
    const receiver = $('#inputReceiver').val();
    const receiverNum = $('#inputReceiverNum').val();
    const charge = $('#inputCharge').val();
    const date = $('#inputDate').val();
    const branch = $('#inputBranch').val();
    const destBranch = $('#inputDestBranch').val();

    var allItems = [];
    $('.inputItem').each(function() {
        allItems.push($(this).val());
    });

    var [year, month, day] = date.split("-"); //date is yyyy-mm-dd
    var newDate = "" + month + "-" + day + "-" + year + "";

    var ID = generateTrackerID();

    var orderData = {
        orderId : ID,
        senderName : sender,
        receiverName : receiver,
        senderNum : senderNum,
        receiverNum : receiverNum,
        itemDesc : allItems,
        itemNum : [],               //will change
        transDate : newDate,
        originBranch : branch,
        destBranch : destBranch,
        total : charge,
        status : "PROCESSING",
        arrivalDate : "---",
        updates : []
    };

    $.post('/admin/add-order', orderData, function(message, status) {
        console.log("response data: ", message, status);
        if (message.success) {
            setTimeout(function() {
                window.location.href = "/admin/view-orders";
            }, 3000);
        } else {
            console.log("not success");
        }
    });
}

function generateTrackerID() {
    const randomize = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var trackID = '';
    
    for (var i = 0; i < 8; i++) {   // 8 characters
                        //find index, round down, random is numbers between 0 to 1
        trackID += randomize.charAt(Math.floor(Math.random() * randomize.length));
    }

    return trackID;
}