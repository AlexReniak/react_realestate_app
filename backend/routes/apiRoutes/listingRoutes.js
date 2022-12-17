const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { createListing, getAllListings, getUserListings, updateListing, deleteListing } = require('../../controllers/listingController');

router.route('/')
    .get(getAllListings)

router.route('/user')
    .post(auth, createListing)
    .get(auth, getUserListings)
    
router.route('/:id')
    .put(auth, updateListing)
    .delete(auth, deleteListing)

module.exports = router;