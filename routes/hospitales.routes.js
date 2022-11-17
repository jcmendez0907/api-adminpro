/*
/api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitales, crearHospital, actualizarHospital, deleteHospital } = require('../controllers/hospitales.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',  getHospitales);
router.post('/',
[
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario ').not().isEmpty(),
    validarCampos,
] , crearHospital);

router.put('/:id',
[
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario ').not().isEmpty(),
    validarCampos,
] , actualizarHospital);

router.delete('/:id', validarJWT, deleteHospital);

module.exports = router;