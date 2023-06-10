'use strict'

const { User } = require('../models')

class UserController {
    static async userFindAll(req, res) {
        const user = await User.findAll()
        res.status(200).json(user)
    }

    static async userCreate(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            await User.create({ username, email, password, RoleId: 1, phoneNumber, address })

            res.status(201).json({
                status: "created",
                data: {
                    username,
                    email,
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController