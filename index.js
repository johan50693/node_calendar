const express = require('express');
const { dbConnection } = require('./db/config');
require('dotenv').config();
const cors = require('cors');
// Crear aplicación 
const app = express();

// Conexion BD
dbConnection();

//CORS
app.use(cors());

// Directorio publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));

// Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});