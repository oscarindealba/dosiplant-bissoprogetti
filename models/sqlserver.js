const Sequelize = require('sequelize');

const db = new Sequelize('mars_dsp', 'root', 'AbcD1234', {
    host: 'localhost',
    dialect: 'mysql',

});



module.exports = db;