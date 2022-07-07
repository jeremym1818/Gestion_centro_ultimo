const {Schema, model} = require('mongoose');

const areasSchema = Schema({
    IdArea:{
        type: Number,
        required: true,
        unique: true
    },
    NombreArea:{
        type: String,
        required: true,
        unique: true
    }
});

module.exports = model('Areas',areasSchema);