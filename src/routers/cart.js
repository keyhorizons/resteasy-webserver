const express = require('express')
const User = require('../models/user')
const Product = require('../models/product')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/cart', auth, async (req, res) => {

    try {
        const product = await Product.findOne({ dishName: req.body.dishName, vendorName: req.body.vendorName })

        if (!product) {
            return res.status(404).send()
        }

        const quantity = req.body.quantity
        await req.user.addToCart(product, quantity)
        res.status(201).send(req.user.cart)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/cart', auth, async (req, res) => {
    try {
        if (req.user.cart.items.length === 0) {
            return res.send('Cart is empty!')
        }
        await req.user.populate('cart.items.productId').execPopulate()
        res.send(req.user.cart)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router