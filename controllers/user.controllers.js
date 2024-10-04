const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const saltRounds = 10

//Trae todos los usuarios
async function getUsers(req, res)  {
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
        const { id } = req.params
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).send({
                ok: false,
                message: "El usuario no fue encontrado"
            })
        }

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
        const { id } = req.params
        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(404).send({
                ok: false,
                message: "El usuario a borrar no fue encontrado"
            })
        }

        return res.status(200).send({
            ok:true,
            message: "El usuario fue borrado correctamente",
            deletedUser
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok:false,
            message: "Error al borrar el usuario"
        })
    }
}

//Actualizar usuario
async function updateUser(req,res) {
    try {
        const { id } = req.params
        const user = await User.findByIdAndUpdate(id, req.body, { new: true })

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

module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser
}