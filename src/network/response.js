const status = {
    200: "Done",
    201: "Created",
    401: "Not authorized",
    404: "Not found",
    500: "Error server"
}

const success = (req, res, statusCode, msg, body) => {
    res.status(statusCode).json({
        ok: true,
        message: msg,
        statusMessage: status[statusCode],
        body
    })
}

const error = (req, res, statusCode, msg, body) => {
    res.status(statusCode).json({
        ok: false,
        message: msg,
        statusMessage: status[statusCode],
        body
    })
}

module.exports = {
    success,
    error
}