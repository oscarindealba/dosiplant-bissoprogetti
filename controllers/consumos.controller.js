const { response, request } = require('express');


const Consumo = require('../models/consumo.model');



const consumoGet = async(req, res = response) => {
    const consumos = await Consumo.findAll();
    res.json(consumos)
};




module.exports = {
    consumoGet
}