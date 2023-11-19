const Presupuesto = require('../models/presupuesto.model.js');

const obtenerPresupuesto = (req, res) => {
    Presupuesto.find({
        usuario: req.usuario.id
    }).populate('usuario')
        .then((presupuesto) => {
            res.json(presupuesto);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error al obtener el presupuestos' });
        });
};

const obtenerUnPresupuesto = (req, res) => {
    Presupuesto.findById(req.params.id)
        .then((presupuesto) => {
            if (!presupuesto) {
                return res.status(404).json({ message: 'Presupuesto no encontrado' });
            }
            res.json(presupuesto);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error al obtener el presupuesto' });
        });
};

const crearPresupuesto = (req, res) => {
    const { presupuesto, fecha } = req.body;
    const nuevoPresupuesto = new Presupuesto({
        presupuesto,
        fecha,
        usuario: req.usuario.id
    });

    nuevoPresupuesto
        .save()
        .then((PresupuestoGuardado) => {
            res.json(PresupuestoGuardado);
        })
        .catch((error) => {
            console.error(error); // Registra el error en los registros del servidor
            res.status(500).json({ message: 'Error al crear el presupuesto', error: error.message });
        });
};

const eliminarPresupuesto = (req, res) => {
    Presupuesto.findByIdAndDelete(req.params.id)
        .then((presupuesto) => {
            if (!presupuesto) {
                return res.status(404).json({ message: 'Presupuesto no encontrado' });
            }
            res.sendStatus(204);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error al eliminar el presupuesto' });
        });
};

const actualizarPresupuesto = (req, res) => {
    Presupuesto.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
        .then((presupuesto) => {
            if (!presupuesto) {
                return res.status(404).json({ message: 'Presupuesto no encontrado' });
            }
            res.json(presupuesto);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error al actualizar el presupuesto' });
        });
};

module.exports = {
    obtenerPresupuesto,
    obtenerUnPresupuesto,
    crearPresupuesto,
    eliminarPresupuesto,
    actualizarPresupuesto,
};