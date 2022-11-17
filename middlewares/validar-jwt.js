const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) =>{
    //leer el token
    const token = req.header('x-token');
    if ( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en peticion',
        });
    }
    //verificar token
    try{
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();

    }catch(error){
        console.log(error);
        res.status(401).json({
            ok:false,
            msg: 'Token invalido..'
        })
    }

    
}

module.exports = {
    validarJWT,
}