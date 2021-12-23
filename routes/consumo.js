const { Router } = require('express');




const {
    consumoGet,

} = require('../controllers/consumos.controller');
const router = Router();

// RUTAS DE APIS
router.get('/', consumoGet);

module.exports = router;