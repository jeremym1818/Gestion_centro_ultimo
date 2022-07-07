const { route } = require("../server");

const estCtrl = {};

const Centro = require('../models/Centro');
const User = require("../models/User");
const Estudiantes = require("../models/Estudiantes");


//ir a Estudiante
estCtrl.renderestForm = (req,res) =>{
    res.render('est/estudiante-views');
}

//exportamos 
module.exports = estCtrl;