const { verifyToken } = require('../helpers/jwt')

const auth = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) throw {
            name: "AuthenticationError", message: "You must login first"
        }

        const decode = verifyToken(access_token)
        req.user = decode

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = auth