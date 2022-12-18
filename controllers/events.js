const { response } = require('express');
const Evento= require('../models/Evento');

const getEventos = (req, res= response ) => {

  return res.status(200).json({
    ok:true,
    msg: "getEventos"
  });

}

const crearEvento = async (req, res= response ) => {

  const evento = new Evento(req.body);

  try {
    
    evento.user = req.uid;

    const eventoDB = await evento.save();

    return res.status(200).json({
      ok:true,
      evento: eventoDB
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok:true,
      msg: "Ha ocurrido un error procesando su solicitud"
    });
  }
  

}

const actualizarEvento = (req, res= response ) => {

  return res.status(200).json({
    ok:true,
    msg: "actualizarEvento"
  });

}

const eliminarEvento = (req, res= response ) => {

  return res.status(200).json({
    ok:true,
    msg: "eliminarEvento"
  });

}


module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento
}