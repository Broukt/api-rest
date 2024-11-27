const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const http = require('http');
const userRoutes = require('../routes/userRoutes');
const errorHandler = require('../middleware/errorHandler');
const db = require('../../models/index');
const authMiddleware = require('../middleware/authMiddleware');

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
        this.app.use(authMiddleware);
    }

    routes() {
        this.app.use(this.paths.user, userRoutes);
        this.app.use(errorHandler);
    }

    listen() {
        db.sequelize.sync({ force: false }).then(() => {
            console.log('Database connected');
        }).catch((error) => {
            console.error('Database connection error:', error);
        });
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = Server;