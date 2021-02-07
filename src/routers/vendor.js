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

// GET /vendor?
// GET /vendor?name=Adigas
router.get('/vendor', auth, async (req, res) => {
    const match ={}
    if (req.query.name) {
        match.name = req.query.name
    }

    try {
        const vendors = await Vendor.find(match)
        res.send(vendors)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router