const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const routes = require('./routes/index');
const multer = require('multer');
const path = require('path');

connectDB();

const app = express();

const port = process.env.PORT || 8000

const multerUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

app.use(multerUpload.array('images'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(routes);


if(process.env.NODE_ENV ===  'production') {

    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (_, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'));
} else {
    app.get('/', (_, res) => {
        res.status(200).json({ message: 'Welcome to the React Realestate'});
    });
}

app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});