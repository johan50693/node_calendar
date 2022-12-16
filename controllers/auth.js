const { response } = require('express');
const Usuario = require('../models/Usuario');
var bcrypt = require('bcryptjs');

const crearUsuario = async (req,res = response) => {

  const { email, password} = req.body;
  
  try {

    let usuario = await Usuario.findOne({email});
    
    if(usuario){
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya se encuentra registrado"
      });
    }
    
    usuario = new Usuario(req.body);

    let salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
  
    res.status(201).json({
      ok: true,
      uid: usuario._id,
      name: usuario.name
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error procesando su solicitud",
    });
  }
}

const loginUsuario = (req,res = response) => {

  const { password, email} = req.body;

  res.json({
    ok: true,
    msg: "login",
    email,
    password
  });

}

const revalidarToken = (req,res = response) => {

  res.json({
    ok: true,
    msg: "renew"
  });

}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
};