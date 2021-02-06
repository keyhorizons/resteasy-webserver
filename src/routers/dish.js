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

// GET /tasks?name=
// GET /tasks?sortBy=price:desc
// router.get('/dish', auth, async (req, res) => {
//     const match = {}
//     const sort = {}

// })


module.exports = router