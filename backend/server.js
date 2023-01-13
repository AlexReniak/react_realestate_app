const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const routes = require('./routes/index');
const multer = require('multer');

connectDB();

const app = express();

const port = process.env.PORT || 8000

const multerUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024
    }
});

app.use(multerUpload.array('images'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(routes);

app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});