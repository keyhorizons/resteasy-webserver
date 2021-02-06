const mongoose = require('mongoose')

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    calories: {
        type: Number,
        default: 0,
        validate(value) {
            if (value <= 0) {
                throw new Error('Calories must be a positive number')
            }
        }
    }
})

const Dish = mongoose.model('Dish', dishSchema)

module.exports = Dish