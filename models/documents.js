const mongoose = require('mongoose')

const documentSchema = mongoose.Schema({
    type: String,
    title: String,
    date: Date,
    url: String
})

const documentModel = mongoose.model('documents', documentSchema)

module.exports = documentModel