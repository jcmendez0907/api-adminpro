const { response } = require('express');
const Hospital = require('../models/Hospital');
const Medico = require('../models/Medico');

const Usuario = require('../models/Usuario');

const getTodo = async (req, res=response)=>{

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i');

    try {
        // const usuarios = await Usuario.find({ nombre: regex});
        // const medicos = await Medico.find({ nombre: regex});
        // const hospitales = await Hospital.find({ nombre: regex});

        const [usuarios, medicos, hospitales] = await Promise.all([
            Usuario.find({ nombre: regex}),
            Medico.find({ nombre: regex}),
            Hospital.find({ nombre: regex})
        ]);

        res.json({
            ok:true,
            usuarios,
            medicos,
            hospitales
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado..'
        })
    }
 
}

const getDocumentosColeccion = async (req, res=response)=>{

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i');
    let data = [];
    try {

        switch (tabla){
            case 'medicos':
                data = await Medico.find({ nombre: regex})
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
                break;
            case 'hospitales':
                data = await Hospital.find({ nombre: regex})
                                .populate('usuario', 'nombre img');
                break;
            case 'usuarios':
                data = await Usuario.find({ nombre: regex});
                break;
            default:
                res.status(400).json({
                    ok:false,
                    msg: 'Debe incluir la tabla: usuarios-medicos-hospitales'
                })
                break;

        }

        res.json({
            ok:true,
            data
        })


    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado..'
        })
    }
 
}


module.exports = {
    getTodo,
    getDocumentosColeccion,
}