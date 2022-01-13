/* Library import */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* State Type 설정 */
export interface modal {
  loginModal: boolean;
  signupModal: boolean;
  tosModal: boolean;
  privacyModal: boolean;
  sideMenuModal: boolean;
  findPasswordModal: boolean;
  confirmNumberModal: boolean;
  resetPasswordModal: boolean;
  alertModal: boolean;
  alertText: string;
  myDropDown: boolean;
  deliverText: string;
}

/* State 초기값 설정 */
const initialState: modal = {
  loginModal: false,
  signupModal: false,
  tosModal: false,
  privacyModal: false,
  findPasswordModal: false,
  confirmNumberModal: false,
  resetPasswordModal: false,
  alertModal: false,
  sideMenuModal: false,
  myDropDown: false,
  alertText: '',
  deliverText: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    /* Action 설정 */
    showLoginModal: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.loginModal = payload;
    },
    showSignupModal: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.signupModal = payload;
    },
    showTosModal: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.tosModal = payload;
    },
    showPrivacyModal: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.privacyModal = payload;
    },
    showSideMenuModal: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.sideMenuModal = payload;
    },
    showFindPasswordModal: (
      state: modal,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.findPasswordModal = payload;
    },
    showConfirmNumberModal: (
      state: modal,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.confirmNumberModal = payload;
    },
    showResetPasswordModal: (
      state: modal,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.resetPasswordModal = payload;
    },
    showAlertModal: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.alertModal = payload;
    },
    insertAlertText: (state: modal, { payload }: PayloadAction<string>) => {
      state.alertText = payload;
    },
    showMyDropDown: (state: modal, { payload }: PayloadAction<boolean>) => {
      state.myDropDown = payload;
    },
    insertDeliverText: (state: modal, { payload }: PayloadAction<string>) => {
      state.deliverText = payload;
    },
  },
});

export const {
  showLoginModal,
  showSignupModal,
  showTosModal,
  showPrivacyModal,
  showFindPasswordModal,
  showConfirmNumberModal,
  showResetPasswordModal,
  showAlertModal,
  showSideMenuModal,
  showMyDropDown,
  insertAlertText,
  insertDeliverText,
} = modalSlice.actions;
export default modalSlice.reducer;
