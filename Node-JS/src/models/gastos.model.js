const mongoose = require('mongoose');

const gastosSchema = new mongoose.Schema({
    producto: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    tipo_de_gasto: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario",
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Gasto', gastosSchema);
