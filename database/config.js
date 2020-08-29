const mongoose = require('mongoose');

const dbConnection = async () =>{


    try {
        await mongoose.connect(process.env.DB_CNN, 
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log("Base de Datos Online")

    }
    catch (error) {
        console.log(error);
        throw new Error("Error al conectarse a la BD")
    }


}


module.exports = {
    dbConnection
}