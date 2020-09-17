const Usuario = require('../models/usuario');

const { response } = require('express')

const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [usuarios, total] = await Promise.all([
        Usuario.find({},'nombre email role uid').skip(desde).limit(5),
        Usuario.countDocuments()
    ])
    const uid = req.uid;
    res.status(200).json({
        ok: true,
        usuarios,
        total,
        uid,
      
    })
}


const crearUsuario = async (req, res = response) => {

    const { nombre, email, password } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya este registrado'
            })
        }
        const usuario = new Usuario(req.body);

        //Encryptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        
        const token = await generarJWT(usuario._id)
        res.status(200).json({
            ok: true,
            usuario,
            token
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            error: err
        })
    }
}

actualizarusuario = async (req, res = response) => {
    const uid = req.params.id;
    //TODO validar token y comprobar si usuario es admin

    try {

        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        //Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese email"
                })
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }
}


borrarUsuario = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        await Usuario.findOneAndDelete(uid)
        res.json({
            ok:true,
            msg: "Usuario Eliminado"
        })

    } catch (err) {
        res.status(500).json({
            ok: false,
            error: err
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarusuario,
    borrarUsuario
}