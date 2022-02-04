const { response, request } = require('express');
const Reporte1 = require('../models/reporte1.model');
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



const reporte1Get = async(req, res = response) => {

    let a = req.query.fechaFiltro;
    let turno = req.query.selTurno;

    //let dd = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();

    //let selectedDate = new Date(a);
    let b = new Date(a).setHours(0, 0, 0, 0);
    let TODAY_START = new Date(b);
    console.log(`la fecha es: ${a}`);
    const reporte1 = await Reporte1.findAll({
        where: {
            [Op.and]: [{
                    createdAt: {
                        [Op.gt]: TODAY_START,
                        [Op.lte]: a
                    }
                },
                {
                    turno: {
                        [Op.eq]: turno
                    }
                }

            ]
        }
    });
    res.json({
        reporte1

    });


};




module.exports = {
    reporte1Get
}