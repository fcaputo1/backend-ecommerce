const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user.controllers')
//Middlewares
const validation = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')
const uploadFileUser = require('../middlewares/uploadFileUser')

//Trae los usuarios desde la DB
router.get("/users", [ validation, isAdmin ], userControllers.getUsers)

//Guarda usuarios en la DB
router.post("/users", uploadFileUser, userControllers.createUser)

//Trae un usuario específico
router.get("/users/:id", validation, userControllers.getUserById)

//Borra un usuario
router.delete("/users/:id", [ validation, isAdmin ], userControllers.deleteUser)

//Actualiza un usuario
router.put("/users/:id", [ validation, uploadFileUser ], userControllers.updateUser)

//Loguear al usuario
router.post("/login", userControllers.login)

//Devolvemos los endpoints
module.exports = router