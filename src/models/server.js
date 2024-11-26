const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const http = require('http');
const userRoutes = require('../routes/user');
const errorHandler = require('../middleware/errorHandler');

class Server {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.port = process.env.PORT || 3000;

        this.paths = {
            user: '/api/user',
        }

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(logger('dev'));
        this.app.use(helmet());
        this.app.use(compression());
    }

    routes() {
        this.app.use(this.paths.user, userRoutes);
        this.app.use(errorHandler);
    }

    listen() {
        this.http.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}