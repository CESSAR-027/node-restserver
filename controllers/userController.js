const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

////VER USUARIOS (TOTAL)
const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const state = { estado: true };

    const [totalUsuarios, Usuarios] = await Promise.all([
        Usuario.countDocuments(state),
        Usuario.find(state)
            .skip(Number(desde))
            .limit(Number(limite)),

    ]);

    res.json({ totalUsuarios, Usuarios });

    //  const usuarios = await Usuario.find(state)
    //  .skip(Number(desde))
    //  .limit(Number(limite));
    // const totalUsuarios = await Usuario.countDocuments(state);

    //  res.json({totalUsuarios, usuarios});
}
////CREAR USUARIO
const usuariosPost = async (req, res = response) => {

    const { nombre, correo, contraseña, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, contraseña, rol });

    //// Cifrar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.contraseña = bcryptjs.hashSync(contraseña, salt);

    //// Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}
////ACTUALIZAR USUARIO
const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, contraseña, google, correo, ...resto } = req.body;

    ////validar contra la BD
    if (contraseña) {
        //// Cifrar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.contraseña = bcryptjs.hashSync(contraseña, salt);
    }


    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch Api - CONTROLADOR',
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    ////ELIMINAR FISICAMENTE
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    res.json( usuario);
}



module.exports =
{
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}