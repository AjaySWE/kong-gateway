const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const loggingMiddleware = require('./middlewares/loggingMiddleware');
const errorHandler = require('./utils/errorHandler');

const app = express();
app.use(express.json());
app.use(loggingMiddleware);
app.use('/api', authMiddleware, apiRoutes);
app.use(errorHandler);

module.exports = app;