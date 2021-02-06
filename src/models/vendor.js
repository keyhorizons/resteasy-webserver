const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    }
})

const Vendor = mongoose.model('Vendor', vendorSchema)

module.exports = Vendor