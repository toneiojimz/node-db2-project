const express = require('express');

const helmet = require('helmet');

const carsRouter = require('../car-dealer/carsRouter.js');

const server = express();
server.use(helmet());

server.use('/api/cars', carsRouter);


module.exports = server;