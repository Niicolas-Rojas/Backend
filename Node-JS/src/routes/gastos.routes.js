const express = require('express');
const router = express.Router();
const autRequerida = require('../middlerware/validarToken.js');
const { obtenerGastos, 
        obtenerUnGasto, 
        crearGasto, 
        eliminarGasto, 
        actualizarGasto } = require('../controllers/gastos.controllers.js');
const validarSchema = require('../middlerware/validar.middleware.js');
const crearGastoSchema = require('../schemas/gastos.schemas.js')

router.get('/gastos', autRequerida, obtenerGastos);

router.get('/gastos/:id', autRequerida, obtenerUnGasto);

router.post(
    '/gastos',
    autRequerida,
    validarSchema(crearGastoSchema),
    crearGasto
);

router.delete('/gastos/:id', autRequerida, eliminarGasto);

router.put('/gastos/:id', autRequerida, actualizarGasto);

module.exports = router;