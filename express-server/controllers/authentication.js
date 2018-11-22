const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.register = function (req, res) {
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save(function (err) {
        var token = user.generateJwt();
        return res.status(200).json({
            "token": token
        });
    });
};