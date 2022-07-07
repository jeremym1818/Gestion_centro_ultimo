const { Router } = require('express')
const router = Router()

const { renderuser,
    } = require('../controllers/rol.controller');
const {isAuthenticated} =require('../helpers/auth');

//definimos rutas/nueva ruta
router.get('/user/views',isAuthenticated, renderuser);


//exportar
module.exports = router;