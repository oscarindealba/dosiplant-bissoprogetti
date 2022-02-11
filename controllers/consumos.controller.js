const { response, request } = require('express');
const Consumo = require('../models/consumo.model');
const { Op, Sequelize } = require("sequelize");

options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'America/Mexico_City'
};
let formatter = new Intl.DateTimeFormat('es-Es', options);

const consumoGet = async(req, res = response) => {
    let a = req.query.fechaFiltro;
    let turnos = req.query.turnos;
    let inicio = '';
    let final = '';
    let dia = 0;
    if (!a) {
        let date = new Date();
        dia = date.getDate() + 1;
        console.log(dia);
        inicio = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getDate()).padStart(2, '0') + ' ' + '00:00:00';
        final = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getDate()).padStart(2, '0') + ' ' + '23:00:00';


    } else {
        let date = new Date(a);
        dia = date.getDate() + 1;
        console.log(dia);
        inicio = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + dia).padStart(2, '0') + ' ' + '00:00:00';
        final = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + dia).padStart(2, '0') + ' ' + '23:59:59';


    }


    const consumos = await Consumo.findAll({
        where: {
            setpoint: {
                [Op.notBetween]: [0, 0]
            },
            [Op.or]: [
                { turno: turnos[0] },
                { turno: turnos[1] },
                { turno: turnos[2] }
            ],
            [Op.and]: [{
                createdAt: {
                    [Op.gt]: inicio,
                    [Op.lte]: final
                }
            }]
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
        where: {
            [Op.or]: [
                { turno: turnos[0] },
                { turno: turnos[1] },
                { turno: turnos[2] }
            ],
            [Op.and]: [{
                createdAt: {
                    [Op.gt]: inicio,
                    [Op.lte]: final
                }
            }]
        },
        group: ['Consumo.numsilo'],
        raw: true
    });

    const silosTurno = await Consumo.findAll({
        where: {
            gruposilo: 'Silos',


        },
        attributes: [
            'turno', [Sequelize.fn('SUM', Sequelize.col('real')), 'silos'],

        ],
        group: ['Consumo.turno'],
        raw: true
    });

    const agregadosTurno = await Consumo.findAll({
        where: {
            gruposilo: 'agregados',

        },
        attributes: [
            'turno', [Sequelize.fn('SUM', Sequelize.col('real')), 'agregados'],

        ],
        group: ['Consumo.turno'],
        raw: true
    });

    const quimicosTurno = await Consumo.findAll({
        where: {
            gruposilo: 'quimicos',
            turno: {

                [Op.or]: turnos
            },
        },
        attributes: [
            'turno', [Sequelize.fn('SUM', Sequelize.col('real')), 'quimicos'],

        ],
        group: ['Consumo.turno'],
        raw: true
    });


    res.json([resSum, consumos, silosTurno, agregadosTurno, quimicosTurno]);
};

const consumoTurnoGet = async(req, res = response) => {
    const turnos = JSON.parse(`[${req.query.turnos}]`);
    //console.log(turnos);
    const silosTurno = await Consumo.findAll({
        where: {
            gruposilo: 'Silos',


        },
        attributes: [
            'turno', [Sequelize.fn('SUM', Sequelize.col('real')), 'silos'],

        ],
        group: ['Consumo.turno'],
        raw: true
    });

    const agregadosTurno = await Consumo.findAll({
        where: {
            gruposilo: 'agregados',

        },
        attributes: [
            'turno', [Sequelize.fn('SUM', Sequelize.col('real')), 'agregados'],

        ],
        group: ['Consumo.turno'],
        raw: true
    });

    const quimicosTurno = await Consumo.findAll({
        where: {
            gruposilo: 'quimicos',
            turno: {

                [Op.or]: turnos
            }
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
        where: {
            [Op.or]: [
                { turno: turnos[0] },
                { turno: turnos[1] },
                { turno: turnos[2] }
            ]
        },
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