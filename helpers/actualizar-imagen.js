const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const boorarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path)
    }
}
const actualizarImagen = async (coleccion, documentId, nombreArchivo) => {
    switch (coleccion) {
        case 'medicos':
            const medico = await Medico.findById(documentId);
            if (!medico) {
                console.log(`No se encontro un emdico con el id ${documentId}`)
                return false;
            }
            var pathViejo = `./uploads/medicos/${medico.img}`;
            boorarImagen(pathViejo);
            medico.img = nombreArchivo;
            await medico.save();
            return true;
        case 'hospitales':
            const hospital = await Hospital.findById(documentId);
            if (!hospital) {
                console.log(`No se encontro un emdico con el id ${documentId}`)
                return false;
            }
            var pathViejo = `./uploads/hospitales/${hospital.img}`;
            boorarImagen(pathViejo);
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        case 'usuarios':
                const usuario = await Usuario.findById(documentId);
                if (!usuario) {
                    console.log(`No se encontro un emdico con el id ${documentId}`)
                    return false;
                }
                var pathViejo = `./uploads/hospitales/${usuario.img}`;
                boorarImagen(pathViejo);
                usuario.img = nombreArchivo;
                await usuario.save();
                return true;
        default:
            break;
    }
};

module.exports = {
    actualizarImagen,
}