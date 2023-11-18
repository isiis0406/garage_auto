import { createSlice } from '@reduxjs/toolkit'


const name = JSON.parse(localStorage.getItem("name"));

const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
  user: {
    id: "",
    name: "",
    email: "",
    role: "",
  },
}



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const user = action.payload;
      state.user.id = user?.id;
      state.user.name = user?.name;
      state.user.email = user?.email;
      state.user.phoneNumber = user?.role;
    },
    RESET_USER(state) {
      state.user = {
        name: "",
        email: "",
        phoneNumber: "",
        photo: "",
      };
    },
  },


});

export const { SET_LOGIN, SET_NAME, SET_USER, RESET_USER } = authSlice.actions;

export const selectIsLoggedInd = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;