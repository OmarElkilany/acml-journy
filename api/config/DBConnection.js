var mongoose = require('mongoose');
var uri = process.env.MONGO_URI || 'mongodb://localhost:27017/journy'; // default for development
mongoose.connect(uri).
	then(function () {
		console.log('successfully connected to DB on: ' + uri);
	}).
	catch(function (err) {
		if(err) {
			console.log(err);
		}
	});

require('../models/users');
