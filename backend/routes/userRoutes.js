const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authmiddleware');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/user', authenticate, userController.getUser);

module.exports = router;
