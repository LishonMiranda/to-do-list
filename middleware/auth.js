import ErrorHandler from "../utils/errorHandler.js"

const isAuthenticatedUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new ErrorHandler('Please login to access this resource', 401))
    }
    next()
}


export { isAuthenticatedUser }