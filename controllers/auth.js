const { response } = require('express');
const Usuario = require('../models/Usuario');

const crearUsuario = async (req,res = response) => {

  const { name, email, password} = req.body;
  const usuario = new Usuario(req.body);

  try {
    await usuario.save();
  
    res.status(201).json({
      ok: true,
      msg: "register",
      usuario
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