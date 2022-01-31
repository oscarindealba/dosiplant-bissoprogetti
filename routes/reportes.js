
const { Router } = require('express');

const {
    reporte1Get

} = require('../controllers/reportes.controller');

const router = Router();

// RUTAS DE APIS
router.get('/',reporte1Get);

module.exports = router;