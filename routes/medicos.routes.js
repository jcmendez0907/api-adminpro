/*
/api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { actualizarMedico, crearMedico, getMedicos, deleteMedico } = require('../controllers/medicos.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',  getMedicos);
router.post('/',
[
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('hospital', 'El id de hospital debe ser valido').isMongoId(),
    validarCampos,
] , crearMedico);

router.put('/:id',
[

] , actualizarMedico);

router.delete('/:id', deleteMedico);

module.exports = router;