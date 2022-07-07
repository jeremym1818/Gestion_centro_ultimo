const { Schema, model } = require('mongoose');

const centroSchema = new Schema({
    /*IdCentro: {
        type: Number,
        require: true,
        unique: true
    },*/
    NombreCentro: {
        type: String,
        require: true,
    },
    DireccionCentro: {
        type: String,
        require: true
    },
   user:{
        type:String,
        required: true 
    }
},{
    //cuando fue creado y actualixado por ultima vez
    timestamps:true
 });

module.exports = model('Centro', centroSchema);