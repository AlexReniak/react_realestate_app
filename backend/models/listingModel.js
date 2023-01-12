const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    squareFeet: {
        type: Number,
        default: 0,
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    images: {
        type: [Buffer],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Listings', listingSchema);