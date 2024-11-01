const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Definimos el esquema del modelo

const userSchema = new Schema({
    name: { type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 80 
    },
    email: { 
        type: String, 
        required: true, 
        trim: true, 
        minLength: 4, 
        maxLength: 90 , 
        unique: true, 
        index: true,
        validate: {
            validator: (value) => {
                const regex = /^[A-Za-z0-9._+\-']+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
                return regex.test(value) 
            }
        }
    },
    password: { 
        type: String,
        required: true,
        minLength: 4,
        maxLength: 70,
        trim: true
    },
    birthday: { 
        type: String,
        required: true,
    },
    country: { 
        type: String, 
        required: true,
        enum: ["AR", "CH", "CO", "BR", "PA", "UY", "VE"]
    },
    avatar: { 
        type: String, 
        default: 'default-user.png'
    },
    role: {
        type: String,
        default: "client",
        enum: ["client", "admin"]
    },
    observations: { 
        type: String 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema)