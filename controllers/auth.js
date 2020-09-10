const { response } = require('express');

const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt')

const login = async (req, res = response)=>{


    const {email, password} = req.body;
    try {

        //Verifica Email
        const usuarioDB = await Usuario.findOne({email});
        console.log(usuarioDB)
        if (!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario o password inocorrectos'
            })
        }

        //Verificar password

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password no valido'
            })
        }

        //Generar el token
        const token = await generarJWT(usuarioDB._id)
        res.status(200).json({
            ok: true,
            msg: "Inicio de sesion",
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }

}


module.exports = {
    login
}