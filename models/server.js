const express = require("express");
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

        this.app.use(express.json());

        this.app.use(express.static(__dirname + '/../dist'));
        this.app.set("view engine", "hbs");

    }

    routes() {

        this.app.use(this.apiPath, require('../routes/user'));
        this.app.use('/', require('../routes/pages'));

    }

    listen() {
        this.servidor.listen(this.port, (err) => {
            if (err) throw new Error(err);
            console.log(`Escuchando peticiones del puerto ${this.port}`);
        });

    }

}

module.exports = Server;