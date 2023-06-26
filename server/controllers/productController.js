'use strict'

const { Category, Product, User, History } = require('../models')

class ProductController {
    static async historyFindAll(req, res, next) {
        try {
            const history = await History.findAll({ order: [['id', 'DESC']] })

            res.status(200).json({
                status: "ok",
                data: history
            })
        } catch (error) {
            next(error)
        }
    }

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
            const user = await User.findByPk(id)
            await History.create({
                name: product.name,
                description: `Product with id: ${product.id} created`,
                updatedBy: user.email
            })

            res.status(201).json({
                status: "created",
                data: product
            })
        } catch (error) {
            next(error)
        }
    }

    static async productUpdate(req, res, next) {
        try {
            const { id } = req.params
            const { id: userId } = req.user
            const { name, description, price, stock, image, status, CategoryId } = req.body

            const product = await Product.update(
                { name, description, price, stock, image, status, CategoryId },
                { where: { id }, returning: true, }
            )
            const user = await User.findByPk(userId)
            await History.create({
                name: product[1][0].name,
                description: `Product with id: ${product[1][0].id} updated`,
                updatedBy: user.email
            })

            res.status(200).json({
                status: "updated",
                data: product[1]
            })
        } catch (error) {
            next(error)
        }
    }

    static async productPatch(req, res, next) {
        try {
            const { id } = req.params
            const { status } = req.body
            const { id: userId } = req.user

            if (userId !== 1) throw {
                name: "AuthorizationError",
                message: "You are not authorized to access this source"
            }

            const getProduct = await Product.findByPk(id)
            const product = await Product.update({ status }, { where: { id }, returning: true, })
            const user = await User.findByPk(userId)
            await History.create({
                name: product[1][0].name,
                description: `Product status with id: ${product[1][0].id} has been updated from ${getProduct.status} into ${product[1][0].status}`,
                updatedBy: user.email
            })

            res.status(200).json({
                status: "updated",
                data: {
                    status: product[1][0].status
                }
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