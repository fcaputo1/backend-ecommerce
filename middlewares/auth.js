function validation(req, res, next) {
    console.log("Funcion Middleware")
    next()
}

module.exports = validation