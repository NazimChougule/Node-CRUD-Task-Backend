const express = require('express');
const cors = require('cors');

const categoryRoute = require('./routes/categoryRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/categories', categoryRoute);

module.exports = app;