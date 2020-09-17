const { response } = require('express');
const path  = require('path')
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const fs = require('fs');
const fileUpload = async (req, res= response) => {
    const coleccion = req.params.tabla;
    const documentId = req.params.documentId;

    const coleccionesValidas = ['hospitales', 'medicos', 'usuarios'];

    if (!coleccionesValidas.includes(coleccion)) {
        return res.status(400).json({
            ok: false,
            msg: "La coleccion no es valida"
        })
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'NO hay ningun archivo'
        });
    }
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.'); // ale.1.2.3.jpeg
    const extensionArchico = nombreCortado[ nombreCortado.length - 1];

    //extensiones validas
    const extensionesValidas = ['png','jpeg','jpg','gif'];
    if (!extensionesValidas.includes(extensionArchico)){
        return res.json({
            ok: false,
            msg: "No es una extension valida"
        })
    }

    //generar nombre archivo

    const nombreArchivo = `${uuidv4()}.${extensionArchico}`;

    //Path para guardar imagen

    const path = `./uploads/${coleccion}/${nombreArchivo}`;
    file.mv(path, (err) => {
        if (err){
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });

        }
    
        //Actualizar BD
        const exito = actualizarImagen(coleccion, documentId, nombreArchivo);

        return res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        })
      });
}


const getImagen = (req, res = response)=>{
    const coleccion = req.params.tabla;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${coleccion}/${foto}`);
    // Imagen por default
    if (fs.existsSync(pathImg)){
        return res.sendFile(pathImg)

    }
    else{
        let pathImg = path.join(__dirname, `../uploads/noimg.png`);
        return res.sendFile(pathImg)
    }
}
module.exports = {
    fileUpload,
    getImagen
}