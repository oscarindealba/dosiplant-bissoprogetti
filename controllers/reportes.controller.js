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

    let turnos = req.query.turnos;
    // let r3 = new Date(a).setHours(23, 59, 59, 999);
    // let r2 = new Date(a).setHours(0, 0, 0, 0);

    // let final = (new Date(r3));
    // let inicio = (new Date(r2));

    const reporte1 = await Reporte1.findAll({
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
        }
    });
    res.json({
        reporte1

    });


};




module.exports = {
    reporte1Get
}