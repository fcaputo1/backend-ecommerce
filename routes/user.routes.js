const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user.controllers')
//Middlewares
const validation = require('../middlewares/auth')

//Trae los usuarios desde la DB
router.get("/users", validation, userControllers.getUsers)

//Guarda usuarios en la DB
router.post("/users", userControllers.createUser)

//Trae un usuario específico
router.get("/users/:id", userControllers.getUserById)

//Borra un usuario
router.delete("/users/:id", userControllers.deleteUser)

//Actualiza un usuario
router.put("/users/:id", userControllers.updateUser)

//Loguear al usuario
router.post("/login", userControllers.login)

//Devolvemos los endpoints
module.exports = router