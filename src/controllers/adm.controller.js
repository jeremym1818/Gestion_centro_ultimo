const { route } = require("../server");

const admCtrl = {};

const Centro = require('../models/Centro');
const User = require("../models/User");
const Estudiantes = require("../models/Estudiantes");
const Materia = require("../models/Materias");
const Grado = require("../models/Grados");
const Tutores = require("../models/Tutores");
const Grados = require("../models/Grados");
const Materias = require("../models/Materias");

//ir a administrador
admCtrl.renderadmForm = (req,res) =>{
    res.render('adm/administrador');
}

//add centro
admCtrl.renderCentroForm = (req,res) =>{
    res.render('adm/new-centro');
}

//nuevo centro
admCtrl.createNewCentro = async (req, res) => {
    const { NombreCentro, DireccionCentro } = req.body;

    const centroE = await Centro.findOne({ NombreCentro: NombreCentro });
    if (centroE) {
        req.flash('error_msg', 'El Centro Ya Existe');
        res.redirect('/adm/add');
    } else {
        const newCentro = new Centro({ NombreCentro, DireccionCentro })
        newCentro.user = req.user.id;
        await newCentro.save();//guardar dentro de nuestra de base de datos
        req.flash('success_msg', 'Centro Agregado Exitosamente');
        res.redirect('/centros')
    }
}
//obtener todas los centros
admCtrl.renderCentros = async(req,res) =>{
    const centros = await Centro.find({user:req.user.id}).lean().sort({createdAt:'Asc'});
    console.log(req.body)
    res.render('adm/all-centros',{centros});
 }

//Editar centro
 admCtrl.renderEditForm = async (req,res) => {
    const centro =  await Centro.findById(req.params.id).lean();
    if(centro.user != req.user.id){
        req.flash('error_msg','No esta Autorizado');
        return res.redirect('/centros');
    }
    res.render('adm/edit-centro',{ centro });
}

admCtrl.updateCentro = async (req,res) =>{
    const {NombreCentro,DireccionCentro} = req.body;
    await Centro.findByIdAndUpdate(req.params.id,{NombreCentro,DireccionCentro});
    req.flash('success_msg','Centro Actualizado Exitosamente');
    res.redirect('/centros')
}

//eliminar
admCtrl.deleteCentro = async(req,res) =>{
    await Centro.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Centro Eliminado Exitosamente');
    res.redirect('/centros')
}


//Agregar nuevo Docente
admCtrl.renderDocenteForm = (req,res) =>{
    res.render('adm/new-docente');
   
}
//new docente
admCtrl.createNewDocente = async(req,res) =>{

}

//agregar Estudiante
admCtrl.renderEstForm = async (req,res) =>{
    const centros = await Centro.find({user:req.user.id}).lean().sort({createdAt:'Asc'});//
    res.render('adm/new-estudiante',{centros});//mandamos todos los centros registrados
   
}
//new estudiante
admCtrl.createNewEst = async (req, res) => {

    const { NombreEstudiante, ApellidoEstudiante, TelefonoEstudiante, CorreoEstudiante, DireccionEstudiante, centro, password } = req.body;

    const emailEst = await Estudiantes.findOne({ CorreoEstudiante: CorreoEstudiante });
    if (emailEst) {
        req.flash('error_msg', 'correo ya en uso');
        res.redirect('/adm/addest');
    } else {
        const newEst = new Estudiantes({ NombreEstudiante, ApellidoEstudiante, TelefonoEstudiante, CorreoEstudiante, DireccionEstudiante, centro, password })
        newEst.user = req.user.id;
       // newEst.grado = null;
        await newEst.save();//guardar dentro de nuestra de base de datos
        req.flash('success_msg', 'Estudiante Agregado Exitosamente');
        res.redirect('/estudiantes')


        //regidtramos el correo de estudiante
        const newUser = new User({ name: NombreEstudiante, email: CorreoEstudiante, password: password,rol:'estudiante'});
        newUser.password = await newUser.encryptPassword(password);
       
        await newUser.save()
    }


}

