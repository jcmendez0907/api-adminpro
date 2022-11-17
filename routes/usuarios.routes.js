/*
Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuarios, actualizarUsuario, deleteUsuario } = require('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);
router.post('/',
[
  validarJWT,
  check('nombre', 'El nombre es requerido ').not().isEmpty(),
  check('password', 'El password es requerido ').not().isEmpty(),
  check('email', 'El email es requerido ').isEmail(),
  validarCampos,
] , crearUsuarios);

router.put('/:id',
[
  validarJWT,
  check('nombre', 'El nombre es requerido ').not().isEmpty(),
  check('email', 'El email es requerido ').isEmail(),
  check('role', 'El rol es obligatorio').not().isEmpty(),
  validarCampos,
] , actualizarUsuario);

router.delete('/:id', validarJWT, deleteUsuario);

module.exports = router;