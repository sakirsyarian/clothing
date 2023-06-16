'use strict'

const { Product } = require('../models')

class ProductController {
    static async productFindAll(req, res, next) {
        try {
            const product = await Product.findAll()

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
            console.log(error);
            next(error)
        }
    }

    static async productDestroy(req, res, next) {
        try {
            const { id } = req.params
            const product = await Product.destroy({ where: { id } })

            if (!product) throw {
                name: "NotFound",
                message: "Data not found"
            }

            res.status(200).json({
                status: "deleted",
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = ProductController