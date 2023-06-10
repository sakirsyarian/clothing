'use strict'

const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')

router.get('/users', UserController.userFindAll)
router.post('/register', UserController.userCreate)

module.exports = router