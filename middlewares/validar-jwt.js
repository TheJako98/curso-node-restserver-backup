const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarjwt = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: "ACCESO NO AUTORIZADO!"
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        // leer el usuario que correponde al uid
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: `Usuario inexistente`
            })
        }


        // Verificar si UID no esta eliminado
        if(!usuario.estado){
            return res.status(401).json({
                msg: `Usuario -${usuario.nombre}- inexistente o dado de baja`
            })
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        res.status(401).json({
            msg: "Acceso no valido/ no autorizado!"
        })
    }

}

module.exports = {
    validarjwt
}