const express = require('express')
const Dish = require('../models/dish')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/dish', auth, async (req, res) => {
    const dish = new Dish({
        ...req.body
    })

    try {
        await dish.save()
        res.status(201).send(dish)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /dish?
// GET /dish?name=Dosa
router.get('/dish', auth, async (req, res) => {
    const match ={}
    if (req.query.name) {
        match.name = req.query.name
    }

    try {
        const dishes = await Dish.find(match)
        res.send(dishes)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router