const { Router } = require('express');




const {
    triggerGet,

} = require('../controllers/pac.controller');
const router = Router();

// RUTAS DE APIS
router.get('read?ids=plc.casa.Global.Salida1', triggerGet);

module.exports = router;