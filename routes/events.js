/**
 *  Rutas para usuarios / Auth
 *  host /api/events
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

//Middleware aplicado a todas las peticiones
router.use(validarJWT);

router.get('/', getEventos);
router.post('/', [
        check('title','El titutlo es obligatorio').not().isEmpty(),
        check('start','La fecha de inicio es obligatoria').custom(isDate),
        check('end','La fecha de finalización es obligatoria').custom(isDate),
        validarCampos
      ],crearEvento);

router.put('/:id', actualizarEvento);
router.delete('/:id', eliminarEvento);



module.exports = router;