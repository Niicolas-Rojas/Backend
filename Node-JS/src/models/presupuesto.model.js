const mongoose = require('mongoose');

const presupuestoSchema = new mongoose.Schema({
    presupuesto: {
        type: Number,
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

module.exports = mongoose.model('Presupuesto', presupuestoSchema);