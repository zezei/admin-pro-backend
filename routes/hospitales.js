/*
Ruta: /api/hospitales

*/

const { Router } = require('express');

const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator')

const { getHospitales, crearHospital, actualizarHospital, borrarHospital} = require('../controllers/hospitales');
const { verificaToken } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', getHospitales)

router.post('/',
    [
        check('nombre', 'Nombre del hospital obligatorio').not().isEmpty(),
        validarCampos,
        verificaToken,
    ],
    crearHospital)

router.put('/:id',
    [
    ],
    actualizarHospital);

router.delete('/:id',
    [
    ],
    borrarHospital);

module.exports = router;