import ErrorHandler from "../utils/errorHandler.js"

const errorHandler = (err, req, res, next) => {

    let error = { ...err }
    error = new ErrorHandler(error.message, error.statusCode || 500)

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorHandler(message, 400)
    }

    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`
        error = new ErrorHandler(message, 400)
    }

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        error = new ErrorHandler(message, 400)
    }

    res.status(error.statusCode).json({
        success: false,
        message: error.message || 'Internal Server Error'
    })

}

export default errorHandler;