/*
Ruta: /api/medicos

*/

const { Router } = require('express');

const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator')

const { getMedicos, crearMedico, actualizarMedico, borrarMedico} = require('../controllers/medicos');
const { verificaToken } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', getMedicos)

router.post('/',
    [
        check('hospital', "El id del hosptial debe ser valido").isMongoId(),
        check('nombre', "El nombre del medico es obligatorio").not().isEmpty(),
        
        validarCampos,
        verificaToken
    ],
    crearMedico)

router.put('/:id',
    [
        check('hospital', "El id del medico debe ser valido").isMongoId(),
        check('nombre', "El nombre del medico es obligatorio").not().isEmpty(),
        validarCampos,
        verificaToken
    ],
    actualizarMedico);

router.delete('/:id',
    [
    ],
    borrarMedico);

module.exports = router;