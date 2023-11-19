const z = require('zod');

const registroSchema = z.object({
    nombre: z.string({ 
        required_error: "Un nombre es requerido",
        invalid_type_error: "Asegurece que los caracteres sean letras"
    }),
    email: z.string({
        required_error: "Un email es requerido"
    }).email({
        message: "Correo inválido"
    }),
    password: z.string({
        required_error: "Una contraseña es requerida"
    }).min(5, {
        message: "La contraseña debe tener al menos 5 caracteres"
    }),
});

const loginSchema = z.object({
    email: z.string({
        required_error: "Un email es requerido"
    }).email({
        message: "Correo inválido"
    }),
    password: z.string({
        required_error: "Una contraseña es requerida"
    }).min(5, {
        message: "La contraseña debe tener al menos 5 caracteres"
    }),
});

module.exports = {
    registroSchema,
    loginSchema,
};