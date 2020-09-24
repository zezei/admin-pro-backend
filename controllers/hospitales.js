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

const actualizarHospital = async (req, res)=>{
    const id = req.params.id;
    const uid = req.uid;
    try{
        const hospital = await Hospital.findById(id);
        if (!hospital){
            return res.status(404).json({
                ok: false,
                msg: "Hospital no encontrado"
            })
        }
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }
        hospital.nombre
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true});

        res.json({
            ok: true,
            hospital: hospitalActualizado
        })

    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

const borrarHospital = async (req, res)=>{

    const id = req.params.id;
    try{
        const hospital = await Hospital.findById(id);
        if (!hospital){
            return res.status(404).json({
                ok: false,
                msg: "Hospital no encontrado"
            })
        }
        const hospitalActualizado = await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: "Hospital eliminado"
        })

    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital

}