//Editar Estudiante
admCtrl.renderEditEstForm = async (req,res) => {
    const estudiante =  await Estudiantes.findById(req.params.id).lean();
    if(estudiante.user != req.user.id){
        req.flash('error_msg','No esta Autorizado');
        return res.redirect('/estudiantes');
    }
    res.render('adm/edit-estudiante',{ estudiante });
}

admCtrl.updateEstudiante = async (req,res) =>{
    const {NombreEstudiante,ApellidoEstudiante,TelefonoEstudiante,CorreoEstudiante,DireccionEstudiante} = req.body;
    await Estudiantes.findByIdAndUpdate(req.params.id,{NombreEstudiante,ApellidoEstudiante,TelefonoEstudiante,CorreoEstudiante,DireccionEstudiante});
    req.flash('success_msg','Estudiante Actualizado Exitosamente');
    res.redirect('/estudiantes')
}

//obtener todas los Estudiantes
admCtrl.renderEst = async(req,res) =>{
    const est = await Estudiantes.find({user:req.user.id}).lean().sort({createdAt:'desc'});
    res.render('adm/all-estudiantes',{est});
 }

 //eliminar estudiante
admCtrl.deleteEstudiante = async(req,res) =>{
    await Estudiantes.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Estudiante Eliminado Exitosamente');
    res.redirect('/estudiantes')
}

 
//agregar Secretario
admCtrl.renderSecretForm = (req,res) =>{
    res.render('adm/new-secretario');
   
}
//new Secretario
admCtrl.createNewSecret = async(req,res) =>{
}

//Cambios Nate 01/07/2022
//agregar tutor
admCtrl.renderTutorForm = async(req,res) =>{
    const centros = await Centro.find({user:req.user.id}).lean().sort({createdAt:'Asc'});
    const estu =  await Estudiantes.find({user:req.user.id}).lean().sort({createdAt:'Asc'});
    res.render('adm/new-tutor', {centros,estu});
}

//new tutor
admCtrl.createNewTutor = async(req,res) =>{
    const { NombreTutor, ApellidoTutor, TelefonoTutor, CorreoTutor, DireccionTutor, estudiante, password } = req.body;

    const emailTutor= await Tutores.findOne({ CorreoTutor: CorreoTutor });

    if (emailTutor) {
        req.flash('error_msg', 'correo ya en uso');
        res.redirect('/adm/addest');
    } else {
        const newTutor = new Tutores({NombreTutor, ApellidoTutor, TelefonoTutor, CorreoTutor, DireccionTutor, estudiante })
        newTutor.user = req.user.id;
        await newTutor.save();//guardar dentro de nuestra de base de datos
        req.flash('success_msg', 'Tutor Agregado Exitosamente');
        res.redirect('/tutores')


        //regidtramos el correo del tutor
        const newUserTutor = new User({ name: NombreTutor, email: CorreoTutor, password: password,rol:'tutor'});
        newUserTutor.password = await newUserTutor.encryptPassword(password);
       
        await newUserTutor.save()
    }
}

//mostrar Tutores
admCtrl.renderTutores = async(req,res) =>{
    const tutores = await Tutores.find({user:req.user.id}).lean().sort({createdAt:'desc'});
    res.render('adm/all-tutores',{tutores});
 }

/////////////////////////////////////////////
//agregar grado
admCtrl.renderGradoForm = (req,res) =>{
    res.render('adm/new-grado');
   
}
//new grado
admCtrl.createNewGrado = async(req,res) =>{
      const {NombreGrado } = req.body;

    const gradoE = await Grado.findOne({ NombreGrado: NombreGrado });

    if (gradoE) {
        req.flash('error_msg', 'El Grado Ya Existe');
        res.redirect('/adm/addgrado');
    } else {
        const newGrado = new Grado({ NombreGrado})
        newGrado.user = req.user.id;
      /*  newGrado.materias[0] = 'mattt'
        newGrado.materias[1] = 'sssss'*/
        await newGrado.save();//guardar dentro de nuestra de base de datos
        req.flash('success_msg', 'Grado Agregado Exitosamente');
       res.redirect('/grados')
    }

}
//mostrar grados
admCtrl.renderGrados = async(req,res) =>{
    const grados = await Grado.find({user:req.user.id}).lean().sort({createdAt:'desc'});
    res.render('adm/all-Grados',{grados});
 }

