const asyncHandler = require('express-async-handler');
const Listings = require('../models/listingModel');
const User = require('../models/userModel');
const uploadImg = require('../helpers/uploadImg')

const createListing = asyncHandler(async (req, res) => {

    try{
        const { type, address, price, squareFeet, bedrooms, bathrooms, description } = req.body;

        const images = [];

        const handleImage = async () => {
            return Promise.all(req.files.map((image) => 
                uploadImg(image)
                    .then(url => images.push(url))
                    .catch(err => console.log(err))))
        }

        const response = await handleImage();

        if(!type || !address || !price || !bedrooms || !bathrooms || !req.files) {
            res.status(400);
            throw new Error('Please fill out the required information');
        };
        
        const user = await User.findById(req.user.id);
        
        if(!user) {
            res.status(401);
            throw new Error('User not found');
        };
        
        const listing = await Listings.create({
            type,
            address,
            price,
            squareFeet,
            bedrooms,
            bathrooms,
            description,
            images,
            user: req.user.id
        });

        res.status(201).json(listing);
        
    } catch(error) {
        res.send(400);
        throw new Error(error);
    };
});

const getAllListings = asyncHandler(async (req, res) => {
    const listings = await Listings.find({});
    res.status(200).json(listings);
});

const getUserListings = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(404);
        throw new Error('User not found');
    };

    const listings = await Listings.find({ user: user._id });

    res.status(200).json(listings);
});

const getFilteredListings = asyncHandler(async (req, res) => {
    const listings = await Listings.find({ type: req.params.filterType })

    res.status(200).json(listings);
})

const getListing = asyncHandler(async (req, res) => {
    const listing = await Listings.findById(req.params.id);

    if(!listing) {
        res.sendStatus(404);
        throw new Error('Listing not found');
    }

    res.status(200).json(listing);
})

const updateListing = asyncHandler(async (req, res) => {

    parseImages = JSON.parse(req.body.images)
    console.log(Object.values(parseImages))

    const images = Object.values(parseImages)

    if(req.files.length > 0) {
        const handleImage = async () => {
            return Promise.all(req.files.map((image) => 
                uploadImg(image)
                    .then(url => images.push(url))
                    .catch(err => console.log(err))))
        }

        const response = await handleImage();
    }

    const { type, address, price, squareFeet, bedrooms, bathrooms, description } = req.body; 

    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(404);
        throw new Error('User not found');
    };

    const listing = await Listings.findById(req.params.id);

    if(!listing) {
        res.status(404);
        throw new Error('Listing not found');
    };

    if(listing.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not Authorized');
    }

    const updatedListing = await Listings.findByIdAndUpdate(req.params.id, {
        type,
        address,
        price,
        squareFeet,
        bedrooms,
        bathrooms,
        description,
        images
    }, { new: true });

    res.status(200).json(updatedListing);
});

const deleteListing = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const listing = await Listings.findById(req.params.id);

    if(!listing) {
        res.status(404);
        throw new Error('listing not found');
    }

    if(listing.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not Authorized');
    }

    await listing.remove();

    res.status(200).json({ success: true })
});

module.exports = {
    createListing,
    getAllListings,
    getUserListings,
    getFilteredListings,
    getListing,
    updateListing,
    deleteListing
};