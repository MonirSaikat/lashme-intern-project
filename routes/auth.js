const router = require('express').Router();
const authController = require('../controllers/authController');
const { reigsterRouteValidate, loginRouteValidate } = require('../utils/validator'); 

router.post('/register', reigsterRouteValidate(), authController.register); 
router.post('/login', loginRouteValidate(), authController.login); 

module.exports = router;