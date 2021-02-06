const express = require('express')
const Product = require('../models/product')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/product', auth, async (req, res) => {
    const product = new Product({
        ...req.body
    })

    try {
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /product?sortBy=price:desc
// GET /product?dish=Dosa
// GET /product?vendor=Adigas
router.get('/product', auth, async (req, res) => {
    const match ={}
    if (req.query.dish) {
        match.dishName = req.query.dish
    }
    if (req.query.vendor) {
        match.vendorName = req.query.vendor
    }

    const sort = {}

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1]
    }

    try {
        const products = await Product.find(match).sort(sort)
        res.send(products)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router