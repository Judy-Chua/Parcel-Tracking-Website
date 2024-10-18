const mongoose = require('mongoose')

const UpdateSchema = new mongoose.Schema({
    updateId : Number,
    status : {
        type: String,
        enum: ["PENDING", "PROCESSING", "DELIVERING", "FINISHED"],
        default: "PENDING",
    },
    statusDesc : String,
    updateDate : String,        //format: dd-mm-yyyy
    updateTime : String,        //format: hh:mm:ss am/pm
})

const Update = mongoose.model('Update', UpdateSchema)

module.exports = Update