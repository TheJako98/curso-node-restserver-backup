const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosDelete, usuariosPut, usuariosPatch } = require('../controllers/users');

const router = Router();


router.get('/', usuariosGet);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.put('/:id', usuariosPut);

router.put('/', usuariosPatch);


module.exports = router;