// TODO: Use the env variable for the secret
const express = require('express');
const jwt = require('express-jwt');
const auth = jwt({
    secret: 'secret_env_variable',
    userProperty: 'payload'
});

const testCtrl = require('../controllers/testCtrl');
const authCtrl = require('../controllers/authentication');
const journalCtrl = require('../controllers/journalCtrl');

const router = express.Router();

router.get('/', function (req, res, next) { res.send('Server is working, boy.'); });

var isAuthenticated = function (req, res, next) {
    passport.authenticate('jwt', { session: false }, function (err, user) {
        if (err) {
            return next(err);
        } else if (!user) {
            return res.status(401).json({
                data: null,
                error: null,
                msg: 'User Is Not Signed In!'
            });
        }
        req.user = user;

        return next();
    })(req, res, next);
};

// test example
router.get('/test', auth, testCtrl.testMethod);

//------------- Authentication Routes ---------------//
router.post('/register', authCtrl.register);

router.post('/login', authCtrl.login);
//---------------------------------------------------//

//------------- Authentication Routes ---------------//
router.get('/journal/getJournal/:journalID', journalCtrl.getJournal);

router.post('journal/search', journalCtrl.search);

router.post('/journal/createJournal', isAuthenticated, journalCtrl.createJournal);

router.patch('/journal/editJournal/:journalID', isAuthenticated, journalCtrl.editJournal);

router.delete('/journal/deleteJournal/:journalID', isAuthenticated, journalCtrl.deleteJournal);
//---------------------------------------------------//

module.exports = router;
