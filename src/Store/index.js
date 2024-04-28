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
        localStorage.removeItem('email');
        state.token = null;
    },
    toggle(state) {
      state.loginToggle = !state.loginToggle;
    },
  },
});


const initialMailState = { inboxArr: [], sentArr: [], unreadMailCount: 0}

const mailSlice = createSlice({
  name: 'mail',
  initialState: initialMailState,
  reducers: {
    inboxHandler(state, action){
      const updatedArr = [...action.payload];
      state.inboxArr = updatedArr;

      state.unreadMailCount = state.inboxArr.reduce((acc, curr) => {
          if(!curr.read){
              acc += 1;
          }
          return acc;
      }, 0)
    },
    sentHandler(state, action) {
        const updatedSentArr = [...action.payload]
        state.sentArr = updatedSentArr;
    },
    inboxDeleteHandler(state, action){
      state.inboxArr = state.inboxArr.filter((mails) => mails.key !== action.payload); 
    },
    sentBoxDeleteHandler(state, action){
      state.sentArr = state.sentArr.filter((mails) => mails.key !== action.payload); 
    }
  }
})

export const authActions = authSlice.actions;
export const mailActions = mailSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    mail: mailSlice.reducer,
  },
});

export default store;
