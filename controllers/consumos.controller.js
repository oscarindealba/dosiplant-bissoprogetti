const { response, request } = require('express');
const Consumo = require('../models/consumo.model');
const { Op, Sequelize } = require("sequelize");





const consumoGet = async(req, res = response) => {
    const consumos = await Consumo.findAll();

    const resSum = await Consumo.findAll({
        attributes: [
            ['numsilo', 'silo'],
            [Sequelize.fn('SUM', Sequelize.col('setpoint')), 'consumo']
        ],
        group: ['Consumo.numsilo'],
        raw: true
    });

    res.json([resSum, consumos]);

    //res.json(consumos)
};


const registraConsumo = async(req, res = response) => {
    const { body } = req;
    try {
        const consumo = new Consumo(body);
        await consumo.save();
        res.json(consumo);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

const sumaSilos = async(req, res = response) => {


    //     for (let i = 1; i <= 7; i++) {



    // }


};


module.exports = {
    consumoGet,
    registraConsumo,
    sumaSilos
}