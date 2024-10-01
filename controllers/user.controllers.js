const User = require('../models/user.model')

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

    const user = new User(req.body)

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

module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUser
}