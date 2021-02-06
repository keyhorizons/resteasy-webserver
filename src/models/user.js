const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        trim: true
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
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
                    required: true
                }    
            }
        ],
        cartAmount: {
            type: Number
        }
    }
}, {
    timestamps: true
})

userSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'customerId'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.cart
    delete userObject.isLoggedIn

    return userObject
}

userSchema.methods.addToCart = function (product, quantity) {
    const updatedCartItems = [...this.cart.items]

    updatedCartItems.push({
        productId: product._id,
        quantity: quantity,
        totalPrice: product.price * quantity
    })

    let amount = 0
    updatedCartItems.forEach(element => {
        amount = amount + element.totalPrice
    })

    const updatedCart = {
        items: updatedCartItems,
        cartAmount: amount
    }
    this.cart = updatedCart
    return this.save()
}

userSchema.methods.clearCart = function () {
    this.cart = {
        items: []
    }
    return this.save()
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email, password })

    if (!user) {
        throw new Error('Unable to login')
    }

    user.isLoggedIn = true
    await user.save() 
    const isLoggedIn =  user.isLoggedIn

    if (!isLoggedIn) {
        throw new Error('Unable to login')
    }

    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User