const { Schema, model } = require('mongoose');

const permisosSchema = Schema({
    IdPermiso: {
        type: Number,
        required: true,
        unique: true
    },
    DescripcionPermiso: {
        type: String,
        required: true
    }
});
module.exports = model('Permisos', permisosSchema);