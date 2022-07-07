const { Router } = require('express')
const router = Router()


const { 
    rendersecretAcForm,
} = require('../controllers/secretario.controller');

const {isAuthenticated} =require('../helpers/auth');

router.get('/secret/secretViews',rendersecretAcForm);

//exportar
module.exports = router

