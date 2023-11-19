const Gasto = require('../models/gastos.model.js');

const obtenerGastos = (req, res) => {
    Gasto.find({
        usuario: req.usuario.id
    }).populate('usuario')
        .then((gastos) => {
            res.json(gastos);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error al obtener los gastos' });
        });
};

const obtenerUnGasto = (req, res) => {
    Gasto.findById(req.params.id)
        .then((gasto) => {
            if (!gasto) {
                return res.status(404).json({ message: 'Gasto no encontrado' });
            }
            res.json(gasto);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error al obtener el gasto' });
        });
};

const crearGasto = (req, res) => {
    const { producto, descripcion, valor, tipo_de_gasto, fecha } = req.body;
    const nuevoGasto = new Gasto({
        producto,
        descripcion,
        valor,
        tipo_de_gasto,
        fecha,
        usuario: req.usuario.id
    });

    nuevoGasto
        .save()
        .then((GastoGuardado) => {
            res.json(GastoGuardado);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error al crear el gasto' });
        });
};

const eliminarGasto = (req, res) => {
    Gasto.findByIdAndDelete(req.params.id)
        .then((gasto) => {
            if (!gasto) {
                return res.status(404).json({ message: 'Gasto no encontrado' });
            }
            res.sendStatus(204);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error al eliminar el gasto' });
        });
};

const actualizarGasto = (req, res) => {
    Gasto.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
        .then((gasto) => {
            if (!gasto) {
                return res.status(404).json({ message: 'Gasto no encontrado' });
            }
            res.json(gasto);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error al actualizar el gasto' });
        });
};

module.exports = {
    obtenerGastos,
    obtenerUnGasto,
    crearGasto,
    eliminarGasto,
    actualizarGasto,
};