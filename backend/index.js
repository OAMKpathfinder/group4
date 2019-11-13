'use strict';
require('dotenv').config();
require('pretty-error').start();

const express = require("express");
const path = require("path");
const lumie = require("lumie");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./models')

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

lumie.load(app, {
    preURL:"api",
    verbose: true,
    ignore: ["*.spec", "*.action", "*.validate"],
    controllers_path: path.join(__dirname, "controllers")
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    console.log(error);
    res.send(error);
});

db.sequelize.sync().then(() => {
    const server = app.listen(3000, 'localhost', () => {
        const {address, port} = server.address();
        console.log("\nListening at http://%s:%s\n", address, port);
    });
}).catch(err => {
    console.error('Could not establish connection to database.')
    console.error(err)
})
