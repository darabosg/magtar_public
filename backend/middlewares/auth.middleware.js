const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

module.exports = asyncHandler(async (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) return res.status(403).send({ msg: 'Access denied.' })
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
})
