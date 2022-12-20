const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUser } = require('../../controllers/userController');
const auth = require('../../middleware/auth');

router.route('/')
    .post(registerUser)
    .put(auth, updateUser)

router.route('/login')
    .post(loginUser)

router.route('/:id')
    .put(auth, updateUser)

module.exports = router;