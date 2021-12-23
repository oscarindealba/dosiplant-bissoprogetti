const path = require('path');
const Server = require('./models/server');
const axios = require('axios').default;


require('dotenv').config();
// const exphbs = require('express-handlebars');
// const session = require('express-session');
// const validator = require('express-validator');
// const passport = require('passport');
// const flash = require('connect-flash');
//const MySQLStore = require('express-mysql-session')(session);
//const bodyParser = require('body-parser');
//const { registerPartials } = require("hbs");

// const instance = axios.create({
//     baseURL: 'http://localhost:39320/iotgateway/read'
// });

const baseURL = 'http://localhost:39320/iotgateway/read';
//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const vars = ["plc.casa.Global.Salida1"];

const server = new Server();


async function getSalida() {
    try {
        const response = await axios.post(baseURL, vars);
        const lectura = response.data.readResults;
        let { v } = lectura[0];

        console.log(v);
    } catch (error) {
        console.log(error);
    }
}

setInterval(getSalida, 100);












//---------------------------------------------------------------------------------






//Express HBS engine