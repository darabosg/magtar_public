module.exports = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json({ msg: err.message })
    } else {
        if (err.message === 'jwt expired') {
            res.status(400).json({msg: err.message})
        } else {
            res.status(500).json({ msg: 'Internal Server Error' })
        }
    }
}
