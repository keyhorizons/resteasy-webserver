const mongoose = require('mongoose')
const Dish = require('./dish')
const Vendor = require('./vendor')

const productSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: true,
        trim: true
    },
    vendorName: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        validate(value) {
            if (value <= 0) {
                throw new Error('Price must be a positive number')
            }
        }
    }
})

productSchema.pre('save', async function (next) {
    const product = this

    const dish = await Dish.findOne({ name: product.dishName })

    if (!dish) {
        next('Dish name does not exist. Add the dish name to the Dishes list.')
        //throw new Error('Dish name does not exist. Add the dish name to the Dishes list.')
    }

    const vendor = await Vendor.findOne({ name: product.vendorName })

    if (!vendor) {
        next('Vendor name does not exist. Add the vendor name to the Vendors list.')
    }

    next()
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product