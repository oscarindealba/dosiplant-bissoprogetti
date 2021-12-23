const { DataTypes } = require('sequelize');
const db = require('./sqlserver');


const RoleSchema = db.define("RoleSchema", {
    rol: {
        type: DataTypes.ENUM("ADMIN_ROLE', 'USER_ROLE"),
        allowNull: true,
        defaultValue: 'USER_ROLE'
    },
});


module.exports = RoleSchema;