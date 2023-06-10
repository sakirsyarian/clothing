'use strict'

const errorHandler = (err, req, res, next) => {
    const statusCode = (code, message) => {
        return res.status(code).json(message)
    }

    if (err.name === 'SequelizeValidationError') {
        const msg = err.errors.map(el => el.message)
        return statusCode(400, { message: msg })
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        const msg = err.errors.map(el => el.message)
        return statusCode(400, { message: msg })
    }

    return res.status(500).json(err)
    // return statusCode(500, { message: "Internal server error" })
}

module.exports = errorHandler