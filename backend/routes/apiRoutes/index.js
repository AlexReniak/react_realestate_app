const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const listingRoutes = require('./listingRoutes');

router.use('/users', userRoutes);
router.use('/listings', listingRoutes);

module.exports = router;