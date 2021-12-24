const { response, request } = require('express');
const axios = require('axios').default;

const baseURL = 'http://localhost:39320/iotgateway/read';
const vars = ["plc.casa.Global.Salida1"];
let last = 0;





module.exports = {
    triggerGet
}