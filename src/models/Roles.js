const { Schema, model } = require('mongoose');

const rolesSchema = Schema({
    IdRol: {
        type: Number,
        required: true,
        unique: true
    },
    NombreRol: {
        type: String,
        required: true,
        unique: true
    },
    IdPermisos: {
        type: Number,
        required: true
    },
    
});

module.exports = model('Roles', rolesSchema);