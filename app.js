const path = require('path');
const Server = require('./models/server');
const Serversql = require('./models/sqlserver');

require('dotenv').config();
// const exphbs = require('express-handlebars');
// const session = require('express-session');
// const validator = require('express-validator');
// const passport = require('passport');
// const flash = require('connect-flash');
//const MySQLStore = require('express-mysql-session')(session);
//const bodyParser = require('body-parser');
//const { registerPartials } = require("hbs");



const server = new Server();
const sqlserver = new Serversql();









//---------------------------------------------------------------------------------






//Express HBS engine