const { route } = require("../server");

const rolCtrl = {};

const Centro = require('../models/Centro');
const User = require("../models/User");
const Estudiantes = require("../models/Estudiantes");


//adm
rolCtrl.renderuser = async (req,res) =>{

    //verificamos si el usuario es administrador o estudiante o maestro o padre
     const {email} = req.user;
     const encontrado = await User.findOne({ email: email });
   
     roles  = encontrado.rol

    if(roles=='administrador'){
        const centros = await Centro.find({user:req.user.id}).lean();
        const cantidadC  = centros.length//calculamos el total de centros
        const est = await Estudiantes.find({user:req.user.id}).lean();
        const cantidadE  = est.length//calculamos el total de centros
       
        res.render('adm/administrador',{cantidadC,cantidadE}); 
        
    }
    
    if(roles=='estudiante'){
        const datosEst = await Estudiantes.findOne({ CorreoEstudiante:encontrado.email });
        const NombreEstudiante = datosEst.NombreEstudiante
        const ApellidoEstudiante = datosEst.ApellidoEstudiante
        const TelefonoEstudiante = datosEst.TelefonoEstudiante
        const CorreoEstudiante = datosEst.CorreoEstudiante
        const DireccionEstudiante = datosEst.DireccionEstudiante
        const centro = datosEst.centro

        res.render('est/estudiante-views',{NombreEstudiante,ApellidoEstudiante,TelefonoEstudiante,CorreoEstudiante,DireccionEstudiante,centro});
    }
    
    }
    

//exportamos 
module.exports = rolCtrl;
