const {Schema, model} = require('mongoose');

const gradosSchema = new Schema({
    NombreGrado:{
        type: String,
        required: true,
        unique: true
    },
    user:{
        type:String,
        required: true 
    },
    materias : [{
        type: String,
        require:false
    }]
    
});

module.exports = model('Grados',gradosSchema);