//$('#elementId');
//$('.className');

$(document).ready(function() {
    setDateLimit(); //sets the limit of possible date to input

    //add button for item description in case more than one item
    $('#add-btn').click( async function(e) {
        e.preventDefault();
        var newItem = 
            $("<div class='add-item-container'>" + 
                "<div>" +
                    "<input type='number' min='1' class='qty-input' placeholder='Qty.' required><br>" +
                "</div>" +
                "<div>" +
                    "<input type='text' class='desc-input' placeholder='Item Description' required>" +
                    "<br>" +
                "</div>" +
                "<div>" +
                    "<input type='number' class='cost-input' min='1' placeholder='Cost' required>" +
                "</div>" +
                "<div id='x-button-div'>" +
                    "<img src='/img/x-circle-fill.svg' class='x-button' /><br>" +
                "</div>" +
            "</div>"); //new item to be placed in items-div
        $('#items-div').append(newItem);
        $('#charge-calc').text('');
        $('#total-calc').text('');
    });

    //removes the specific item based on x button
    $('#items-div').on('click', '.x-button', function () {
        $(this).closest('.add-item-container').remove();
        updateCharge();
    });

    //updates the charge based on quantity and cost, including discount
    $('#items-div').on('input', '.qty-input, .desc-input, .cost-input', function() {
        updateCharge();
    });

    $('#discount-input').on('input', function () {
        var final = 0;
        var charge = 0;
        var discount = 0;
        var filled = true;
        const inputCharge = $('#charge-calc').text();
        const inputDiscount = $('#discount-input').val();

        if (inputCharge === '') {
            filled = false;
        } else {
            charge = parseFloat(inputCharge);
        }

        if (inputDiscount !== '') {
            discount = parseFloat(inputDiscount);
            if (discount > charge) {
                $('#discount-input').val('');
                discount = 0;
            }
        }
        final = charge - discount;

        if (filled) {
            $('#total-calc').text(final.toFixed(2));
        } else {  // Clear display
            $('#total-calc').text('');
        }
    });

    //validates the order form when submit button is clicked
    $('#submit-btn').click(async function(e) {
        e.preventDefault(); 
        if (validateInput(1)) {
            //remove all inputs, save to database, confirm that
            await addToDatabase();
            clear();
        }
    });

    //clears all input then go back to view order
    $('#cancel-btn').click(function() { 
        clear();
        setTimeout(function() {
            window.location.href = "/admin/view-orders";
        }, 1000);
    });

    //validates the order form when submit button is clicked
    $('#save-btn').click(function(e) {
        e.preventDefault(); 
        if (validateInput(2)) {
            //remove all inputs, save to database, confirm that
            updateDatabase();
            clear();
        }
    });
});

/*  validates all the required inputs by the user
    returns true if ALL is VALID; otherwise, false
*/
function validateInput(type) { //discount is optional
    const sender = $('#inputSender').val();
    const senderNum = $('#inputSenderNum').val();
    const receiver = $('#inputReceiver').val();
    const receiverNum = $('#inputReceiverNum').val();
    const date = $('#inputDate').val();
    const branch = $('#inputBranch').val();
    const destBranch = $('#inputDestBranch').val();

    var noError = true;

    if (checkEmpty(sender) || checkEmpty(senderNum) ||      //sender and sender num
        checkEmpty(receiver) || checkEmpty(receiverNum) ||  //receiver and receiver number
        checkEmpty(date) ||                                   //estimated date of transport
        checkEmpty(branch) || checkEmpty(destBranch)) {      //current branch and destination branch
        noError = false;
    }

    if (type == 1 && checkDate()) {
        noError = false;
    }

    $('.qty-input').each(function() {  //each quantity
        var qty = $(this).val();
        if (!qty) { //check if input is empty or not 
            noError = false;
        }
    });

    $('.desc-input').each(function() {  //each description
        var desc = $(this).val();
        if (!desc) { //check if input is empty or not 
            noError = false;
        }
    });

    $('.cost-input').each(function() {  //each cost
        var cost = $(this).val();
        if (!cost) { //check if input is empty or not 
            noError = false;
        }
    });

    console.log(noError);

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
    returns true and clears input if INVALID date; otherwise, false
*/
function checkDate() {
    const inputDate = new Date($('#inputDate').val());
    const today = new Date();
    today.setDate(today.getDate()); //today.setDate(today.getDate() + 2); if 2 days from now
    
    if (inputDate < today) {
        $('#errorDate').val('');
        return true;
    }
    return false;
}

/*  checks if user input is empty or not
    returns true if EMPTY; otherwise, false
*/
function checkEmpty(value) {
    console.log(value);
    if (value === "" || value === null) 
        return true;
    return false;
}

function clear() {
    $('#inputSender').val('');
    $('#inputSenderNum').val();
    $('#inputReceiver').val('');
    $('#inputReceiverNum').val('');
    
    $('.qty-input').val('');
    $('.desc-input').val('');
    $('.cost-input').val('');
    $('#items-div .add-item-container').remove();

    $('#discount-input').val('');
    $('#inputDate').val('');
    $('#inputBranch').val('');
    $('#inputDestBranch').val('');
}

function updateCharge() {
    var totalCharge = 0;
    var discount = 0;
    var finalCharge = 0;
    var filled = true;

    // Loop through each item container
    $('.item-container').each(function() {
        const qty = $(this).find('.qty-input').val();
        const desc = $(this).find('.desc-input').val();
        const cost = $(this).find('.cost-input').val();

        if (qty === '' || cost === '' || desc === '') {    // If either one is blank, stop
            filled = false;
            return false; // Stop the loop
        }

        // Add to totals after converting to float
        var quantity = parseFloat(qty, 10);
        var charge = parseFloat(cost, 10);
        totalCharge += quantity * charge;
    });

    if ($('.add-item-container').length > 0) {  //check if this exists
        $('.add-item-container').each(function() {
            const qty = $(this).find('.qty-input').val();
            const desc = $(this).find('.desc-input').val();
            const cost = $(this).find('.cost-input').val();

            if (qty === '' || cost === '' || desc === '') {    // If either one is blank, stop
                filled = false;
                return false; // Stop the loop
            }

            // Add to totals after converting to float
            var quantity = parseFloat(qty, 10);
            var charge = parseFloat(cost, 10);
            totalCharge += quantity * charge;
        });
    }

    const inputDiscount = $('#discount-input').val();
    if (inputDiscount !== '') {
        discount = parseFloat(inputDiscount);
    }
    finalCharge = totalCharge - discount;

    // Update display
    if (filled) {
        $('#charge-calc').text(totalCharge.toFixed(2)); //2 decimal places
        $('#total-calc').text(finalCharge.toFixed(2));
    } else {  // Clear display
        $('#charge-calc').text('');
        $('#total-calc').text('');
    }
}

async function addToDatabase() {
    try {
        const ID = await generateTrackerID();
        const sender = $('#inputSender').val();
        const senderNum = parseInt($('#inputSenderNum').val().replace(/\s+/g, ''), 10);
        const receiver = $('#inputReceiver').val();
        const receiverNum = parseInt($('#inputReceiverNum').val().replace(/\s+/g, ''), 10);
        
        const date = $('#inputDate').val();
        const branch = $('#inputBranch').val();
        const destBranch = $('#inputDestBranch').val();

        const initial = parseFloat($('#charge-calc').text());
        const discount = parseFloat($('#discount-input').val()) || 0;
        const charge = parseFloat($('#total-calc').text());

        var allQty = [];
        var allDesc = [];
        var allCost = [];

        $('.qty-input').each(function() {
            var num = parseInt($(this).val(), 10);
            allQty.push(num);
        });

        $('.desc-input').each(function() {
            allDesc.push($(this).val());
        });

        $('.cost-input').each(function() {
            var num = parseFloat($(this).val());
            allCost.push(num.toFixed(2));
        });

        var [year, month, day] = date.split("-"); //date is yyyy-mm-dd
        var newDate = "" + month + "-" + day + "-" + year + "";

        var orderData = {
            orderId : ID,
            senderName : sender,
            receiverName : receiver,
            senderNum : senderNum,
            receiverNum : receiverNum,

            itemNum : allQty,
            itemDesc : allDesc,
            itemPrice : allCost,

            transDate : newDate,
            originBranch : branch,
            destBranch : destBranch,

            initialCharge : initial,
            discount : discount,
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
                }, 2000);
            } else {
                console.log("not success");
            }
        });
    } catch (error) {
        console.error("Error in generating tracker ID:", error);
    }
}

