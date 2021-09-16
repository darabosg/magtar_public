const User = require('../models/user.model')

const authUser = async email => {
    const user = await User.findOne({ email })
    return user
}

const getAllUsers = async () => {
    const users = User.find({ hidden: false }).select('email')
    return users
}

const addUser = async email => {
    console.log(email)
    await User.init()
    try {
        const newUser = await User.create({ email: email })
        console.log(newUser)
        return newUser
    } catch (err) {
        return err
    }
}

const deleteUser = async _id => {
    const deleted = await User.deleteOne({ _id: _id })
    console.log(deleted)
    return deleted
}

module.exports = { authUser, getAllUsers, addUser, deleteUser }
