const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NKCProductsOrderSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})
const NKCProductsOrder = mongoose.model('NKCProductsOrder', NKCProductsOrderSchema)
module.exports = NKCProductsOrder