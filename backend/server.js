const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const routes = require('./routes/index');

connectDB();

const app = express();

const port = process.env.PORT || 8000

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(routes);

app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});