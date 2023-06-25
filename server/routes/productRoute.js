'use strict'

const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/productController')

router.get('/', ProductController.productFindAll)
router.post('/', ProductController.productCreate)
router.put('/:id', ProductController.productUpdate)
router.patch('/:id', ProductController.productPatch)
router.delete('/:id', ProductController.productDestroy)

module.exports = router