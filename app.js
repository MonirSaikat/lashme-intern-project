require('dotenv').config();
require('./utils/db');
const express = require('express');
const cors = require('cors'); 
const errorHandler = require('./utils/errorHandler'); 
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// log route info if dev mode
if(process.env.NODE_ENV === 'development') {
    app.use(require('morgan')('tiny'))
}

app.use(routes);
app.use(errorHandler);

module.exports = app;