import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string | null;
}

const initialState: UserState = {
  name: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload;
    },
    logout: (state) => {
      state.name = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
