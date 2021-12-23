const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const {
    usuariosGet,
    usuarioGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/user.controller');
const router = Router();

// RUTAS DE APIS
router.get('/', usuariosGet);
router.get('/:id', usuarioGet);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    //check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);
router.put('/:id', usuariosPut);
router.patch('/', usuariosPatch);
router.delete('/', usuariosDelete);

module.exports = router;