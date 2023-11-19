const app = require('./app.js');
const mongodb = require('./db.js');

mongodb();
app.listen(3000);
console.log('Conectado', 3000);