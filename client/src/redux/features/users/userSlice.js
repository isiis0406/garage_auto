import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import userService from './userService';


const initialState = {
  users: [],
  selectedUser: {
    id: "",
    email: "",
    role: "",
   
  },
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  message:"",
}

// Créer un utilisateur
export const createUser = createAsyncThunk(
    "users/create",
    async (formData, thunkAPI) => {
        try {
         return await userService.createUser(formData);
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

// Récupérer tous les utilisateurs
export const getUsers = createAsyncThunk(
    "users/getAll",
    async (_, thunkAPI) => {
        try {
            return await userService.getUsers();
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

// Récupérer un utilisateur
export const getUser = createAsyncThunk(
    "users/getOne",
    async (id, thunkAPI) => {
        try {
            return await userService.getUser(id);
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

// Modifier un utilisateur
export const updateUser = createAsyncThunk(
    "users/update",
    async ({id, formData}, thunkAPI) => {
        try {
            return await userService.updateUser(id,formData);
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

// Supprimer un utilisateur
export const deleteUser = createAsyncThunk(
    "users/delete",
    async (id, thunkAPI) => {
        try {
            return await userService.deleteUser(id);
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    // Définir les reducers synchrones
    SET_USERS(state, action) {
        state.users = action.payload;
    },
    SET_SELECTED_USER(state, action) {
        state.selectedUser = action.payload;
    },
    ADD_USER(state, action) {
        state.users.push(action.payload);
    },
    UPDATE_USERS(state, action) {
        // Filtrer les utilisateurs et supprimer l'utilisateur modifié
        const index = state.users.findIndex(user => user.id === action.payload.id);
        
        if (index !== -1) {
            state.users[index] = action.payload;
        }
    },
    REMOVE_USER(state, action) {
        state.users = state.users.filter(user => user.id !== action.payload);
    },
    CLEAR_SELECTED_USER(state) {
        state.selectedUser = initialState.selectedUser;
    },
    SET_IS_SUCCESS: (state, action) => {
        state.isSuccess = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Définir les reducers asynchrones

    
    builder
    // Créer une voiture
        .addCase(createUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.users.push(action.payload);
            toast.success('Utilisateur ajoutée avec succès, il a reçu un email de confirmation pour créer son mot de passe');

        })
        .addCase(createUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
            toast.error(action.payload);
        })
    // Récupérer tous les utilisateurs
        .addCase(getUsers.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.users = action.payload;
        })
        .addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
    // Récupérer un utilisateur
        .addCase(getUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.selectedUser = action.payload;
        })
        .addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
    // Modifier un utilisateur
        .addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            const userIndex = state.users.findIndex(user => user.id === action.payload.id);
            if (userIndex !== -1) {
                state.users[userIndex] = action.payload;
            }
            toast.success('Utilisateur modifiée avec succès');
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
    // Supprimer un utilisateur
        .addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.users = state.users.filter(user => user.id !== action.payload);
            toast.success('Utilisateur supprimé avec succès');
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        });
}


});

export const { SET_USERS, SET_SELECTED_USER, ADD_USER, UPDATE_USER, REMOVE_USER, CLEAR_SELECTED_USER, SET_IS_SUCCESS } = userSlice.actions;

export const selectUsers = (state) => state.user.users;
export const selectSelectedUser = (state) => state.user.selectedUser;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsSuccess = (state) => state.user.isSuccess;
export const selectIsError = (state) => state.user.isError;
export default userSlice.reducer;