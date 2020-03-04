const getAllUsers = require('../Controllers/userController');

const express = require('express');

const router = express.Router();

router.route('/api/v1/users').get(getAllUsers);

module.exports = router;