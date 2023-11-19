const express = require('express');
const router = express.Router();
const { registro, login, logout, profile, verifyToken } = require('../controllers/auth.controller');
const autRequerida = require("../middlerware/validarToken.js");
const validarSchema = require('../middlerware/validar.middleware.js');
const { registroSchema, loginSchema } = require('../schemas/auth.schema.js');

router.post("/registro", validarSchema(registroSchema), registro);

router.post("/login", validarSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/verify", verifyToken);

router.get("/profile", autRequerida, profile);

module.exports = router;