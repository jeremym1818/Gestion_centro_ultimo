const { Schema, model } = require('mongoose');

const secretariosSchema = new Schema({
    IdSecretario: {
        type: Number,
        required: true,
        unique: true
    },
    NombreSecretario: {
        type: String,
        required: true
    },
    ApellidoSecretario: {
        type: String,
        required: true
    },
    IdArea: {
        type: Number,
        required: true
    },
    TelefonoSecretario: {
        type: Number,
        required: true,
        unique: true
    },
    CorreoSecretario: {
        type: String,
        required: true,
        unique: true
    },
    DireccionSecretario: {
        type: String,
        required: true
    },
    
})
module.exports = model('Secretarios', secretariosSchema);