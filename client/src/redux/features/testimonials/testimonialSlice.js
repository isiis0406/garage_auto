import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import testimonialService from './testimonialsService';


const initialState = {
    testimonials: [],
    selectedTestimonial: {
        id: "",
        name: "",
        email: "",
        content: "",
        rating: null,
        status: "",
    },
    isLoggedIn: false,
    isError: false,
    isSuccess: false,
    message: "",
}

// Créer un avis
export const createTestimonial = createAsyncThunk(
    "testimonials/create",
    async (formData, thunkAPI) => {
        try {
            return await testimonialService.createTestimonial(formData);
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

// Récupérer tous les avis
export const getTestimonials = createAsyncThunk(
    "testimonials/getAll",
    async (_, thunkAPI) => {
        try {
            return await testimonialService.getTestimonials();
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

// Récupérer un avis
export const getTestimonial = createAsyncThunk(
    "testimonials/getOne",
    async (id, thunkAPI) => {
        try {
            return await testimonialService.getTestimonial(id);
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

// Modifier une voiture
export const updateTestimonial = createAsyncThunk(
    "testimonials/update",
    async ({ id, formData }, thunkAPI) => {
        try {
            return await testimonialService.updateTestimonial(id, formData);
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

// Approuver un avis
export const approveTestimonial = createAsyncThunk(
    "testimonials/approve",
    async ( id, thunkAPI) => {
        try {
            return await testimonialService.approveTestimonial(id);
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

// Supprimer une voiture
export const deleteTestimonial = createAsyncThunk(
    "testimonials/delete",
    async (id, thunkAPI) => {
        try {
            return await testimonialService.deleteTestimonial(id);
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

const testimonialSlice = createSlice({
    name: "testimonial",
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        // Définir les reducers asynchrones


        builder
            // Créer un avis
            .addCase(createTestimonial.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTestimonial.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.testimonials.push(action.payload);
                toast.success('Votre témoignage a été enregistré, il sera approuvé et publier dans les 24 heures qui suivent😉.');
            })
            .addCase(createTestimonial.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
                toast.error(action.payload);
            })
            // Récupérer tous les avis
            .addCase(getTestimonials.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTestimonials.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.testimonials = action.payload;
            })
            .addCase(getTestimonials.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            // Récupérer un avis
            .addCase(getTestimonial.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTestimonial.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.selectedTestimonial = action.payload;
            })
            .addCase(getTestimonial.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            // Modifier un avis
            .addCase(updateTestimonial.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTestimonial.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                const testimonialIndex = state.testimonials.findIndex(testimonial => testimonial.id === action.payload.id);
                if (testimonialIndex !== -1) {
                    state.testimonials[testimonialIndex] = action.payload;
                }
                toast.success('Voiture modifiée avec succès');
            })
            .addCase(updateTestimonial.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            // Approuver un avis
            .addCase(approveTestimonial.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(approveTestimonial.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                const testimonialIndex = state.testimonials.findIndex(testimonial => testimonial.id === action.payload.id);
                if (testimonialIndex !== -1) {
                    state.testimonials[testimonialIndex] = action.payload;
                }
                toast.success('Avis approuvé avec succès');
            })
            .addCase(approveTestimonial.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            // Supprimer un avis
            .addCase(deleteTestimonial.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTestimonial.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.testimonials = state.testimonials.filter(testimonial => testimonial.id !== action.payload);
                toast.success('Avis supprimé avec succès');
            })
            .addCase(deleteTestimonial.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            });
    }


});


export const selectTestimonials = (state) => state.testimonial.testimonials;
export const selectSelectedTestimonial = (state) => state.testimonial.selectedTestimonial;
export const selectIsLoading = (state) => state.testimonial.isLoading;
export const selectIsSuccess = (state) => state.testimonial.isSuccess;
export const selectIsError = (state) => state.testimonial.isError;
export default testimonialSlice.reducer;