//agregar Seccion
admCtrl.renderSeccionForm = (req,res) =>{
    res.render('adm/new-seccion');
   
}
//new Seccion
admCtrl.createNewSeccion = async(req,res) =>{
}

//agregar materia
admCtrl.renderMateriaForm = (req,res) =>{
    res.render('adm/new-materia');
   
}
//new Materia
admCtrl.createNewMateria = async(req,res) =>{
    const { NombreMateria } = req.body;

    const materiaE = await Materia.findOne({ NombreMateria: NombreMateria });

    if (materiaE) {
        req.flash('error_msg', 'La materia Ya Existe');
        res.redirect('/adm/addmateria');
    } else {
        const newMateria = new Materia({ NombreMateria})
        newMateria.user = req.user.id;
        await newMateria.save();//guardar dentro de nuestra de base de datos
        req.flash('success_msg', 'Materia Agregada Exitosamente');
       res.redirect('/materias')
    }
}

admCtrl.renderMateria = async(req,res) =>{
    const materia = await Materia.find({user:req.user.id}).lean().sort({createdAt:'desc'});
    res.render('adm/all-Materias',{materia});
 }


//obtener todas los los datos del Centro
admCtrl.renderDatos = async(req,res) =>{
    //buscamos los centros de ese administrador
const admC= await Centro.find({user:req.user.id}).lean().sort({createdAt:'Asc'});
    res.render('adm/detalles',{admC});
 }

 admCtrl.verDatosCentro = async(req,res) =>{
    const {centro} = req.body

    const estu = await Estudiantes.find({centro:centro}).lean().sort({createdAt:'desc'});

    res.render('adm/ver-datos',{estu})

}


//asignar estudiantes a Grados
admCtrl.renderAsigEstGForm = async (req,res) =>{
    const TotalE = await Estudiantes.find({user:req.user.id}).lean().sort({createdAt:'desc'});
    const TotalG = await Grado.find({user:req.user.id}).lean().sort({createdAt:'desc'});
    res.render('adm/asig-estG',{TotalE,TotalG});
}
//new tutor
admCtrl.AsignarEstC = async(req,res) =>{
    const {estudiante,grado} = req.body
   
    //encontramos a el estudiante
    const estE = await Estudiantes.find({NombreEstudiante:estudiante}).lean();

    await Estudiantes.findByIdAndUpdate(estE,{NombreEstudiante:estudiante,grado:grado});
    req.flash('success_msg', 'Estudiante Agregado Exitosamente');
    res.redirect('/estudiantes')


}



//asignar materias A Grado
admCtrl.renderAsigMGForm = async (req,res) =>{
    const TotalG = await Grado.find({user:req.user.id}).lean().sort({createdAt:'desc'});//Total De Grados
    const TotalM = await Materia.find({user:req.user.id}).lean().sort({createdAt:'desc'});//Total de Materias
    res.render('adm/asig-MG',{TotalG,TotalM});
}
//new tutor
admCtrl.AsignarAsigMG = async(req,res) =>{
    const {grado,materia} = req.body
   console.log(req.body)
   
//encontramos el grado
const gradoE = await Grado.find({NombreGrado:grado}).lean();

let result = await Grado.findById(gradoE);
result.materias[1] = materia
await result.save();

req.flash('success_msg', 'Materia Asignada A grado exitosamente');
res.redirect('/grados')

}


//exportamos 
module.exports = admCtrl;