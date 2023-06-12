'use strict'

const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

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

    static async userFindOne(req, res, next) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ where: { email } })
            if (!user) throw {
                name: "AuthenticationError",
                message: "Invalid email/ password"
            }

            const isValid = comparePassword(password, user.password)
            if (!isValid) throw {
                name: "AuthenticationError",
                message: "Invalid email/ password"
            }

            const access_token = generateToken({ id: user.id })

            res.status(200).json({
                status: "ok",
                access_token,
                data: user
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = UserController