const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const router = express.Router();

router.get('/', function(req, res, next) { res.send('Server is working, boy.'); });



module.exports = router;
