const { response } = require('express');
const { check } = require('express-validator')

const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getMedicos = async (req, res = response) => {
    const medicos = await Medico.find().populate('usuario','nombre').populate('hospital','nombre')
    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async (req, res = response) => {

    const medico = new Medico(req.body);
    const uid = req.uid;
    medico.usuario = uid;
    try {
        const medicoDB = await medico.save()
        res.json({
            ok: true,
            medico: medicoDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }
}

const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedicos'
    })
}

const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarMedicos'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico

}