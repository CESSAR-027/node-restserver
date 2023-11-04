const Role = require('../models/role');
const Usuario = require('../models/usuario');


const rolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en DB`);

    }
}

const existeEmail = async( correo = '' ) =>{

    //// Verificar si el correo existe
    const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {
        throw new Error(`El correo: ${correo}, ya esta registrado`);
    }

}
const existeUsuarioId = async( id ) =>{

    //// Verificar si el id del usuario existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El Id no existe, ${id}`);
    }

}

module.exports = {
    rolValido,
    existeEmail,
    existeUsuarioId
}