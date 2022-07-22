const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosDelete, usuariosPut, usuariosPatch } = require('../controllers/users');
const { validarRol, validarEmail, validarId } = require('../helpers/db-validators');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarjwt } = require('../middlewares/validar-jwt');
// const { esAdminRol, tieneRol } = require('../middlewares/validar-roles');
const {validarCampos, validarjwt, tieneRol} = require('../middlewares')


const router = Router();

router.get('/', usuariosGet);

router.post('/',  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail().custom(validarEmail),
    check('password', 'La contraseña debe tener mas de 6 caracteres de longitud.').isLength({min: 6}),
    //check('rol', 'Rol no valido').isIn([]),
    check('rol').custom(validarRol),
    validarCampos 
],  usuariosPost);

router.delete('/:id',[
    validarjwt,
    // esAdminRol,
    tieneRol('ADMIN_ROL', 'USER_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validarId),
    validarCampos
],
usuariosDelete);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId().custom(validarId),
    check('rol').custom(validarRol),
    validarCampos
], usuariosPut);

router.put('/', usuariosPatch);


module.exports = router;