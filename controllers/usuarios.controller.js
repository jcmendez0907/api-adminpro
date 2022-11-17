const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res)=>{

    const usuario = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok:true,
        usuario
    })
}

const crearUsuarios = async (req, res = response)=>{
    const {email, password, nombre } = req.body;
    
    try{
        const existeEmail = await Usuario.findOne({email})
        if( existeEmail ){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya esta registrado'
            })
        }
        const usuario = new Usuario(req.body);
    
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //generar JWT
        const token = await generarJWT(usuario._id);
    
        res.json({
            ok:true,
            usuario,
            token
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado..'
        })
    }


}

const actualizarUsuario = async ( req, res = response) =>{

    // validar si es usuario correcto

    const uid = req.params.id;

    try{

        const usuariodb = await Usuario.findById( uid );

        if(!usuariodb){
            res.status(404).json({
                ok:false,
                msg: 'No existe un usuario con este ID..' + uid,
            })
        }

        //Actualizar datos
        const {password, google, email, ...campos} = req.body;

        if(usuariodb.email !== campos.email){
            const existeEmail = await Usuario.findOne({ email});
            res.status(400).json({
                ok:false,
                msg: 'Ya existe un usuario con ese email'
            })
        }

        campos.email = email;

        const actualizado =  await Usuario.findByIdAndUpdate(uid, campos, {new: true});
    
        res.json({
            ok:true,
            usuario: actualizado,
        })

    }catch(error){
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado..'
        })
    }
}

const deleteUsuario = async(req, res = response) =>{

    const uid = req.params.id;
    try{

        const usuariodb = await Usuario.findById( uid );
        if(!usuariodb){
            res.status(404).json({
                ok:false,
                msg: 'No existe un usuario con este ID..' + uid,
            })
        }

        await Usuario.findOneAndDelete( uid );
        res.json({
            ok:true,
            msg: 'Usuario eliminado..',
        })

    }catch(error){
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado..'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    deleteUsuario,
}