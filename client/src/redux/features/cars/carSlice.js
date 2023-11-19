import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import carService from './carService';


const initialState = {
  cars: [],
  selectedCar: {
    id: "",
    brand: "",
    model: "",
    release_year: "",
    price: "",
    description: "",
    image_path: "",
    kilometers: "",
  },
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  message:"",
}

// Créer une voiture
export const createCar = createAsyncThunk(
    "cars/create",
    async (formData, thunkAPI) => {
        try {
         return await carService.createCar(formData);
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
export const getCars = createAsyncThunk(
    "cars/getAll",
    async (_, thunkAPI) => {
        try {
            return await carService.getCars();
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

// Récupérer une voiture
export const getCar = createAsyncThunk(
    "cars/getOne",
    async (id, thunkAPI) => {
        try {
            return await carService.getCar(id);
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
export const updateCar = createAsyncThunk(
    "cars/update",
    async ({id, formData}, thunkAPI) => {
        try {
            return await carService.updateCar(id,formData);
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
export const deleteCar = createAsyncThunk(
    "cars/delete",
    async (id, thunkAPI) => {
        try {
            return await carService.deleteCar(id);
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

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {

    // Définir les reducers synchrones
    SET_CARS(state, action) {
        state.cars = action.payload;
    },
    SET_SELECTED_CAR(state, action) {
        state.selectedCar = action.payload;
    },
    ADD_CAR(state, action) {
        state.cars.push(action.payload);
    },
    UPDATE_CARS(state, action) {
        // Filtrer la voiture modifié
        const index = state.cars.findIndex(car => car.id === action.payload.id);
        // Remplacer la voiture modifié
        if (index !== -1) {
            state.cars[index] = action.payload;
        }
    },
    REMOVE_CAR(state, action) {
        state.cars = state.cars.filter(car => car.id !== action.payload);
    },
    CLEAR_SELECTED_CAR(state) {
        state.selectedCar = initialState.selectedCar;
    },
    SET_IS_SUCCESS: (state, action) => {
        state.isSuccess = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Définir les reducers asynchrones

    
    builder
    // Créer une voiture
        .addCase(createCar.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createCar.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.cars.push(action.payload);
            toast.success('Voiture ajoutée avec succès');
        })
        .addCase(createCar.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
            toast.error(action.payload);
        })
    // Récupérer toutes les voitures
        .addCase(getCars.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getCars.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.cars = action.payload;
        })
        .addCase(getCars.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
    // Récupérer une voiture
        .addCase(getCar.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getCar.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.selectedCar = action.payload;
        })
        .addCase(getCar.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
    // Modifier une voiture
        .addCase(updateCar.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateCar.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            const carIndex = state.cars.findIndex(car => car.id === action.payload.id);
            if (carIndex !== -1) {
                state.cars[carIndex] = action.payload;
            }
            toast.success('Voiture modifiée avec succès');
        })
        .addCase(updateCar.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
    // Supprimer une voiture
        .addCase(deleteCar.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteCar.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.cars = state.cars.filter(car => car.id !== action.payload);
            toast.success('Voiture supprimée avec succès');
        })
        .addCase(deleteCar.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        });
}


});

export const { SET_CARS, SET_SELECTED_CAR, ADD_CAR, UPDATE_CAR, REMOVE_CAR, CLEAR_SELECTED_CAR, SET_IS_SUCCESS } = carSlice.actions;

export const selectCars = (state) => state.car.cars;
export const selectSelectedCar = (state) => state.car.selectedCar;
export const selectIsLoading = (state) => state.car.isLoading;
export const selectIsSuccess = (state) => state.car.isSuccess;
export const selectIsError = (state) => state.car.isError;
export default carSlice.reducer;