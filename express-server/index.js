const express = require('express');
const app = express();
const port = 3000
const api = require('./routes/api');

app.use('/', api);

app.listen(port, function() { console.log('Listening on port 3000...'); });
