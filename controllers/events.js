const { response } = require('express');
const Evento= require('../models/Evento');

const getEventos = async (req, res= response ) => {

  const eventos = await Evento.find({'user': req.uid}).populate('user','name');

  return res.status(200).json({
    ok:true,
    eventos
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

const actualizarEvento = async (req, res= response ) => {

  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    
    const evento = await Evento.findById(eventoId);

    if(!evento){
      return res.status(200).json({
        ok:true,
        msg: 'El evento suministrado no existe'
      });
    }
    
    if(evento.user.toString() !== uid){
      return res.status(401).json({
        ok:false,
        msg: 'No poseee privilegios para editar este evento'
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid
    }

    const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new: true});


    return res.status(200).json({
      ok:true,
      evento: eventoActualizado
    });

  } catch (error) {

    console.log(error);
    return res.status(200).json({
      ok:false,
      msg: "Ha ocurrido un error procesando su solicitud"
    });
  }
}

const eliminarEvento = async (req, res= response ) => {

  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    
    const evento = await Evento.findById(eventoId);

    if(!evento){
      return res.status(200).json({
        ok:true,
        msg: 'El evento suministrado no existe'
      });
    }
    
    if(evento.user.toString() !== uid){
      return res.status(401).json({
        ok:false,
        msg: 'No poseee privilegios para eliminar este evento'
      });
    }

    const eventoEliminado = await Evento.findByIdAndDelete(eventoId);


    return res.status(200).json({
      ok:true,
      evento: eventoEliminado
    });

  } catch (error) {

    console.log(error);
    return res.status(200).json({
      ok:false,
      msg: "Ha ocurrido un error procesando su solicitud"
    });
  }

}


module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento
}