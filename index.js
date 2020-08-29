
const express = require('express');

const cors = require('cors')

require('dotenv').config()

const { dbConnection } = require('./database/config')
//Creacion del servidor express
const app = express();

app.use(cors());
dbConnection();


//Rutas

app.get('/', async(req, res)=>{
    res.status(200).json({
        ok: true,
        mensaje: 'Hola Ale'
    })
})
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo e puerto ${process.env.PORT}`)
})