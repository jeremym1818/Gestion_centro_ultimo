const { route } = require("../server");

const secretCtrl = {};

const Centro = require('../models/Centro');
const User = require("../models/User");
const Estudiantes = require("../models/Estudiantes");


//ir a secretario academico
secretCtrl.rendersecretAcForm = (req,res) =>{
    res.render('secretAcademico/secretario');
}

//exportamos 
module.exports = secretCtrl;