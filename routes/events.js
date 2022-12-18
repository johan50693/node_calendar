/**
 *  Rutas para usuarios / Auth
 *  host /api/events
 */

const { Router } = require('express');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

//Middleware aplicado a todas las peticiones
router.use(validarJWT);

router.get('/', getEventos);
router.post('/', crearEvento);
router.put('/:id', actualizarEvento);
router.delete('/:id', eliminarEvento);



module.exports = router;