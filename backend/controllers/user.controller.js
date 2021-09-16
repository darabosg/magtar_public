const UserService = require('../services/user.service')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const asyncHandler = require('express-async-handler')

const checkUserEmail = asyncHandler(async (email, res) => {
    const user = await UserService.authUser(email)
    if (!user) {
        res.status(403).json({
            msg: 'Not authorized',
        })
    } else {
        const toJwt = { SUB: user._id, email: user.email }
        jwt.sign(
            toJwt,
            process.env.JWT_SECRET,
            { expiresIn: '16h' },
            (err, token) => res.json({ token })
        )
    }
})

const apiAuthUser = asyncHandler(async (req, res) => {
    const code = req.body.code
    axios
        .post(
            'https://oauth2.googleapis.com/token',
            new URLSearchParams({
                code: code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_SECRET,
                redirect_uri: process.env.LOGIN_REDIRECT,
                grant_type: 'authorization_code',
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
        .then(resp => {
            const token = resp.data.id_token
            const { email } = jwt.decode(token)
            checkUserEmail(email, res)
        })
        .catch(error => {
            console.log(error)
            res.status(404).json({
                msg: 'Authentication failed!',
            })
        })
})

const apiGetAllUsers = asyncHandler(async (req, res) => {
    const users = await UserService.getAllUsers()
    res.json(users)
})

const apiAddUser = asyncHandler(async (req, res, next) => {
    const email = req.body.email
    const added = await UserService.addUser(email)
    if (added.code === 11000) {
        // createError(401, 'Please login to view this page.')
        res.status(500).json({ msg: 'User already exists.' })
    } else {
        res.json(added)
    }
})

const apiDeleteUser = asyncHandler(async (req, res) => {
    const _id = req.body._id
    const response = await UserService.deleteUser(_id)
    if (response.ok === 1) {
        res.status(200).json({ msg: 'User deleted!' })
    } else {
        res.status(500).json({ msg: 'Something went wrong!' })
    }
})

module.exports = { apiAuthUser, apiGetAllUsers, apiAddUser, apiDeleteUser }
