const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/user.model');




const usuariosGet = (req, res = response) => {
    const nombre = req.query;
    res.json({
        mensaje: 'get - Controlador',
        nombre: 'oscar'
    });
};

const usuariosPost = (req, res = response) => {
    const { nombre, password, rol } = req.body;
    const usuario = Usuario.build({ nombre, password, rol });
    res.json({
        usuario
    });
};

const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        mensaje: 'put - Controlador',
        id
    });
};

const usuariosPatch = (req, res = response) => {
    const { id, nombre } = req.body;
    res.json({
        mensaje: 'patch - Controlador',
        nombre,
        id
    });
};

const usuariosDelete = (req, res = response) => {
    const { id, nombre } = req.body;
    res.json({
        mensaje: 'delete - Controlador',
        nombre,
        id
    });
};
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}