const express3 = require('express');
const userController = require('../controllers/UserController');

const router3 = express3.Router();

router3.post('/login', userController.loginOne);
router3.post('/register', userController.registerOne);
module.exports = router2;
