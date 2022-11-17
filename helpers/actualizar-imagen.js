const fs = require('fs');

const Hospital = require("../models/Hospital")
const Medico = require("../models/Medico")
const Usuario = require("../models/Usuario")

const borrarImagen = async(path)=>{
    if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}
const actualizarImagen = async (tipo, id, nombreArchivo)=>{
    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico){
                console.log('No encontro medico por ID');
                return false;
            }
             pathViejo = `./uploads/medicos/${medico.img}`;
            await borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log('No encontro registro por ID');
                return false;
            }
             pathViejo = `./uploads/hospitales/${hospital.img}`;
            await borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('No encontro registro por ID');
                return false;
            }
             pathViejo = `./uploads/usuarios/${usuario.img}`;
            await borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
    }

}

module.exports = {
    actualizarImagen,
}