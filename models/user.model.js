const { DataTypes } = require('sequelize');
const db = require('./sqlserver');



const Usuario = db.define("Usuario", {
    nombre: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El nombres es requerido'
            }
        }
    },
    password: {
        type: DataTypes.STRING(12),
        allowNull: false
    },


    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, { db, DataTypes });



module.exports = Usuario;