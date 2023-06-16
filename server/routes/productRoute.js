'use strict'

const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/productController')

router.get('/', ProductController.productFindAll)
router.post('/', ProductController.productCreate)
router.delete('/:id', ProductController.productDestroy)

module.exports = router