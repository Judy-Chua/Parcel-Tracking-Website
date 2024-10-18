const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    employeeId: Number,
    password: String,
    hubName: String
})

const User = mongoose.model('User', UserSchema)

module.exports = User