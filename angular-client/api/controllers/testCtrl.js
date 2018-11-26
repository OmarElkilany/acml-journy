const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.testMethod = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: access to test method denied"
        });
    } else {
        User.findById(req.payload._id)
        .exec(function(err,user){
            console.log('visited test method successfully');
            res.status(200).json(user);
        });
    }
};