const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.register = function (req, res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;

    if(!req.body.name || !req.body.email || !req.body.password) {
        return res.status(422).json({
            data: null,
            err: 'Fields were missing',
            msg: null
        });
    }

    if(req.body.password.length < 8) {
        return res.status(422).json({
            data: null,
            err: 'Password must be 8 characters',
            msg: null
        });
    }
    
    var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!filter.test(user.email)) {
        return res.status(422).json({
            data: null,
            err: 'Invalid email address',
            msg: null
        });
    }

    User.findOne({ email: user.email }, function(err, userWithEmail) {
        if(err) {
            return next(err);
        }

        if(userWithEmail) {
            return res.status(422).json({
                data: null,
                err: 'Email address already registered',
                msg: null
            });
        } else {
            user.setPassword(req.body.password);

            user.save(function (err) {
                if(err) { 
                    console.log(err);
                }
                
                var token = user.generateJwt();
                return res.status(200).json({
                    "token": token
                });
            });
        }
    });
};

module.exports.login = function (req, res) {

    if(!req.body.email || !req.body.password) {
        return res.status(422).json({
            data: null,
            err: 'Fields were missing',
            msg: null
        });
    }

    passport.authenticate('local', function (err, user, info) {
        var token;

        if (err) {
            res.status(404).json(err);
            return;
        }

        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};
