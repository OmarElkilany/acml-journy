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

// test example
router.get('/test', auth, testCtrl.testMethod);

//------------- Authentication Routes ---------------//
router.post('/register', authCtrl.register);

router.post('/login', authCtrl.login);
//---------------------------------------------------//

//------------- Journal Routes ---------------//
router.get('/journal/getJournal/:journalID', journalCtrl.getJournal);

router.post('journal/search', journalCtrl.search);

router.post('/journal/createJournal', journalCtrl.createJournal);

router.patch('/journal/editJournal/:journalID', journalCtrl.editJournal);

router.delete('/journal/deleteJournal/:journalID/:user', journalCtrl.deleteJournal);
//---------------------------------------------------//

module.exports = router;
