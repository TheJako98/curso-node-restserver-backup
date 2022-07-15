const mongoose = require('mongoose');

const dbcnn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN);
        console.log("Conectado a DB");
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse con la DB:');
    }
}


module.exports = {
    dbcnn
};