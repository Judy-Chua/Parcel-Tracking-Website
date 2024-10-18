const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    //user inputs
    orderId : String,
    senderName : String,
    receiverName : String,
    senderNum : Number,
    receiverNum : Number,
    itemDesc : [],
    itemNum : [],
    transDate : String,         //date of transport
            //format: dd-mm-yyyy
    originBranch : String,
    destBranch : String,         //destination branch
    total : Number,

    //to be updated / automatic assignment
    arrivalDate : String,       //estimated
    updatedBy : String,         //hub name
    updates : []                //add updateIds here
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order