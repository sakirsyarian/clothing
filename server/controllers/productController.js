'use strict'

const { Product, Category } = require('../models')

class ProductController {
    static async productFindAll(req, res, next) {
        try {
            const product = await Product.findAll({ include: [Category] })

            res.status(200).json({
                status: "ok",
                data: product
            })
        } catch (error) {
            next(error)
        }
    }

    static async productCreate(req, res, next) {
        try {
            const { id } = req.user
            const { name, description, price, stock, image, CategoryId } = req.body

            const product = await Product.create({ name, description, price, stock, image, CategoryId, UserId: id })

            res.status(201).json({
                status: "created",
                data: product
            })
        } catch (error) {
            next(error)
        }
    }

    static async productDestroy(req, res, next) {
        try {
            const { id } = req.params
            const userId = req.user.id

            const product = await Product.findByPk(id)
            if (!product) throw {
                name: "NotFound",
                message: "Data not found"
            }

            if (userId === 2 && product.UserId !== 2) throw {
                name: "AuthorizationError",
                message: "You are not authorized to access this source"
            }

            await Product.destroy({ where: { id } })

            res.status(200).json({
                status: "deleted",
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController