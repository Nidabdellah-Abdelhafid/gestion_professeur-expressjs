const express = require("express")
const router = express.Router();

const verify = require('./verifyToken') 

const indexController = require('../controllers/indexController')


const authController = require('../controllers/authController')


router.get('', indexController.indexmethod)
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

router.get('/:id', indexController.deleteprofesseur);


module.exports = router;