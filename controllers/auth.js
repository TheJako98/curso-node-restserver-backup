const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");
const login = async(req, res = response) => {

    const {correo, password} = req.body;
    
    
    try{

        // Verificar si el email esta registrado
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario o contraseña no validos'
            })
        }
        // El usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario o contraseña no validos'
            })
        }

        // verificar contraseña
        const validPassword =  bcryptjs.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario o contraseña no validos - Password not valid'
            })
        }
        // Generar JWT
        const token = await generarJWT(usuario.id);

    
        res.json({
            msg: 'Login OK',
            token
        })
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            msg:"Error, llame al administrador"
        })
    }


}

module.exports = {
    login
}