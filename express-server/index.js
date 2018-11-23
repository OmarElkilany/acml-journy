require('./config/DBConnection');
const config = require('./config/config');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000

const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./models/users');
require('./config/passport');

const routesApi = require('./routes/routesApi');

app.use(passport.initialize());

// allow cors
app.use(cors({
	credentials: true,
	origin: true
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(cookieParser());

// routes
app.use('/', routesApi);

// error handler
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});

// hey, listen! (Zelda Reference ;-) )
app.listen(port, function () { console.log('Listening on port 3000...'); });
