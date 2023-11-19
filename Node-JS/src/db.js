const mongoose = require('mongoose');

const mongodb = async () => { //conexion a la base de datos

    mongoose.connect('mongodb+srv://rodrigo:wzzv.1298@pagina.gk1ypok.mongodb.net/?retryWrites=true&w=majority')
        .then(() => console.log('Conectado a la base de datos'))
        .catch(() => console.log('error'));

}

module.exports = mongodb;
