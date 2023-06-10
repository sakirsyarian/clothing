'use strict'

const express = require('express')
const router = express.Router()

const userRoute = require('./userRoute')
const useProduct = require('./productRoute')

router.get('/', (req, res) => {
    res.status(200).json('Hello World!')
})

router.use(userRoute)
router.use('/products', useProduct)

module.exports = router