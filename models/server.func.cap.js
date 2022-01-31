const express = require("express");
const bodyParser = require('body-parser');

const cors = require("cors");
const db = require("../models/sqlserver")
const hbs = require("hbs");
const http = require('http');
const axios = require('axios').default;
const { sumaSilos } = require("../controllers/consumos.controller");

const baseURL = 'http://127.0.0.1:39320/iotgateway/read?ids=plc.compac.Planta.Global.F9_x.F9_250&ids=plc.compac.Planta.Global.F9_x.F9_251&ids=plc.compac.Planta.Global.F9_x.F9_252&ids=plc.compac.Planta.Global.F9_x.F9_253&ids=plc.compac.Planta.Global.F9_x.F9_254&ids=plc.compac.Planta.Global.S1_DISPLAY_AJUSTADO&ids=plc.compac.Planta.Global.S2_DISPLAY_AJUSTADO&ids=plc.compac.Planta.Global.F8_x.F8_027&ids=plc.compac.Planta.Global.F8_x.F8_028&ids=plc.compac.Planta.Global.F8_x.F8_029&ids=plc.compac.Planta.Global.F14_x.F14_250&ids=plc.compac.Planta.Global.F8_x.F8_095&ids=plc.compac.Planta.Global.ST15_x.ST15_00.DATA&ids=plc.compac.Planta.Global.SP_Final_Real_TP2&ids=plc.compac.Planta.Global.SP_Final_Real_TP4&ids=plc.compac.Planta.Global.F14_x.F14_001&ids=plc.compac.Planta.Global.F14_x.F14_002&ids=plc.compac.Planta.Global.foliodeBatch&ids=plc.compac.Planta.Global.folioOrden&ids=plc.compac.Planta.Global.F8_x.F8_020';
const salvaconsURL = "http://localhost:8081/api/consumos/";
const sumsilosURL = "http://localhost:8081/api/consumos/sum"
    //const vars = [{ "id": "plc.casa.Global.timer1.ACC" }, { "id": "plc.casa.Global.Salida1" }];
let last = 0;
let keybucle = false;
let counter = 0;
let temnumbatch=0;
let bufferbatch=0;


hbs.registerPartials(__dirname + '/../views/partials');
setInterval(triggerGet, 500);


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
                texto:'<button class="btn btn-outline-primary btn-sm mb-1 mb-xl-0" id="download-pdf">Descargar en  PDF</button>',
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
        let { v: real, t: timestamp } = lectura[19];
        let { v: setP1 } = lectura[0];
        let { v: setP2 } = lectura[1];
        let { v: setP3 } = lectura[2];
        let { v: setP4 } = lectura[3];
        let { v: setP5 } = lectura[4];
        let { v: realS1 } = lectura[5];
        let { v: realS2 } = lectura[6];
        let { v: realS3 } = lectura[7];
        let { v: realS4 } = lectura[8];
        let { v: realS5 } = lectura[9];
        let { v: tp2SP } = lectura[10];
        let { v: tp4SP } = lectura[11];
        let { v: nomreceta } = lectura[12];
        let { v: tp2Real}= lectura[13];
        let { v: tp4Real}= lectura[14];
        let { v: quimic1}= lectura[15];
        let { v: quimic2}= lectura[16];
        let { v: numbatch}= lectura[17];
        let { v: numorden}= lectura[18];
        

        let sPA4 = setP4 + setP5;
        let sPA3 = sPA4 + setP3;
        let sPA2 = sPA3 + setP2;
        let sPA1 = sPA2 + setP1;
        let metasABS = [setP5, setP4, setP3, setP2, setP1];
        let metas = [setP5, sPA4, sPA3, sPA2, sPA1];
        let reales = [realS5, realS4, realS3, realS2, realS1, ];
        let extrasSP= [quimic1,quimic2,tp2SP,tp4SP];
        let extrasReal= [quimic1,quimic2,tp2Real,tp4Real];

        if(numbatch != bufferbatch){
            temnumbatch=numbatch;
            bufferbatch=numbatch;
        }
       
//console.log(reales);


        if (real >= metas[counter] && (counter == 0 || counter > last)) {
            last = counter;

            const newreg = {
                "numsilo": 5 - counter,
                "gruposilo": "Silos",
                "formula": nomreceta,
                "setpoint": metasABS[counter],
                "real": reales[counter],
                "iduser": 2,
                "turno": 1,
                "numbatch": temnumbatch,
                "numorden": numorden

            }

            if (metasABS[counter] >= 0) {

                
                const salvarreg = axios.post(salvaconsURL, newreg);

                console.log(`Peso setpoint ${ metas[counter]}`);
                console.log(`Counter ${counter}`);
            }
            counter = 1 + counter;

            console.log(`El valor de contador es ${counter}`);



        }

        if (real <= 0 && counter >= 4) {
            counter = 0;
        }
        if (counter > 4) {
            counter = 4;
            temnumbatch=temnumbatch+1;             
            
        }

    } catch (error) {
        console.log(error);
    }
}


module.exports = Server;