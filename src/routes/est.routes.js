const { Router } = require('express')
const router = Router()


const { 
    renderestForm,
} = require('../controllers/est.controller');

const {isAuthenticated} =require('../helpers/auth');

router.get('/est/estviews', isAuthenticated,renderestForm);

//exportar
module.exports = router

