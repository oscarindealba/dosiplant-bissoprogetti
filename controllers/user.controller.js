const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user.model');



const usuariosGet = async(req, res = response) => {
    const usuarios = await Usuario.findAll();
    res.json({
        usuarios
    });
};

const usuarioGet = async(req, res = response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No estiste un usuario con el id ${id}`
        });
    }
};

const usuariosPost = async(req, res = response) => {
    const user = req.body;

    try {
        const usuario = new Usuario(user);
        await usuario.save();
        res.json({
            usuario
        });

    } catch (error) {
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }

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
    usuarioGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,

}