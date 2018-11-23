var mongoose = require('mongoose');
var config = require('./config');
mongoose.connect(config.MONGO_URI).
	then(function () {
		console.log('successfully connected to DB on: ' + config.MONGO_URI);
	}).
	catch(function (err) {
		if(err) {
			console.log(err);
		}
	});

require('../models/users');
