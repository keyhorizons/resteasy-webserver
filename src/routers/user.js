const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/user', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send({ user })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send({ user })
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/user/me', auth, async (req, res) => {
    res.send(req.user)
})

router.post('/user/logout', auth, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        console.log(user)

        if (!user) {
            throw new Error('Unable to logout')
        }
        user.isLoggedIn = false
        await user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router