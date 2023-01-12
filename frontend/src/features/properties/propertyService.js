import axios from 'axios';

const API_URL = '/api/listings'

// Create new property
const createProperty = async (propertyData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}/user`, propertyData, config);

    return response.data;
};

// Get all properties
const getProperties = async () => {
    const response = await axios.get(API_URL);

    return response.data;
};

// Get user properties
const getUserProperties = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}/user`, config);

    return response.data;
};

// Update property
const updateProperty = async (propertyData, propertyId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}/${propertyId}`, propertyData, config);

    return response.data;
};

// Delete property
const deleteProperty = async (propertyId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}/${propertyId}`, config);

    return response.data;
};

const propertyService = {
    createProperty,
    getProperties,
    getUserProperties, 
    updateProperty,
    deleteProperty
}

export default propertyService;