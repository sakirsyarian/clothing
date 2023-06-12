'use strict'

const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')

router.get('/users', UserController.userFindAll)
router.post('/register', UserController.userCreate)
router.post('/login', UserController.userFindOne)

module.exports = router