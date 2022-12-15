/**
 *  Rutas para usuarios / Auth
 *  host /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');

router.post('/new', 
        [ //middleware
          check('name', 'El nombre es obligatorio').not().isEmpty(),
          check('email', 'El email es obligatorio').isEmail(),
          check('password', 'El password debe ser de 6 caracteres').isLength({min:6}),
        ],
        crearUsuario);

router.post('/', 
        [ //middleware
          check('email', 'El email es obligatorio').isEmail(),
          check('password', 'El password debe ser de 6 caracteres').isLength({min:6}),
        ],
        loginUsuario);

router.get('/renew', revalidarToken);

module.exports = router;