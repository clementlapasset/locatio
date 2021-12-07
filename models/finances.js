const mongoose = require('mongoose')

const financeSchema = mongoose.Schema({
    type: String,
    montant: Number,
    description: String,
    dateDebut: Date,
    dateFin: Date,
    frequence: Number
})

const financeModel = mongoose.model('finances', financeSchema)

module.exports = financeModel