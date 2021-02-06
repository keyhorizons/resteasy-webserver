const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    items: [
        {
            product: {
                type: Object,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                validate(value) {
                    if (value <= 0) {
                        throw new Error('Quantity must be a positive number')
                    }
                }
            },
            totalPrice: {
                type: Number,
                required: true,
                default: function() {
                    return this.product.price * this.quantity
                }
            }
        }
    ],
    orderAmount: {
        type: Number
    },
    customerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    customerName: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order