const express = require("express")
const router = express.Router();

const verify = require('./verifyToken') 

const indexController = require('../controllers/indexController')

const authController = require('../controllers/authController')

const trakerController = require('../controllers/filièreController')

router.get('', indexController.indexmethod)
router.post('', indexController.indexmethodfind)
router.get('/dashbord', indexController.indexdashbord)

router.get('/register',authController.getregister)
router.post('/register',authController.register)


router.get('/login',authController.getlogin)
router.post('/login',authController.login)

router.get('/logout',authController.logout)

router.get('/addprofesseurs', indexController.addprofesseur)
router.post('/addprofesseurs', indexController.createprofesseur)


router.get('/editprofesseurs/:id', indexController.editprofesseur)
router.post('/editprofesseurs/:id', indexController.updateprofesseur)


router.get('/viewprofesseurs/:id', indexController.viewprofesseur)

router.get('/indexfiliere', trakerController.indexfiliere)

router.get('/addfiliere', trakerController.addfiliere)
router.post('/addfiliere', trakerController.createfiliere)

router.get('/editfiliere/:id', trakerController.editfiliere)
router.post('/editfiliere/:id', trakerController.updatefiliere)


router.get('/:id', indexController.deleteprofesseur);
router.get('/indexfiliere/:id', trakerController.deletefiliere);

module.exports = router;