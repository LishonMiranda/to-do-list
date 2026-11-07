import jwt from 'jsonwebtoken'
import ErrorHandler from '../utils/errorHandler.js'


const parseJWT = (req, next) => {
    try {
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded.id
    } catch (error) {
        throw next(new ErrorHandler('Invalid token', 401))
    }
}

export default parseJWT