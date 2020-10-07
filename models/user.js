const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        trim: true, // para que no tenga espacios
        unique: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    avatar: {
        type: String,
        trim: true
    },
    siteWeb: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    createAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('User', UserSchema)

// Este modelo se va a llamar User y va a exportar el modelo UserSchema, que recoge los pará,etros del objeto User
