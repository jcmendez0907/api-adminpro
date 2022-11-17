const path = require('path');
const fs = require('fs');

const {response} = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');


const fileUpload = ( req, res = response) =>{
    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValido = ['hospitales', 'medicos', 'usuarios'];
    if(!tiposValido.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: 'Requiere un tipo valido: medicos, usuarios, hospitales',
        })
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: 'No se mando archivo'
        });
    }
    // Procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length-1];

    //validar la extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if(!extensionesValidas.includes(extension)){
        return res.status(400).json({
            ok: false,
            msg: 'Extension no permitida',
        })
    }

    //generar nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extension}`;

    //path imagen
    const pathImagen = `./uploads/${tipo}/${nombreArchivo}`;

    // mover imagen
    file.mv(pathImagen, (err)=> {
        if (err){
            console.log(error);
            return res.status(400).json({
                ok: false,
                msg: 'Error al mover la imagen',
            });
        }
        //actualizar base de datos
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok:true,
            msg:'Archivo movido'
        })
    });

}

const retornaImagen = (req, res = response )=>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}` );

    //imagen por defecto 
    if( fs.existsSync(pathImg)){
        res.sendFile( pathImg );
    }else{
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg` );
        res.sendFile( pathImg );
    }
    

}

module.exports = {
    fileUpload,
    retornaImagen,
}