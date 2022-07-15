const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req, res) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado:true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        ]);

    res.json({
        total, 
        usuarios
    });
    
};

const usuariosPost = async (req, res) => {
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await usuario.save();
    res.json(usuario);
};

const usuariosDelete =async(req, res) => {
    const {id} = req.params;

    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json({usuario});
};

const usuariosPut = async(req, res) => {
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;
    
    //TODO validar contra base de datos
    if(password) {
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg:`El usuario ${resto.nombre} fue actualizado`,
        usuario
    })

};

const usuariosPatch =(req, res) => {
    res.json({msg: 'patch api - controller'});
};

module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPut,
    usuariosPatch
}