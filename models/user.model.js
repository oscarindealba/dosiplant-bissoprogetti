const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');




const Usuario = sequelize.define("Usuario", {
    nombre: {
        type: Sequelize.STRING(12),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El nombres es requerido'
            }
        }
    },
    password: {
        type: Sequelize.STRING(12),
        allowNull: false
    },


    estado: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
}, { Sequelize, DataTypes });



module.exports = Usuario;