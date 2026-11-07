import User from '../models/user.js'
import ErrorHandler from '../utils/errorHandler.js'
import sendToken from '../utils/sendToken.js'
import jwt from 'jsonwebtoken'
import parseJWT from '../utils/parsejwt.js'


const registerUser = async (req, res, next) => {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return next(new ErrorHandler('Please provide all required fields', 400))
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        return next(new ErrorHandler('User already exists', 400))
    }

    const user = await User.create({
        username,
        email,
        password
    })

    sendToken(user, 201, res)
}

const loginUser = async (req, res, next) => {
    if (req.cookies.token) {
        return next(new ErrorHandler('User already logged in', 400))
    }
    const { email, username, password } = req.body
    var user = null
    if ((!email && !username) || !password) {
        return next(new ErrorHandler('Please provide all required fields', 400))
    }
    if (!username) {
        user = await User.findOne({ email }).select('+password')
    }
    else {
        user = await User.findOne({ username }).select('+password')
    }

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 200, res)
}

const logoutUser = async (req, res, next) => {


    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    })

    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    })
}

const getUserProfile = async (req, res, next) => {

    const id = parseJWT(req, next)


    const user = await User.findById(id)

    if (!user) {
        return next(new ErrorHandler('User not found', 404))
    }


    res.status(200).json({
        success: true,
        user
    })


}

const updateUserProfile = async (req, res, next) => {

    const user = await User.findById(parseJWT(req, next))

    if (!user) {
        return next(new ErrorHandler('User not found', 404))
    }

    const { username, email } = req.body

    if (username) user.username = username
    if (email) user.email = email

    await user.save()

    res.status(200).json({
        success: true,
        message: 'User profile updated successfully',
        user
    })
}

const deleteUserProfile = async (req, res, next) => {

    const user = await User.findByIdAndDelete(parseJWT(req, next))

    if (!user) {
        return next(new ErrorHandler('User not found', 404))
    }



    res.status(200).json({
        success: true,
        user,
        message: 'User profile deleted successfully'
    })
}

const updatePassword = async (req, res, next) => {

    const user = await User.findById(parseJWT(req, next)).select('+password')
    const { oldPassword, newPassword } = req.body

    if (!oldPassword || !newPassword) {
        return next(new ErrorHandler('Please provide all required fields', 400))
    }

    const isPasswordMatched = await user.comparePassword(oldPassword)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid old password', 401))
    }

    user.password = newPassword
    await user.save()

    res.status(200).json({
        success: true,
        message: 'Password updated successfully'
    })
}

export { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile, deleteUserProfile, updatePassword }
