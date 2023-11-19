const usuario = require('../models/usuario.model.js');
const bcrypt = require('bcryptjs');
const { crearTokenAcceso } = require('../libs/jwt.js'); // Cambio en la importación
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require('../config.js');

const registro = async (req, res) => {
    const { nombre, email, password } = req.body; //Extracción de datos

    try {

        const userFound = await usuario.findOne({ email });
        //verificacion de correo
        if (userFound) {
            return res.status(400).json({ message: ["El correo ya está en uso"] });
        }

        const passwordHash = await bcrypt.hash(password, 10); //encriptacion de contraseña

        const nuevoUsuario = new usuario({ //creacion de objeto usuario
            
            nombre,
            email,
            password: passwordHash,
        });

        const token = crearTokenAcceso({ id: nuevoUsuario._id }); //token de acceso para el usuario

        await nuevoUsuario.save(); //guardado de objeto usuario

        //creacion de cookie para mantener la informacion del usuario
        res.cookie("token", token);
        
        res.json(formatUserData(nuevoUsuario));
    } catch (error) {
        handleRegistrationError(res, error);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuarioEncontrado = await usuario.findOne({ email });

        if (!usuarioEncontrado) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const contrasenaValida = await bcrypt.compare(password, usuarioEncontrado.password);

        if (!contrasenaValida) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = crearTokenAcceso({ id: usuarioEncontrado._id });

        res.cookie("token", token);
        res.json(formatUserData(usuarioEncontrado));
    } catch (error) {
        handleLoginError(res, error);
    }
};

const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    });
    res.sendStatus(200);
};

const profile = async (req, res) => {
    try {
        const usuarioEncontrado = await usuario.findById(req.usuario.id);

        if (!usuarioEncontrado) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        res.json(formatUserData(usuarioEncontrado));
    } catch (error) {
        handleProfileError(res, error);
    }
};

// Función para dar formato a los datos del usuario
const formatUserData = (user) => ({
    id: user._id,
    nombre: user.nombre,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
});

// Función para manejar errores de registro
const handleRegistrationError = (res, error) => {
    console.error('Error en registro:', error);
    res.status(500).json({ message: error.message });
};

// Función para manejar errores de inicio de sesión
const handleLoginError = (res, error) => {
    console.error('Error en el proceso de inicio de sesión:', error);
    res.status(500).json({ message: "Error en el proceso de inicio de sesión" });
};

// Función para manejar errores de obtención de perfil
const handleProfileError = (res, error) => {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ message: "Error al obtener el perfil del usuario" });
};

const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "No autorizado" });

    jwt.verify(token, TOKEN_SECRET, async (err, decodedUsuario) => {
        if (err) return res.status(401).json({ message: "No autorizado" });
        const usuarioEncontrado = await usuario.findById(decodedUsuario.id);
        if (!usuarioEncontrado) return res.status(401).json({ message: "No autorizado" });
        return res.json({
            id: usuarioEncontrado._id,
            nombre: usuarioEncontrado.nombre,
            email: usuarioEncontrado.email,
        });
    });
};

module.exports = {
    registro,
    login,
    logout,
    profile,
    verifyToken
};