function generateTrackerID() {    
    return new Promise((resolve, reject) => { //this is since there is loop in validating
        const dateInput = $('#inputDate').val();
        const date = new Date(dateInput);

        const constantDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const dayStr = constantDay[date.getDay()]; 

        const randomize = '0123456789';

        // Function to generate a random tracking ID and validate it
        function tryGenerate() {
            let trackID = dayStr;
            let number = '';
            for (let i = 0; i < 5; i++) {
                const randomNum = randomize[Math.floor(Math.random() * 10)];
                trackID += randomNum;
                number += randomNum;
            }

            // Validate the generated number
            $.post('/admin/validate', { number: number }, function(message, status) {
                if (message.success) {
                    resolve(trackID); // Resolve with the valid trackID
                } else {
                    tryGenerate(); // loop part
                }
            }).fail(function() {
                reject('Failed to validate'); // Reject 
            });
        }

        tryGenerate(); //call the function
    });
}

function updateDatabase() {
    const orderId = $('#orderId').val();
    const sender = $('#inputSender').val();
    const senderNum = parseInt($('#inputSenderNum').val().replace(/\s+/g, ''), 10);
    const receiver = $('#inputReceiver').val();
    const receiverNum = parseInt($('#inputReceiverNum').val().replace(/\s+/g, ''), 10);
    
    const date = $('#inputDate').val();
    const branch = $('#inputBranch').val();
    const destBranch = $('#inputDestBranch').val();

    const initial = parseFloat($('#charge-calc').text());
    const discount = parseFloat($('#discount-input').val()) || 0;
    const charge = parseFloat($('#total-calc').text());

    var allQty = [];
    var allDesc = [];
    var allCost = [];

    $('.qty-input').each(function() {
        var num = parseInt($(this).val(), 10);
        allQty.push(num);
    });

    $('.desc-input').each(function() {
        allDesc.push($(this).val());
    });

    $('.cost-input').each(function() {
        var num = parseFloat($(this).val());
        allCost.push(num.toFixed(2));
    });

    var [year, month, day] = date.split("-"); //date is yyyy-mm-dd
    var newDate = "" + month + "-" + day + "-" + year + "";

    var orderData = {
        orderId : orderId,
        senderName : sender,
        receiverName : receiver,
        senderNum : senderNum,
        receiverNum : receiverNum,

        itemNum : allQty,
        itemDesc : allDesc,
        itemPrice : allCost,

        transDate : newDate,
        originBranch : branch,
        destBranch : destBranch,

        initialCharge : initial,
        discount : discount,
        total : charge,
    };

    $.post('/admin/edit-order', orderData, function(message, status) {
        console.log("response data: ", message, status);
        if (message.success) {
            setTimeout(function() {
                window.location.href = "/admin/view-orders";
            }, 1500);
        } else {
            console.log("not success");
        }
    });
}



