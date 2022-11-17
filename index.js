const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');

//crear serv express
const app = express();

//configurar por cors
app.use ( cors() );

//lectura y parseo de body
app.use( express.json() );

//base de datos
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));



app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendoe n puerto ${process.env.PORT}`);
})