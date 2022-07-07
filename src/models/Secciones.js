const {Schema, model} = require('mongoose');

const seccionesSchema = Schema({
    IdSeccion:{
        type: Number,
        required: true,
        unique: true
    },
    NombreSeccion:{
        type: String,
        required: true,
        unique: true
    },
    
});

module.exports = model('Secciones',seccionesSchema);