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

const actualizarMedico = async (req, res = response) => {
    const id = req.params.id;
    const medico = Medico.findById(id);
    const uid = req.uid;
    try {
        if (!medico){
            return res.status(404).json({
                ok: false,
                msg: "No se encontro medico con ese id"
            })
        }
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true});
        res.json({
            ok: true,
            medico: medicoActualizado
        })
        
    } catch (error) {
        res.json({
            ok: false,
            msg: 'No se pudo actualziar el medico'
        })
        
    }
}

const borrarMedico = async (req, res = response) => {
    const id = req.params.id;
    try{
        const medico = await Medico.findById(id);
        if (!medico){
            return res.status(404).json({
                ok: false,
                msg: "Medico no encontrado"
            })
        }
        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: "Medico eliminado"
        })

    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico

}