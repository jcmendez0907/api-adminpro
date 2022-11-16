const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');

//crear serv express
const app = express();

//configurar por cors
app.use ( cors() );

//base de datos
dbConnection();

//rutas
app.get('/', (req, res) => {
    res.json({
        ok:true,
        msg: 'Hola mundo'
    })
  })

app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendoe n puerto ${process.env.PORT}`);
})