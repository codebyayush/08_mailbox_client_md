import { createSlice, configureStore } from "@reduxjs/toolkit";


const userToken = localStorage.getItem('idToken');
const userIsLoggedIn = !!userToken
const initialAuthState = { isLoggedIn: userIsLoggedIn, loginToggle: false, token: userToken };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
        state.isLoggedIn = true;
        state.token = action.payload;
        setTimeout(() => {
            localStorage.removeItem("idToken");
          }, 5 * 60 * 1000);
    },
    logout(state) {
        state.isLoggedIn = false;
        localStorage.removeItem('idToken');
        state.token = null;
    },
    toggle(state) {
      state.loginToggle = !state.loginToggle;
    },
  },
});

export const authActions = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
