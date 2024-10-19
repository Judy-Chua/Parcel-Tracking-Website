const mongoose = require('mongoose')

const UpdateSchema = new mongoose.Schema({
    updateId : Number,
    status : {
        type: String,
        enum: ["PROCESSING", "IN TRANSIT", "READY FOR PICKUP", "DELIVERED"],
        default: "PROCESSING",
    },
    statusDesc : String,
    updateDate : String,        //format: mm-dd-yyyy
    updateTime : String,        //format: hh:mm:ss am/pm
})

const Update = mongoose.model('Update', UpdateSchema)

module.exports = Update