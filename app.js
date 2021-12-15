const express = require("express");
const path = require('path');
require('dotenv').config();
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const { registerPartials } = require("hbs");
const app = express();
const hbs = require("hbs");
const http = require('http');
let server = http.createServer(app);
const port = process.env.PORT || 3010;


//---------------------------------------------------------------------------------


require("./hbs/helpers");
app.use(express.static(__dirname + "/dist"));


//Express HBS engine
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("home", {
        userlogin: "Oscar de Alba",
    });
});

app.get("/produccion", (req, res) => {
    res.render("produccion", {
        userlogin: "Oscar de Alba",

    });
});

app.get("/realvssp", (req, res) => {
    res.render("realvssp", {
        userlogin: "Oscar de Alba",

    });
});

app.get("/operacion", (req, res) => {
    res.render("operacion", {
        userlogin: "Oscar de Alba",

    });
});


app.get("/login", (req, res) => {
    res.render("login", {
        userlogin: "Oscar de Alba",

    });
});

server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Escuchando peticiones del puerto ${port}`);
});