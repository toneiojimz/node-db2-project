const express = require('express');

const carsRouter = require('./api/cars/carsRouter.js');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/cars', carsRouter);

server.get('/', (req, res) => {
    res.send('Cars are coming!');
})

function logger(req, res, next) {
    const { method, originalUrl } = req;
    console.log(`${method} to ${originalUrl} at ${Date.now()}`);
  
    next();
}

module.exports = server;