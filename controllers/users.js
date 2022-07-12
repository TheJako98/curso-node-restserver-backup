const {response, request} = require('express');

const usuariosGet =(req, res) => {
    const {nombre} = req.query;
    res.json({msg: 'get api - controller', nombre});
};

const usuariosPost =(req, res) => {
    const {nombre, edad} = req.body;
    res.json({
        msg: "post API - controller",
        nombre,
        edad
    });
};

const usuariosDelete =(req, res) => {
    res.json({msg: 'delite api - controller'});
};

const usuariosPut =(req, res) => {
    const id = req.params.id;
    
    res.json({
        msg: 'put api - controller',
        id
    });
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