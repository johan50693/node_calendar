const { response } = require('express');
const Usuario = require('../models/Usuario');
var bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

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

    // Generar JWT
    const token= await generarJWT(usuario._id,usuario.name);
  
    res.status(201).json({
      ok: true,
      uid: usuario._id,
      name: usuario.name,
      token
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error procesando su solicitud",
    });
  }
}

const loginUsuario = async (req,res = response) => {

  const { password, email} = req.body;

  try{
    
    const usuario = await Usuario.findOne({email});
    
    if(!usuario){
      return res.status(400).json({
        ok: false,
        msg: "El usuario no se encuentra registrado en el sistema"
      });
    }

    //Confirmar contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password);
    
    if(!validPassword){
      return res.status(400).json({
        ok: false,
        msg: "Contraseña inválida",
      });
    }

    // Generar JWT
    const token= await generarJWT(usuario._id,usuario.name);

    res.json({
      ok: true,
      uid: usuario._id,
      name: usuario.name,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error procesando su solicitud",
    });
  }

}

const revalidarToken = async (req,res = response) => {

  const {uid,name} = req;

  // Generar JWT
  const token= await generarJWT(uid,name);

  res.json({
    ok: true,
    uid,
    name,
    token
  });

}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
};