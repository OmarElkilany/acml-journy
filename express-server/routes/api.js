const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) { res.send('Server is working, boy.'); });

module.exports = router;
