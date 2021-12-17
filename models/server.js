const express = require("express");
const hbs = require("hbs");
const http = require('http');
hbs.registerPartials(__dirname + '/../views/partials');

class Server {


    constructor() {
        this.app = express();
        this.servidor = http.createServer(this.app);
        this.port = process.env.PORT || 3010;


        //middlewares
        this.middlewares();
        //rutas de aplicacion
        this.routes();
        this.listen();

    }

    middlewares() {
        this.app.use(express.static(__dirname + '/../dist'));
        this.app.set("view engine", "hbs");

    }

    routes() {

        this.app.get("/", (req, res) => {
            res.render("home"); //, {
            // userlogin: "Oscar de Alba",
            //});
        });

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
        this.servidor.listen(this.port, (err) => {
            if (err) throw new Error(err);
            console.log(`Escuchando peticiones del puerto ${this.port}`);
        });

    }

}

module.exports = Server;