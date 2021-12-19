const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');


const RoleSchema = sequelize.define("RoleSchema", {
    rol: {
        type: Sequelize.ENUM("ADMIN_ROLE', 'USER_ROLE"),
        allowNull: true,
        defaultValue: 'USER_ROLE'
    },
}, { Sequelize, DataTypes });


module.exports = RoleSchema;