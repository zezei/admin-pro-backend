/*
Ruta: /api/todo/:busqueda

*/

const { Router } = require('express');

const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator')

const { getTodo,getDocumentosColeccion } = require('../controllers/busquedas');
const { verificaToken } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/:busqueda',verificaToken, getTodo)
router.get('/coleccion/:tabla/:busqueda',verificaToken, getDocumentosColeccion)


module.exports = router;