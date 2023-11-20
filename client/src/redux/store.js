import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../redux/features/auth/authSlice';
import filterReducer from './features/filterSlice';
import serviceReducer from './features/services/serviceSlice';
import carReducer from './features/cars/carSlice';
import userReducer from './features/users/userSlice';
import testimonialReducer from './features/testimonials/testimonialSlice';
import openingHoursReducer from './features/openingHours/openingHoursSlice';
import messageReducer from './features/messages/messageSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        filter: filterReducer,
        services: serviceReducer,
        cars: carReducer,
        users: userReducer,
        testimonials: testimonialReducer,
        openingHours: openingHoursReducer,
        messages: messageReducer
    }
})