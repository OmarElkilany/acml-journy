require('./api/config/DBConnection');
const config = require('./api/config/config');
const cors = require('cors');
const express = require('express');
const app = express();

const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./api/models/users');
require('./api/models/journals');
require('./api/config/passport');

const router = require('./api/routes/index');

// create a link to angular build directory
var distDir = path.join(__dirname, '/dist/');
app.use(express.static(distDir));

// initialize passport
app.use(passport.initialize());

// allow cors
app.use(cors({
	credentials: true,
	origin: true
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use('/', router);

// general response
app.get('/*', function(req, res) {
	res.sendFile('index.html', { root: distDir });
});

// error handler
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});

module.exports = app;
