const { Router } = require('express')
const router = Router()

const { renderadmForm,
        renderCentroForm,
        createNewCentro,
        renderCentros,
        renderEditForm,
        updateCentro,
        renderEstForm,
        createNewEst,
        renderEst,
        renderEditEstForm,
        updateEstudiante,
        deleteEstudiante,
        renderSecretForm,
        createNewSecret,
        renderTutorForm,
        createNewTutor,
        renderTutores,
        renderGradoForm,
        createNewGrado,
        renderGrados,
        renderSeccionForm,
        createNewSeccion,
        renderMateriaForm,
        createNewMateria,
        renderMateria,
        deleteCentro,
        renderDatos,
        verDatosCentro,
        renderAsigEstGForm,
        AsignarEstC,
        renderAsigMGForm,
        AsignarAsigMG
    } = require('../controllers/adm.controller');
const {isAuthenticated} =require('../helpers/auth');
const { route } = require('./index.routes');

router.get('/adm/adm', isAuthenticated,renderadmForm);

//Agregar Centro
router.get('/adm/add', isAuthenticated,renderCentroForm);
router.post('/adm/new-centro', isAuthenticated,createNewCentro);

//mostrar todas los centros obtener
router.get('/centros', isAuthenticated,renderCentros);

//edit Centro
router.get('/adm/edit/:id',isAuthenticated, renderEditForm);
router.put('/adm/edit-centro/:id',updateCentro );

//Eliminar Centro
router.delete('/centros/delete/:id',isAuthenticated, deleteCentro);


//Nuevo Estudiante
router.get('/adm/addest', renderEstForm);

router.post('/adm/new-estudiante', createNewEst);

//mostrar todas los  estudiantes
router.get('/estudiantes', isAuthenticated,renderEst);

//Editar estudiante 
router.get('/adm/editEst/:id',isAuthenticated, renderEditEstForm);
router.put('/adm/edit-etudiante/:id', updateEstudiante);

//Eliminar Centro
router.delete('/estudiante/delete/:id',isAuthenticated, deleteEstudiante);

//Nuevo Secretario
router.get('/adm/addsecret', renderSecretForm);

router.post('/adm/new-secretario', createNewSecret);

//Nuevo Tutor
router.get('/adm/addtutor', renderTutorForm);
router.post('/adm/new-tutor', createNewTutor);
//
//mostrar todas los  tutores
router.get('/tutores', isAuthenticated,renderTutores);


//Nuevo Grado
router.get('/adm/addgrado', renderGradoForm);

router.post('/adm/new-grado', createNewGrado);

//mostrar Grados
router.get('/grados', isAuthenticated,renderGrados);

//Nuevo seccion
router.get('/adm/addseccion', renderSeccionForm);

router.post('/adm/new-seccion', createNewSeccion);


//Nuevo Materia
router.get('/adm/addmateria',isAuthenticated, renderMateriaForm);

router.post('/adm/new-materia',isAuthenticated, createNewMateria);

//ver todas las materias

//mostrar todas los  estudiantes
router.get('/materias', isAuthenticated,renderMateria);

//mostrar todos los datos de Un colegios

router.get('/datosC', isAuthenticated,renderDatos);

router.post('/adm/detalles', verDatosCentro);

//asignar Estudiante A grado

router.get('/asigEstG', isAuthenticated,renderAsigEstGForm);

router.post('/adm/asig-estG', AsignarEstC );

//asignar Estudiante A grado

router.get('/asigMG', isAuthenticated,renderAsigMGForm);

router.post('/adm/asig-MG', AsignarAsigMG );

//exportar
module.exports = router

