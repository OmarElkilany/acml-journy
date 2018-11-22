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
app.use('/', routesApi);

app.listen(port, function() { console.log('Listening on port 3000...'); });
