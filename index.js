
const express = require('express');

const cors = require('cors')


require('dotenv').config()

const { dbConnection } = require('./database/config')
//Creacion del servidor express
const app = express();

//Configuracion del CORS
app.use(cors());

//Lectura y pareseo del body
app.use( express.json())

//Conexion a BD
dbConnection();

//Directorio Publico

app.use( express.static('public'))

//Rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/login/google', require('./routes/auth'));

app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

// app.get('/', async(req, res)=>{
//     res.status(200).json({
//         ok: true,
//         mensaje: 'Hola Ale'
//     })
// })


// app.get('/api/usuarios', async(req, res)=>{
//     res.status(200).json({
//         ok: true,
//         mensaje: 'Hola Ale'
//     })
// })
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo e puerto ${process.env.PORT}`)
})