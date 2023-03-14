const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PORT } = require('./src/helpers/env');
const router = require('./src/routers');

const server = express();
const logger = morgan(
  ':method : url :status :res[content-length] - :response-time ms',
);
const host = 'http://localhost:';
const port = PORT || 8000;

server.use(cors());
server.use(express.json());
server.use(logger);
server.use(router);

server.listen(port, (req, res) =>
  console.log(`Server running at ${host}${port}`),
);
