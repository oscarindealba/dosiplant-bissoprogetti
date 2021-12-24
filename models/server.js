const express = require("express");
const bodyParser = require('body-parser');

const cors = require("cors");
const db = require("../models/sqlserver")
const hbs = require("hbs");
const http = require('http');
const axios = require('axios').default;
const { sumaSilos } = require("../controllers/consumos.controller");

const baseURL = 'http://localhost:39320/iotgateway/read?ids=plc.casa.Global.Salida1&ids=plc.casa.Global.timer1.ACC';
const salvaconsURL = "http://localhost:8081/api/consumos/";
const sumsilosURL = "http://localhost:8081/api/consumos/sum"
    //const vars = [{ "id": "plc.casa.Global.timer1.ACC" }, { "id": "plc.casa.Global.Salida1" }];
let last = 0;
let keybucle = false;
let counter = 0;

hbs.registerPartials(__dirname + '/../views/partials');
setInterval(triggerGet, 5000);


class Server {


    constructor() {
        this.app = express();
        this.servidor = http.createServer(this.app);
        this.port = process.env.PORT || 3010;
        this.apiPath = '/api/usuarios';
        this.apiConsumos = '/api/consumos';


        this.dbConnection();
        //middlewares
        this.middlewares();
        //rutas de aplicacion
        this.routes();
        this.listen();




    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Conexion con base de datos OK');
        } catch (error) {
            throw new Error(error);
        }
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
        this.app.use(this.apiConsumos, require('../routes/consumo'));
        // this.app.use(this.getAnio, require('../hbs/helpers'));



        this.app.get("/", (req, res) => {
            res.render("home", {
                userlogin: "Oscar de Alba",
            });
        });

        this.app.get("/produccion", (req, res) => {
            const respuesta = axios.get(sumsilosURL);

            res.render("produccion", {
                userlogin: "Oscar de Alba",
                sumsilosGet: respuesta
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

async function triggerGet() {
    try {
        const response = await axios.get(baseURL);
        const lectura = response.data.readResults;
        let { v: salida } = lectura[0];
        let { v: timer, t: timestamp } = lectura[1];
        let se = timestamp;
        console.log(timer);
        if (salida && se > last && !keybucle) {
            keybucle = true;
            counter = counter + 1;
            if (counter > 7) {
                counter = 1;
            }
            console.log(`Grabando registro: ${timestamp}`);
            last = timestamp;

            const newreg = {
                "numsilo": counter,
                "gruposilo": "Cementantes",
                "formula": "Pegapiso",
                "setpoint": timer,
                "real": 23.5,
                "iduser": 2,
                "turno": 1
            }

            const salvarreg = axios.post(salvaconsURL, newreg);
            console.log(`El valor de contador es ${counter}`);
            console.log(timestamp);

        }

        if (keybucle && !salida) {
            keybucle = false;
        }

    } catch (error) {
        console.log(error);
    }
}


module.exports = Server;