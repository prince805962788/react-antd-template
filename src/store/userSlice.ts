import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

interface userState {
  username: string;
  password: string;
}
const initialState: userState = {
  username: '',
  password: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 不要直接修改state，修改会无效，需要取它的key依次赋值
    setAccount: (state, action: PayloadAction<userState>) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    clearAccount: (state) => {
      state = {
        username: '',
        password: '',
      };
    },
  },
});

export const selectUser = (state: RootState) => state.user;
export const { setAccount, clearAccount } = userSlice.actions;
export default userSlice.reducer;
