const express = require("express");
const http = require('http');
const hbs = require("hbs");
const exphbs = require('express-handlebars');
const { registerPartials } = require("hbs");

const app = express();

class Environment {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3010;
        let server = http.createServer(this.app);
        //middlewares
        // rutas de aplicacion
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express.static(__dirname + "/public"));
        require("./hbs/helpers");
        hbs.registerPartials(__dirname + "/views/partials");
    }
    routes() {
        this.app.get("/", (req, res) => {
            res.render("home");
        });

        this.app.set("view engine", "hbs");


        this.app.get("/produccion", (req, res) => {
            res.render("produccion", {
                userlogin: "Oscar de Alba",

            });
        });

        this.app.get("/realvssp", (req, res) => {
            res.render("realvssp", {
                userlogin: "Oscar de Alba",

            });
        });

        this.app.get("/operacion", (req, res) => {
            res.render("operacion", {
                userlogin: "Oscar de Alba",

            });
        });


        this.app.get("/login", (req, res) => {
            res.render("login", {
                userlogin: "Oscar de Alba",

            });
        });
    }

    listen() {
        this.app.listen(this.port, (err) => {
            if (err) throw new Error(err);
            console.log(`Escuchando peticiones del puerto ${this.port}`);
        });
    }
}

module.exports = Environment;