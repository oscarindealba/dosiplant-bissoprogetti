const { response, request } = require('express');
const Consumo = require('../models/consumo.model');
const { Op, Sequelize } = require("sequelize");






const consumoGet = async(req, res = response) => {
    const consumos = await Consumo.findAll({
        where: {
            setpoint: {
                [Op.notBetween]: [0, 0]
            }
        },
        attributes: [
            'numsilo', 'numbatch', 'numorden', 'gruposilo', 'formula', 'setpoint', 'real', 'iduser', 'turno', 'createdAt', 'updatedAt', [Sequelize.literal('(`real`-`setpoint`)'), 'diferencia'],
            [Sequelize.literal('100*(`real`-`setpoint`)/`setpoint`'), 'porcentaje']
        ],


    });

    const resSum = await Consumo.findAll({
        attributes: [
            ['numsilo', 'silo'],
            [Sequelize.fn('SUM', Sequelize.col('real')), 'consumo'],

        ],
        group: ['Consumo.numsilo'],
        raw: true
    });




    res.json([resSum, consumos]);
};

const consumoTurnoGet = async(req, res = response) => {
    const silosTurno = await Consumo.findAll({
        where: {
            gruposilo: 'Silos'
        },
        attributes: [
            'turno', [Sequelize.fn('SUM', Sequelize.col('real')), 'silos'],

        ],
        group: ['Consumo.turno'],
        raw: true
    });

    const agregadosTurno = await Consumo.findAll({
        where: {
            gruposilo: 'agregados'
        },
        attributes: [
            'turno', [Sequelize.fn('SUM', Sequelize.col('real')), 'agregados'],

        ],
        group: ['Consumo.turno'],
        raw: true
    });

    const quimicosTurno = await Consumo.findAll({
        where: {
            gruposilo: 'quimicos'
        },
        attributes: [
            'turno', [Sequelize.fn('SUM', Sequelize.col('real')), 'quimicos'],

        ],
        group: ['Consumo.turno'],
        raw: true
    });

    const resSum = await Consumo.findAll({
        attributes: [
            ['numsilo', 'silo'],
            [Sequelize.fn('SUM', Sequelize.col('real')), 'consumo'],

        ],
        group: ['Consumo.numsilo'],
        raw: true
    });





    res.json([silosTurno, agregadosTurno, quimicosTurno, resSum]);
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
    consumoTurnoGet,
    sumaSilos
}