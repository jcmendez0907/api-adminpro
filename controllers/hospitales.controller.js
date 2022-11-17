const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');
const Hospital = require('../models/Hospital');

const getHospitales = async (req, res)=>{

    const hospitales = await Hospital.find({}, 'nombre img usuario').populate('usuario', 'nombre img');

    res.json({
        ok:true,
        registros: hospitales
    })
}

const crearHospital = async (req, res = response)=>{
    
    try{

        const hospital = new Hospital({usuario: req.uid, ...req.body});
        hospital.usuario = req.uid

        await hospital.save();
    
        res.json({
            ok:true,
            hospital
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado..'
        })
    }


}

const actualizarHospital = async ( req, res = response) =>{

    // validar si es registro correcto
    const uid = req.params.id;
    const uidUsuario = req.uid;
    try{

        const registroDB = await Hospital.findById( uid );
        if(!registroDB){
            res.status(404).json({
                ok:false,
                msg: 'No existe un registro con este ID..' + uid,
            })
        }

        //Actualizar datos
        const cambios = {
            ...req.body,
            usuario: uidUsuario
        }
        const actualizado =  await Hospital.findByIdAndUpdate(uid, cambios, {new: true});
    
        res.json({
            ok:true,
            hospital: actualizado,
        })

    }catch(error){
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado..'
        })
    }
}

const deleteHospital = async(req, res = response) =>{

    const uid = req.params.id;
    try{

        const registroDB = await Hospital.findById( uid );
        if(!registroDB){
            res.status(404).json({
                ok:false,
                msg: 'No existe un registro con este ID..' + uid,
            })
        }

        await Hospital.findOneAndDelete( uid );
        res.json({
            ok:true,
            msg: 'Registro eliminado..',
        })

    }catch(error){
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado..'
        })
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    deleteHospital,
}