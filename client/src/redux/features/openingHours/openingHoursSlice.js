import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import carService from './openingHoursService';
import openingHoursService from './openingHoursService';

const initialState = {
    openingHours: [],
    isLoggedIn: false,
    isError: false,
    isSuccess: false,
    message: "",
}

// Créer des horaires d'ouverture
export const createOpeningHours = createAsyncThunk(
    "openingHours/create",
    async (formData, thunkAPI) => {
        try {
            return await openingHoursService.createOpeningHours(formData);
        } catch (error) {
            const message = (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Récupérer toutes les voitures
export const getOpeningHours = createAsyncThunk(
    "openingHours/getAll",
    async (_, thunkAPI) => {
        try {
            return await openingHoursService.getOpeningHours();
        } catch (error) {
            const message = (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const openingHoursSlice = createSlice({
    name: "openingHour",
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        // Définir les reducers asynchrones


        builder
            // Créer des horaires d'ouverture
            .addCase(createOpeningHours.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOpeningHours.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.openingHours.push(action.payload);
                toast.success('Horaires d\'ouverture ajouté avec succès');
            })
            .addCase(createOpeningHours.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
                toast.error(action.payload);
            })
            // Récupérer tous les horaires d'ouverture
            .addCase(getOpeningHours.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOpeningHours.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.openingHours = action.payload;
            })
            .addCase(getOpeningHours.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
    }


});


export const selectOpeningHours = (state) => state.openingHour.openingHours;
export const selectIsLoading = (state) => state.car.isLoading;
export const selectIsSuccess = (state) => state.car.isSuccess;
export const selectIsError = (state) => state.car.isError;
export default openingHoursSlice.reducer;