const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const hbs = require("hbs");
const http = require('http');
hbs.registerPartials(__dirname + '/../views/partials');

class Server {


    constructor() {
        this.app = express();
        this.servidor = http.createServer(this.app);
        this.port = process.env.PORT || 3010;
        this.apiPath = '/api/usuarios';


        //middlewares
        this.middlewares();
        //rutas de aplicacion
        this.routes();
        this.listen();

    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //LECTURA Y PARSEO


        this.app.use(express.static(__dirname + '/../dist'));
        this.app.set("view engine", "hbs");
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))

    }

    routes() {



        this.app.use(this.apiPath, require('../routes/user'));


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