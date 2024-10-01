const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user.controllers')

//Trae los usuarios desde la DB
router.get("/users", userControllers.getUsers)

//Guarda usuarios en la DB
router.post("/users", userControllers.createUser)

//Trae un usuario específico
router.get("/users/:id", userControllers.getUserById)

//Borra un usuario
router.delete("/users/:id", userControllers.deleteUser)

//TODO UPDATE actualizar usuario
//TODO LOGIN

//Devolvemos los endpoints
module.exports = router