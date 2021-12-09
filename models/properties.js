const mongoose = require('mongoose')

const propertySchema = mongoose.Schema({
    propertyAddress: String,
    surface: Number,
    numberRooms: Number,
    landlordId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
})

const propertyModel = mongoose.model('properties', propertySchema)

module.exports = propertyModel