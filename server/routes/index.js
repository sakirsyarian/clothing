const express = require('express')
const router = express.Router()

const userRoute = require('./userRoute')

router.get('/', (req, res) => {
    res.status(200).json('Hello World!')
})

router.use('/users', userRoute)

module.exports = router