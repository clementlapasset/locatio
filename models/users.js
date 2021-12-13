const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    token: String,
    isLandlord: Boolean,
    adressLandlord: String,
    propertyId: {type: mongoose.Schema.Types.ObjectId, ref: 'properties'}
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel