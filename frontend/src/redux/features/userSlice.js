import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('userState')) || {
  user: null,
  access_token: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: (state) => {
      localStorage.setItem('userState', null);
      state.user = null;
      state.access_token = null;
    },
    setUser: (state, action) => {
      localStorage.setItem(
        'userState',
        JSON.stringify({
          user: action.payload.user,
          access_token: state.access_token,
        })
      );
      state.user = action.payload.user;
    },
    login: (state, action) => {
      localStorage.setItem('userState', JSON.stringify(action.payload));
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser, login, toggleUniversity } = userSlice.actions;
