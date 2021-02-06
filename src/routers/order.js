const express = require('express')
const User = require('../models/user')
const Product = require('../models/product')
const auth = require('../middleware/auth')
const router = new express.Router()
const Order = require('../models/order')

router.post('/order', auth, async (req, res) => {

    try {
        const user = await req.user.populate('cart.items.productId').execPopulate();

        const items = user.cart.items.map(i => {
            return { quantity: i.quantity, product: { ...i.productId._doc } };
        })

        const order = new Order({
            customerId: req.user._id,
            customerName: req.user.name,
            items: items,
            orderAmount: req.user.cart.cartAmount
        })
        await order.save()
        await req.user.clearCart()
        res.status(201).send(order)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /order?&sortByAmount=desc&sortByDate=desc
// GET /order?&sortByDate=asc
// GET /order?&sortByAmount=desc
router.get('/order', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.sortByAmount) {
        sort['orderAmount'] = req.query.sortByAmount
    }
    if (req.query.sortByDate) {
        sort['createdAt'] = req.query.sortByDate
    }

    try {
        await req.user.populate({
            path: 'orders',
            match,
            options: { sort }
        }).execPopulate()
        res.send(req.user.orders)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router