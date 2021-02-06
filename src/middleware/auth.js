const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const email_token = req.header('Set-Cookie')
        const email = email_token[0].split('=')[1].trim()
        const user = await User.findOne({ email, isLoggedIn: true })

        if (!user) {
            throw new Error()
        }

        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth