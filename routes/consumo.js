const { Router } = require('express');




const {
    consumoGet,
    registraConsumo,
    consumoTurnoGet,
    sumaSilos

} = require('../controllers/consumos.controller');



const router = Router();

// RUTAS DE APIS
router.get('/', consumoGet);
router.get('/turno/', consumoTurnoGet);
router.post('/', registraConsumo);
router.get('/sum/', sumaSilos);


module.exports = router;