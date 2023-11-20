import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import messageService from './messageService';


const initialState = {
    messages: [],
    selectedMessage: {
        id: "",
        name: "",
        phone: "",
        email: "",
        message: ""
    },
    isLoggedIn: false,
    isError: false,
    isSuccess: false,
    message: "",
}

// Créer un message
export const createMessage = createAsyncThunk(
    "messages/create",
    async (formData, thunkAPI) => {
        try {
            return await messageService.createMessage(formData);
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

// Récupérer tous les messages
export const getMessages = createAsyncThunk(
    "messages/getAll",
    async (_, thunkAPI) => {
        try {
            return await messageService.getMessages();
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

// Récupérer un message
export const getMessage = createAsyncThunk(
    "messages/getOne",
    async (id, thunkAPI) => {
        try {
            return await messageService.getMessage(id);
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

// Archiver un message
export const archiveMessage = createAsyncThunk(
    "messages/update",
    async (id, thunkAPI) => {
        try {
            return await messageService.archiveMessage(id);
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

// Supprimer un message
export const deleteMessage = createAsyncThunk(
    "messages/delete",
    async (id, thunkAPI) => {
        try {
            return await messageService.deleteMessage(id);
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

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        // Définir les reducers asynchrones


        builder
            // Créer une voiture
            .addCase(createMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.messages.push(action.payload);
                toast.success('Message envoyé avec succès, nous vous répondrons dans les plus brefs délais');

            })
            .addCase(createMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
                toast.error(action.payload);
            })
            // Récupérer tous les messages
            .addCase(getMessages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.messages = action.payload;
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.messages = action.payload;
                toast.error(action.payload);
            })
            // Récupérer un message
            .addCase(getMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.selectedMessage = action.payload;
            })
            .addCase(getMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            // Archiver un message
            .addCase(archiveMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(archiveMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                const messageIndex = state.messages.findIndex(message => message.id === action.payload.id);
                if (messageIndex !== -1) {
                    state.messages[messageIndex] = action.payload;
                }
                toast.success('Message archivé avec succès');
            })
            .addCase(archiveMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            // Supprimer un message
            .addCase(deleteMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.messages = state.messages.filter(message => message.id !== action.payload);
                toast.success('Message supprimé avec succès');
            })
            .addCase(deleteMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            });
    }


});


export const selectMessages = (state) => state.messages.messages;
export const selectSelectedMessage = (state) => state.messages.selectedMessage;
export const selectIsLoading = (state) => state.messages.isLoading;
export const selectIsSuccess = (state) => state.messages.isSuccess;
export const selectIsError = (state) => state.messages.isError;
export default messageSlice.reducer;