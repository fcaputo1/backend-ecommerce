const Category = require('../models/category.model')

//Trae todas las categorías
async function getCategories(req, res) {
    try {
        const categories = await Category.find()
        return res.status(200).send({
            ok: true,
            message: "Categorias obtenidas correctamente",
            categories
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            message: "Error al obtener las categorías"
        })
    }
}

//Crear una categoría
async function createCategory(req,res) {
    try {
        const data = new Category(req.body)
        const newCategory = await data.save()
        return res.status(201).send({
            ok: true,
            message: "Categoria creada correctamente",
            newCategory
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send("No se pudo crear la categoría")
    }
}

module.exports = {
    getCategories,
    createCategory
}