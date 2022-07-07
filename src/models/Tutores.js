const {Schema, model} = require('mongoose');

const tutoresSchema = new Schema({
    NombreTutor:{
        type: String,
        required: true
    },
    ApellidoTutor:{
        type: String,
        reuired: true
    },
    TelefonoTutor:{
        type: Number,
        required: true,
        unique: true
    },
    CorreoTutor:{
        type: String,
        required: true,
        unique: true
    },
    DireccionTutor:{
        type: String,
        required: true
    },
    estudiante:{
        type: String,
    },
    user:{
        type:String,
        required: true 
    }
});

module.exports = model('Tutores',tutoresSchema);