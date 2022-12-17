const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser } = require('../../controllers/userController');
const auth = require('../../middleware/auth');

router.route('/')
    .post(registerUser)
    .put(auth, updateUser)

router.route('/login')
    .post(loginUser)


module.exports = router;