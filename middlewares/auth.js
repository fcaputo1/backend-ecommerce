const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

function validation(req, res, next) {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).send({
            ok: false,
            message: "No tiene autorización"
        })
    }

    jwt.verify(token, SECRET, (error, payload) => {
        if (error) {
            console.log(error)
            res.status(401).send({
                ok: false,
                message: "Credenciales incorrectas"
            })
        }
        console.log(payload)
        req.user = payload

        next()
    })
    console.log(token)
}

module.exports = validation