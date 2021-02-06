const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')
const vendorRouter = require('./routers/vendor')
const dishRouter = require('./routers/dish')
const cartRouter = require('./routers/cart')
const orderRouter = require('./routers/order')

const app = express()
const port = process.env.PORT

//configure Express to automatically parse incoming JSON to an object
app.use(express.json())

app.use(userRouter)
app.use(productRouter)
app.use(vendorRouter)
app.use(dishRouter)
app.use(cartRouter)
app.use(orderRouter)

module.exports = app