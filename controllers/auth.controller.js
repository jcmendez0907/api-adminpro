const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async( req, res = response)=>{
    const { email, password } = req.body;

    try{
        const usuarioDB = await Usuario.findOne({email})
        //verificar email
        if(!usuarioDB){
            res.status(404).json({
                ok:false,
                msg:'Datos incorrectos',
            })
        }
        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            res.status(404).json({
                ok:false,
                msg:'Datos incorrectos',
            })
        }

        //generar JWT
        const token = await generarJWT(usuarioDB._id)

        res.json({
            ok:true,
            token
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hble con el administrador'
        })
    }
}

const googleSingIn = async( req, res = response)=>{

    try{
        const { email, name, picture} = await googleVerify( req.body.token );

        const registroDB = await Usuario.findOne({email});
        let usuario;
        if(!registroDB){
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            usuario = registroDB;
            //mantener password
            usuario.google = true;
        }

        await usuario.save();

        //generar JWT
        const token = await generarJWT( usuario.id);

        res.json({
            ok:true,
            email, name, picture,
            token
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error token google'
        })
    }


}

module.exports = {
    login,
    googleSingIn
}