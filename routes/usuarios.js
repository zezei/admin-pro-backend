/*
Ruta: /api/usuarios

*/

const { Router } = require('express');
const { check } = require('express-validator')
const { getUsuarios, crearUsuario, actualizarusuario, borrarUsuario } = require('../controllers/usuarios')


const { validarCampos } = require('../middlewares/validar-campos');

const { verificaToken } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', verificaToken ,getUsuarios)

router.post('/',
    [
        check('nombre', 'Nombre obligatorio').not().isEmpty(),
        check('password', 'Password obligatorio').not().isEmpty(),
        check('email', 'Email Obligatorio').isEmail(),
        validarCampos

    ],
    crearUsuario)

router.put('/:id',
    [

        verificaToken,
        check('nombre', 'Nombre obligatorio').not().isEmpty(),
        check('role', 'El rol es obligatorio').not().isEmpty(),

        check('email', 'Email Obligatorio').isEmail(),
        validarCampos

    ],
    actualizarusuario);

    router.delete('/:id',
    [
        verificaToken,
        validarCampos

    ],
    borrarUsuario);

module.exports = router;