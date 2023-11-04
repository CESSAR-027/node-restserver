////IMPORTACIONES
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { rolValido, existeEmail, existeUsuarioId } = require('../helpers/db-validators');

const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete } = require('../controllers/userController');



const router = Router();

//// RUTAS

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contraseña', 'Usa 6 caracteres o más para tu contraseña').isLength({ min: 6 }),
    // check('correo', 'Correo no válido').isEmail(),
    check('correo').custom(existeEmail).isEmail(),
    check('rol').custom(rolValido),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom(rolValido),

    validarCampos
] ,usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
],usuariosDelete);










module.exports = router;