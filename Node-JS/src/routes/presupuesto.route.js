const express = require('express');
const router = express.Router();
const autRequerida = require('../middlerware/validarToken.js');
const { obtenerPresupuesto,
        obtenerUnPresupuesto,
        crearPresupuesto,
        eliminarPresupuesto,
        actualizarPresupuesto } = require('../controllers/presupuesto.controller.js');

router.get('/presupuesto', autRequerida, obtenerPresupuesto);
router.get('/presupuesto/:id', autRequerida, obtenerUnPresupuesto);
router.post('/presupuesto', autRequerida, crearPresupuesto);
router.delete('/presupuesto/:id', autRequerida, eliminarPresupuesto);
router.put('/presupuesto/:id', autRequerida, actualizarPresupuesto);

module.exports = router;