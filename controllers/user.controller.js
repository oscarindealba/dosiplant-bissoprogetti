const { response } = require('express');


const usuariosGet = (req, res = response) => {
    const query = req.query;
    res.json({
        mensaje: 'get - Controlador',
        query
    });
};

const usuariosPost = (req, res = response) => {
    const { id, nombre } = req.body;
    res.json({
        mensaje: 'post - Controlador',
        nombre,
        id
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