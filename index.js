const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');

//crear serv express
const app = express();

//configurar por cors
app.use ( cors() );

//carpeta publica
app.use( express.static('public'))

//lectura y parseo de body
app.use( express.json() );

//base de datos
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/hospitales', require('./routes/hospitales.routes'));
app.use('/api/medicos', require('./routes/medicos.routes'));
app.use('/api/todo', require('./routes/busquedas.routes'));
app.use('/api/uploads', require('./routes/uploads.routes'));
app.use('/api/login', require('./routes/auth.routes'));



app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendoe n puerto ${process.env.PORT}`);
})