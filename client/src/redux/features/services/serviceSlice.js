import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import serviceService from './serviceService';
import { toast } from 'react-toastify';

const name = JSON.parse(localStorage.getItem("name"));

const initialState = {
  services: [],
  selectedService: {
    id: "",
    title: "",
    description: "",
    image_path: "",
  },
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  message:"",
}

// Créer un service
export const createService = createAsyncThunk(
    "services/create",
    async (formData, thunkAPI) => {
        try {
         return await serviceService.createService(formData);
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

// Récupérer tous les services
export const getServices = createAsyncThunk(
    "services/getAll",
    async (_, thunkAPI) => {
        try {
            return await serviceService.getServices();
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

// Récupérer un service
export const getService = createAsyncThunk(
    "services/getOne",
    async (id, thunkAPI) => {
        try {
            return await serviceService.getService(id);
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

// Modifier un service
export const updateService = createAsyncThunk(
    "services/update",
    async ({id, formData}, thunkAPI) => {
        try {
            return await serviceService.updateService(id,formData);
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

// Supprimer un service
export const deleteService = createAsyncThunk(
    "services/delete",
    async (id, thunkAPI) => {
        try {
            return await serviceService.deleteService(id);
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

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {

    // Définir les reducers synchrones
    SET_SERVICES(state, action) {
        state.services = action.payload;
    },
    SET_SELECTED_SERVICE(state, action) {
        state.selectedService = action.payload;
    },
    ADD_SERVICE(state, action) {
        state.services.push(action.payload);
    },
    UPDATE_SERVICE(state, action) {
        // Filtrer le service modifié
        const index = state.services.findIndex(service => service.id === action.payload.id);
        // Remplacer le service modifié
        if (index !== -1) {
            state.services[index] = action.payload;
        }
    },
    REMOVE_SERVICE(state, action) {
        state.services = state.services.filter(service => service.id !== action.payload);
    },
    CLEAR_SELECTED_SERVICE(state) {
        state.selectedService = initialState.selectedService;
    },
    SET_IS_SUCCESS: (state, action) => {
        state.isSuccess = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Définir les reducers asynchrones

    
    builder
    // Créer un service
        .addCase(createService.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createService.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.services.push(action.payload);
            toast.success('Service ajouté avec succès');
        })
        .addCase(createService.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
            toast.error(action.payload);
        })
    // Récupérer tous les services
        .addCase(getServices.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getServices.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.services = action.payload;
        })
        .addCase(getServices.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
    // Récupérer un service
        .addCase(getService.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getService.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.selectedService = action.payload;
        })
        .addCase(getService.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
    // Modifier un service
        .addCase(updateService.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateService.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            const serviceIndex = state.services.findIndex(service => service.id === action.payload.id);
            if (serviceIndex !== -1) {
                state.services[serviceIndex] = action.payload;
            }
            toast.success('Service modifié avec succès');
        })
        .addCase(updateService.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
    // Supprimer un service
        .addCase(deleteService.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteService.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.services = state.services.filter(service => service.id !== action.payload);
            toast.success('Service supprimé avec succès');
        })
        .addCase(deleteService.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        });
}


});

export const { SET_SERVICES, SET_SELECTED_SERVICE, ADD_SERVICE, UPDATE_SERVICE, REMOVE_SERVICE, CLEAR_SELECTED_SERVICE, SET_IS_SUCCESS } = serviceSlice.actions;

export const selectServices = (state) => state.service.services;
export const selectSelectedService = (state) => state.service.selectedService;
export const selectIsLoading = (state) => state.service.isLoading;
export const selectIsSuccess = (state) => state.service.isSuccess;
export const selectIsError = (state) => state.service.isError;
export default serviceSlice.reducer;