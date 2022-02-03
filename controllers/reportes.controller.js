const { response, request } = require('express');
const Reporte1 = require('../models/reporte1.model');
const { Op, Sequelize } = require("sequelize");



const reporte1Get = async(req, res = response) => {
    const reporte1 = await Reporte1.findAll();
    res.json({
        reporte1

    });


};


module.exports = {
    reporte1Get
}