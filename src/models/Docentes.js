const {Schema, model} = require('mongoose');

const docentesSchema = new Schema({
    IdDocentes:{
        type: Number,
        required: true,
        unique: true
    },
    NombreDocente:{
        type: String,
        required: true
    },
    ApellidoDocente:{
        type: String,
        required: true
    },
    TelefonoDocente:{
        type: Number,
        required: true,
        unique: true
    },
    CorreoDocente:{
        type: String,
        required: true,
        unique: true
    },
    DireccionDocente:{
        type: String,
        required: true
    }
},{
    //cuando fue creado y actualixado por ultima vez
    timestamps:true
 });

module.exports = model('Docentes',docentesSchema);