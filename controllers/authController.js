import User from '../models/user.js'
import ErrorHandler from '../utils/errorHandler.js'
import sendToken from '../utils/sendToken.js'

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
    if (res.cookies.token) {
        return next(new ErrorHandler('User is already logged in', 400))
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
    if (!req.cookies.token) {
        return next(new ErrorHandler('User is not logged in', 400))
    }
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    })
}

export { registerUser, loginUser, logoutUser }
