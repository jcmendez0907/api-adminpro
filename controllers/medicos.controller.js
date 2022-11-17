const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');
const Medico = require('../models/Medico');

const getMedicos = async (req, res)=>{

    const registros = await Medico.find({}, 'nombre img usuario hospital').populate('usuario', 'nombre img')
                                                                        .populate('hospital', 'nombre img');

    res.json({
        ok:true,
        registros,
    })
}

const crearMedico = async (req, res = response)=>{
    
    try{

        const registro = new Medico(req.body);
        registro.usuario = req.uid

        await registro.save();

        res.json({
            ok:true,
            registro,
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado..'
        })
    }


}

const actualizarMedico = async ( req, res = response) =>{

    // validar si es registro correcto
    const uid = req.params.id;
    const uidUsuario = req.uid;
    try{

        const registroDB = await Medico.findById( uid );
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
        const registro =  await Medico.findByIdAndUpdate(uid, cambios, {new: true});
    
        res.json({
            ok:true,
            registro,
        })

    }catch(error){
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado..'
        })
    }
}

const deleteMedico = async(req, res = response) =>{

    const uid = req.params.id;
    try{
        const registroDB = await Medico.findById( uid );
        if(!registroDB){
            res.status(404).json({
                ok:false,
                msg: 'No existe un registro con este ID..' + uid,
            })
        }
        await Medico.findOneAndDelete( uid );
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    deleteMedico,
}