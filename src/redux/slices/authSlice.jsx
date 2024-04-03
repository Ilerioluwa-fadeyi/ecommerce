import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  twofaStatus: false,
  profile: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logUserIn: (state, action) => {
      state.isLoggedIn = true;
      state.profile = action.payload;
    },
    logUserOut: (state, action) => {
      state.isLoggedIn = false;
      state.twofaStatus= false;
      state.profile = {};
    },
    securityCheckPass: (state, action) => {
      state.twofaStatus = true;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;