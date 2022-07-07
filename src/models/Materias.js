const {Schema, model} = require('mongoose');

const materiasSchema = new Schema({
    NombreMateria:{
        type: String,
        required: true,
        unique: true
    },
    user:{
        type:String,
        required: true 
    }
})

module.exports = model('Materias',materiasSchema);