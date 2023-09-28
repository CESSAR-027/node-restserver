const { response } = require('express');



const usuariosGet = (req = request, res = response) => {

    const {nombre, apikey, desc='no description', page= 1} = req.query;

    res.json({
        msg: 'Get Api - CONTROLADOR',
        nombre, apikey, desc, page
    });
}

const usuariosPost = (req, res = response) => {
    const {nombre, edad, estado}  = req.body;


    res.status(201).json({
        msg: 'Post Api - CONTROLADOR',
        nombre, edad, estado
    });
}

const usuariosPut = (req, res = response) => {

const id = req.params.userId;

    res.json({
        msg: 'Put Api - CONTROLADOR',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch Api - CONTROLADOR',
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Delete Api - CONTROLADOR',
    });
}



module.exports =
{
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}