const z = require('zod');

const crearGastoSchema = z.object({
    producto: z.string({ 
        required_error: "Un nombre de producto es requerido",
        invalid_type_error: "Asegurece que los caracteres sean letras"
    }),
    descripcion: z.string({
        required_error: "Una descripcion es requerida"
    }),
    valor: z.number({
        required_error: "El valor del producto es requerido",
        invalid_type_error: "Asegurece que los caracteres sean numeros"
    }),
    tipo_de_gasto: z.string({
        required_error: "El tipo de gasto es requerido"
    }),
    fecha: z.string().datetime().optional(),
});

module.exports = crearGastoSchema;