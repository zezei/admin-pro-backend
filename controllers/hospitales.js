const {response } = require('express');

const Hospital = require('../models/hospital');
const getHospitales = async (req, res)=>{
    const hospitales = await Hospital.find().populate('usuario','nombre img');
    res.json({
        ok: true,
        hospitales
    })
}

const crearHospital = async (req, res)=>{
    const hospital = new Hospital(req.body);
    const uid = req.uid;
    hospital.usuario = uid;
    try{
        const hospitalDB = await hospital.save()
        res.json({
            ok: true,
            hospital: hospitalDB
        })

    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }

}

const actualizarHospital = (req, res)=>{
    res.json({
        ok: true,
        msg: 'actualizarHospitales'
    })
}

const borrarHospital = (req, res)=>{
    res.json({
        ok: true,
        msg: 'borrarHospitales'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital

}