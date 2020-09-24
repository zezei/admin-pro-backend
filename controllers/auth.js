const { response } = require('express');

const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt')

const { googleVerify } = require('../helpers/google-verify')
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

const googleSignIn = async (req, res=response) =>{

    
    try {
        const {name, email, picture} = await googleVerify(req.body.token);
        const usuarioDB = await Usuario.findOne({email});

        let usuario;
        if (!usuarioDB){
            usuario = new Usuario({
                nombre: name,
                email: email,
                img: picture,
                password: '=)',
                google: true
            })
        }else{
            //existe usuario
            usuario = usuarioDB;
            usuario.google = true;
            // usuario.password = '=)' si queremos que mantenga las dos autenticaciones
        }

        //guardar en DB
       await usuario.save();

       const token = await generarJWT(usuario._id)

        res.json({
            ok: true,
            msg: "Google signin",
            token
        })
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: "Token no correcto"
        })
    }

}



const renewToken = async (req, res =response) =>{
    const uid = req.uid;
    const token = await generarJWT(uid)
    res.json({
        ok:true,
        token
    })
}
module.exports = {
    login,
    googleSignIn,
    renewToken
}