import { createSlice, configureStore } from "@reduxjs/toolkit";


const initialAuthState = {isLogin: false}

const authSlice = createSlice({
        name: 'auth',
        initialState: initialAuthState,
        reducers: {
            login(state, action){
                
            },
            logout(state){},
            toggle(state){}
        }
})

export const authActions = authSlice.actions;

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
})

export default store;
