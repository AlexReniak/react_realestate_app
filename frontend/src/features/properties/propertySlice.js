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
        const token = thunkAPI.getState().auth.user.token
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

// Get single property
export const getProperty = createAsyncThunk('property/get', async (propertyId, thunkAPI) => {
    try {
        return await propertyService.getProperty(propertyId);
    } catch (error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString();

            return thunkAPI.rejectWithValue(message);
    }
})

// Get filtered properties
export const getFilteredProperties = createAsyncThunk('property/filterType', async (filterType, thunkAPI) => {
    try {
        return await propertyService.getFilteredProperties(filterType);
    } catch (error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString();

            return thunkAPI.rejectWithValue(message);
    }
})

// Update property
export const updateProperty = createAsyncThunk('property/update', async ({propertyData, propertyId}, thunkAPI) => {
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
export const deleteProperty = createAsyncThunk('property/delete', async (propertyId, thunkAPI) => {
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
        builder
            .addCase(createProperty.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProperty.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createProperty.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(getAllProperties.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProperties.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllProperties.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.properties = action.payload;
            })
            .addCase(getProperty.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProperty.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getProperty.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.property = action.payload.listing;
                state.property.email = action.payload.email
            })
            .addCase(getFilteredProperties.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFilteredProperties.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getFilteredProperties.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.properties = action.payload;
            })
            .addCase(getUserProperties.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProperties.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserProperties.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.properties = action.payload;
            })
            .addCase(updateProperty.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProperty.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.property = action.payload;
            })
            .addCase(updateProperty.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteProperty.fulfilled, (state, action) => {
                state.isLoading = false;
                state.properties.filter((property) => property.id !== action.payload._id);
                state.property = {};
            })
    }
});

export const { reset } = propertySlice.actions;

export default propertySlice.reducer;