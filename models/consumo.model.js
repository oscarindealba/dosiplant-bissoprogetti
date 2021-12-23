const { DataTypes } = require('sequelize');
const db = require('./sqlserver');



const Consumo = db.define("Consumo", {
    numsilo: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    gruposilo: {
        type: DataTypes.STRING(40),
        allowNull: false
    },


    setpoint: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: true
    },

    real: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: true
    },
}, { db, DataTypes });



module.exports = Consumo;