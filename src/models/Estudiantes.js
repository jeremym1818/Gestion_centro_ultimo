const {Schema, model} = require('mongoose');

const estudiantesSchema = new Schema({

    NombreEstudiante:{
        type: String,
        required: true
    },
    ApellidoEstudiante:{
        type: String,
        required: true
    },
    TelefonoEstudiante:{
        type: Number,
        required: true,
        unique: true
    },
    CorreoEstudiante:{
        type: String,
        required: true,
        unique: true
    },
    DireccionEstudiante:{
        type: String,
        required: true
    },
    centro:{
        type: String,
    },
    user:{
        type:String,
        required: true 
    },
    grado:{
        type:String,
        required: false
    },
    

},{
    //cuando fue creado y actualixado por ultima vez
    timestamps:true
 });

module.exports = model('Estudiantes',estudiantesSchema);