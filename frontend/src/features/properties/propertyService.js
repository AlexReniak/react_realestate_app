import axios from 'axios';

const API_URL = '/api/listings';

// Create new property
const createProperty = async (propertyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: 'multipart/form-data',
    },
  };

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
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/user`, config);

  return response.data;
};

// Get single property
const getProperty = async (propertyId) => {
  const response = await axios.get(`${API_URL}/${propertyId}`);

  return response.data;
};

// Get 3 most recent propertites
const getRecentProperties = async (propertyId) => {
  const response = await axios.get(`${API_URL}/recent}`);

  return response.data;
};

// Get filtered property
const getFilteredProperties = async (filterType) => {
  const response = await axios.get(`${API_URL}`);

  return response.data.filter(
    (item) => item.type.toLowerCase() === filterType.toLowerCase()
  );
};

// Update property
const updateProperty = async (propertyData, propertyId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: 'multipart/form-data',
    },
  };

  const response = await axios.put(
    `${API_URL}/${propertyId}`,
    propertyData,
    config
  );

  return response.data;
};

// Delete property
const deleteProperty = async (propertyId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${propertyId}`, config);

  return response.data;
};

const propertyService = {
  createProperty,
  getProperties,
  getUserProperties,
  getProperty,
  getFilteredProperties,
  getRecentProperties,
  updateProperty,
  deleteProperty,
};

export default propertyService;
