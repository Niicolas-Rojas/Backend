const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require('../config.js');

// Función para crear un token de acceso
const crearTokenAcceso = (datosUsuario) => {
  return jwt.sign(datosUsuario, TOKEN_SECRET, { expiresIn: '1h' });
};

module.exports = { crearTokenAcceso };