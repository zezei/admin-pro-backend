/*
Ruta: /api/upload

*/

const { Router } = require('express');

const expressFileUpload = require('express-fileupload');


const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator')

const { fileUpload, getImagen } = require('../controllers/uploads');
const { verificaToken } = require('../middlewares/validar-jwt');
const router = Router();

router.use( expressFileUpload());
router.put('/:tabla/:documentId',verificaToken, fileUpload)
router.get('/:tabla/:foto',verificaToken, getImagen)


module.exports = router;