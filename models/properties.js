const mongoose = require('mongoose')

const propertySchema = mongoose.Schema({
    propertyAddress: String,
    surface: Number,
    numberRooms: Number,
    landlordId: String
})

const propertyModel = mongoose.model('properties', propertySchema)

module.exports = propertyModel