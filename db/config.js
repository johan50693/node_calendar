const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {

  try {
    await mongoose.connect(process.env.DB_CNN);

    console.log("Conexión exitosa a la BD");
  } catch (error) {
    console.log(error);
    throw new Error("Error en inicialización de BD");
  }
}

module.exports = {
  dbConnection
};