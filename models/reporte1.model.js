const { DataTypes } = require('sequelize');
const db = require('./sqlserver');




const Reporte1 = db.define("Reporte1", {

    iduser: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },


    numbatch: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },

    createdAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,

    },

    updatedAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,

    },

    formula: {
        type: DataTypes.STRING(40),
        allowNull: false
    },


    Silo_1: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: true
    },

    Silo_2: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: true
    },

    Silo_3: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: true
    },

    Silo_4: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: true
    },

    Silo_5: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: true
    },

    Silo_6: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: true
    },

    Silo_7: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: true
    },

    Carga_quimica_AQ: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: true
    },

    Carga_quimica_2: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: true
    },

    TP_2: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: true
    },

    TP_4: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: true
    },

    TotalBatch: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: true
    },
    turno: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },



}, { db, DataTypes });


module.exports = Reporte1;