/* Store import */
import { persistor } from '../index';
/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface auth {
  isLogin: boolean;
  userInfo: {
    id?: number;
    email?: string;
    password?: string;
    username?: string;
    image?: string;
    introduction?: string;
    phone_number?: string;
    birth?: string;
    gender?: string;
    role?: number;
    sign_method?: string;
    email_key?: string;
    massage_key?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
}
/* State 초기값 설정 */
const initialState: auth = { isLogin: false, userInfo: {} };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    login: (state: auth) => { 
      state.isLogin = true;
    },
    logout: (state: auth) => { 
      state.isLogin = false;
      /* 로그아웃시 persistStore의 데이터를 전부 삭제 */
      setTimeout(() => persistor.purge(), 500);
    },
    getUserInfo: (state: auth, { payload }: PayloadAction<auth>) => { 
      state.userInfo = payload.userInfo;
    }
  }
});

export const { login, logout, getUserInfo } = authSlice.actions;
export default authSlice.reducer;