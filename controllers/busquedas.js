const { response } = require('express');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const getTodo = async (req, res) => {
    const dato = req.params.busqueda;
    const regex = new RegExp(dato, 'i');
    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
        Medico.find({ nombre: regex })
    ])
    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    })
}

const getDocumentosColeccion = async (req, res) => {
    const dato = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(dato, 'i');
    let resultados = [];
    switch (tabla) {
        case 'medicos':
            resultados = await Medico.find({ nombre: regex }).populate('usuario', 'nombre img').populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            resultados = await Hospital.find({ nombre: regex }).populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            resultados = await Usuario.find({ nombre: regex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla debe ser hospitales, medicos o usuarios'
            })
    }
    res.json({
        ok: true,
        resultados
    })
}
module.exports = {
    getTodo,
    getDocumentosColeccion

}