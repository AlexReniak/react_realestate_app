import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import propertyService from './propertyService';

const initialState = {
    properties: [],
    property: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new property
export const createProperty = createAsyncThunk('property/create', async (propertyData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await propertyService.createProperty(propertyData, token)
    } catch(error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

// Get all properties
export const getAllProperties = createAsyncThunk('property/getAll', async (_, thunkAPI) => {
    try {
        return await propertyService.getProperties();
    } catch(error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

// Get user posted properties
export const getUserProperties = createAsyncThunk('property/getUserProperties', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await propertyService.getUserProperties(token);
    } catch(error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

// Update property
export const updateProperty = createAsyncThunk('property/update', async (propertyData, propertyId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await propertyService.updateProperty(propertyData, propertyId, token);
    } catch(error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

// Delete property
export const deleteProperty = createAsyncThunk('property/update', async (propertyId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await propertyService.deleteProperty(propertyId, token);
    } catch(error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

export const propertySlice = createSlice({
    name:'property',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {

    }
});

export const { reset } = propertySlice.actions;

export default propertySlice.reducer;