const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    employeeId: String,
    password: String,
    hubName: String
})

const User = mongoose.model('User', UserSchema)

module.exports = User