import jwt from 'jsonwebtoken'
import ErrorHandler from './errorHandler.js'


const parseJWT = (req, next) => {
    try {
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded.id
    } catch (error) {
        throw next(new ErrorHandler('Invalid token or expired', 401))
    }
}

export default parseJWT