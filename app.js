const path = require('path');
const Server = require('./models/server');
const mysql = require('mysql');
require('dotenv').config();
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const { registerPartials } = require("hbs");
const server = new Server();




let conexion = mysql.createConnection({
    host: 'localhost',
    database: 'mars_dsp',
    user: 'root',
    password: 'AbcD1234',
});




//---------------------------------------------------------------------------------

conexion.connect((error) => {
    if (error) {
        throw error;
    } else {
        console.log('La conexion con la base de datos fue establecida');
    }
});

let { ab, bc } = conexion.query('SELECT * from usuarios', (error, result, fields) => {
    if (error)
        throw error;
    result.forEach(result => {
        // console.log(result);
    });
});
console.log(ab);
conexion.end();




//Express HBS engine