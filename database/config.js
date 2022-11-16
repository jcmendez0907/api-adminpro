const mongoose = require('mongoose');

const dbConnection = async() =>{
    try{
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB on line');
    }catch(error) {
        console.log(error);
        throw new Error('Error al iniciar la BD ver logs...')
    }
    

}
module.exports = {
    dbConnection
}