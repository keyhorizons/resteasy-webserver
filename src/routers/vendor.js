const express = require('express')
const Vendor = require('../models/vendor')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/vendor', auth, async (req, res) => {
    const vendor = new Vendor({
        ...req.body
    })

    try {
        await vendor.save()
        res.status(201).send(vendor)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /vendor?name=true
// router.get('/vendor', auth, async (req, res) => {
//     const match = {}
//     const sort = {}

// })


module.exports = router