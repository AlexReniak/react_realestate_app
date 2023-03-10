const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { 
    createListing, 
    getAllListings, 
    getUserListings,
    getFilteredListings, 
    updateListing, 
    deleteListing, 
    getListing 
} = require('../../controllers/listingController');

router.route('/')
    .get(getAllListings)

router.route('/user')
    .post(auth, createListing)
    .get(auth, getUserListings)
    
router.route('/:id')
    .get(getListing)
    .put(auth, updateListing)
    .delete(auth, deleteListing)

router.route('/:filterType')
    .get(getFilteredListings)

module.exports = router;