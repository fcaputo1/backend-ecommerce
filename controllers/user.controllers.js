const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

//Trae todos los usuarios
async function getUsers(req, res) {
    try {
        const users = await User.find()
        console.log(users)
        return res.status(200).send(users)

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al obtener usuarios"
        })
    }
}

//Crea un usuario
async function createUser(req, res) {

    if (!req.body.password) {
        return res.status(400).send({
            ok: false,
            message: "La contraseña es requerida"
        })
    }

    const user = new User(req.body)

    if (req.file) {
        user.avatar = req.file.filename
    }

    bcrypt.hash(user.password, saltRounds, (error, hash) => {

        if (error) {
            return res.status(500).send({
                ok: false,
                message: "Error al crear usuario"
            })
        }

        user.password = hash
        user.save().then((newUser) => {

            console.log(newUser);
            return res.status(201).send(newUser)

        }).catch((error) => {
            console.log(error)
            return res.status(500).send({
                ok: false,
                message: "El usuario no se pudo crear"
            })
        })
    })
}

//Trae un usuario en particular
async function getUserById(req, res) {
    try {
        const {
            id
        } = req.params
        if (req.user.role !== "admin" && id !== req.user._id) {
            return res.status(403).send({
                ok: false,
                message: "No tienes permisos para acceder a este usuario"
            })
        }
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).send({
                ok: false,
                message: "El usuario no fue encontrado"
            })
        }

        user.password = undefined
        console.log(user)

        return res.status(200).send({
            ok: true,
            message: "El usuario fue encontrado",
            user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al obtener el usuario en la DB"
        })
    }
}

//Borrar usuario
async function deleteUser(req, res) {
    try {
        const {
            id
        } = req.params
        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(404).send({
                ok: false,
                message: "El usuario a borrar no fue encontrado"
            })
        }

        return res.status(200).send({
            ok: true,
            message: "El usuario fue borrado correctamente",
            deletedUser
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al borrar el usuario"
        })
    }
}

//Actualizar usuario
async function updateUser(req, res) {
    try {
        const { id } = req.params

        if (req.user.role !== "admin" && !id !== req.user._id) {
            return res.status(403).send({
                ok: false,
                message: "No tienes permiso para actualizar el usuario"
            })
        }

        // Si hay una nueva imagen, establece `avatar` en la nueva imagen; de lo contrario, conserva el avatar actual
        if (req.file) {
            req.body.avatar = req.file.filename
        } else {
            // Conserva el avatar actual del usuario
            const existingUser = await User.findById(id)
            if (existingUser) {
                req.body.avatar = existingUser.avatar
            }
        }

        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true
        })

        if (!user) {
            return res.status(404).send({
                ok: false,
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).send({
            ok: true,
            message: "Usuario actualizado correctamente",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            message: "Error al actualizar el usuario"
        })
    }
}

//Login
async function login(req, res) {
    try {
        const {
            email,
            password
        } = req.body

        //Revisa si llega el email o password desde el frontend
        if (!email || !password) {
            return res.status(400).send({
                ok: false,
                message: "Email y contraseña requeridos"
            })
        }

        //Busca el user en la DB
        const user = await User.findOne({
            email
        })

        if (!user) {
            return res.status(400).send({
                ok: false,
                message: "Alguno de los datos es incorrecto"
            })
        }

        //Comparar la contraseña con la guardada en la DB
        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(400).send({
                ok: false,
                message: "Algunos de los datos es incorrecto"
            })
        }

        //Eliminar la propiedad password
        user.password = undefined
        user.__v = undefined

        //Generar un token para firmar datos del usuario
        const token = jwt.sign(user.toJSON(), SECRET, {
            expiresIn: '1h'
        })

        return res.send({
            ok: true,
            message: "Login exitoso",
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "Error al autenticar usuario"
        })
    }
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser,
    login
}