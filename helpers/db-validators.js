const Rol = require('../models/rol');
const Usuario = require('../models/usuario');

const validarRol = async(rol = '') => {
    const existeRol = await Rol.findOne({rol});
    if (!existeRol){
        throw new Error(`El rol ${rol}, no es valido, no existe en la DB`);
    }
}

const validarEmail = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail){
        throw new Error(`El correo ${correo} ya se encuentra registrado`);
    }
}

const validarId = async(id = '') => {
    const existeId = await Usuario.findById(id);
    if (!existeId){
        throw new Error(`El Id ${id} no se encuentra registrado`);
    }
}

module.exports = {
    validarRol,
    validarEmail,
    validarId
}