const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes/auth.routes.js');
const router2 = require('./routes/gastos.routes.js');
const router3 = require('./routes/presupuesto.route.js');


const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(morgan('dev'));

app.use(express.json());

app.use(cookieParser());


app.use('/api', router);
app.use('/api', router2);
app.use('/api', router3);

module.exports = app;