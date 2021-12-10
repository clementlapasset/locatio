const mongoose = require('mongoose')

const documentSchema = mongoose.Schema({
    type: String,
    title: String,
    date: Date,
    url: String,
    propertyId: {type: mongoose.Schema.Types.ObjectId, ref: 'properties'}
})

const documentModel = mongoose.model('documents', documentSchema)

module.exports = documentModel