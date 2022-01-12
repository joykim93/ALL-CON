/* Component import */
import AlertModal from './components/Modals/AlertModal';
import ConcertModal from './components/Modals/ConcertPage/ConcertModal';
import ConChinWritingModal from './components/Modals/ConChinPage/ConChinWritingModal';
import ConChinProfileModal from './components/Modals/ConChinPage/ConChinProfileModal';
import ConfirmNumberModal from './components/Modals/ConfirmNumberModal';
import FindPasswordModal from './components/Modals/FindPasswordModal';
import Header from './components/Header';
import LoginModal from './components/Modals/LoginModal';
import MyProfileImageModal from './components/Modals/MyPage/MyProfileImageModal';
import MyProfileResignMembershipModal from './components/Modals/MyPage/MyProfileResignMembershipModal';
import PrivacyModal from './components/Modals/PrivacyModal';
import ResetPasswordModal from './components/Modals/ResetPasswordModal';
import SignUpModal from './components/Modals/SignUpModal';
import SideMenuModal from './components/Modals/SideMenuModal';
import TosModal from './components/Modals/TosModal';
/* Page import */
import CallbackGooglePage from './pages/CallBackPage/CallBackGoogle';
import CallbackKaKaoPage from './pages/CallBackPage/CallBackKakao';
import ConcertPage from './pages/ConcertPage';
import ConChinCertificationPage from './pages/ConChinCertificationPage';
import ConChinPage from './pages/ConChinPage';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import MyEditPage from './pages/MyEditPage';
import MyPage from './pages/MyPage';
/* Store import */
import { RootState } from './index';
/* Library import */
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const {
    loginModal,
    signupModal,
    tosModal,
    privacyModal,
    findPasswordModal,
    alertModal,
    sideMenuModal,
  } = useSelector((state: RootState) => state.modal);

  return (
    <div className='App'>
      <Header />
      {loginModal && <LoginModal />}
      {signupModal && <SignUpModal />}
      {tosModal && <TosModal />}
      {privacyModal && <PrivacyModal />}
      {sideMenuModal && <SideMenuModal />}
      {alertModal && <AlertModal />}
      {findPasswordModal && <FindPasswordModal />}
      {/*<ConcertModal /> */}
      {/* <ConChinWritingModal /> */}
      {/* <MyProfileImageModal /> */}
      {/* <MyProfileResignMembershipModal /> */}
      {/* <ConfirmNumberModal /> */}
      {/* <ResetPasswordModal /> */}

      {/* <LandingPage /> */}
      {/* <MyEditPage /> */}
      {/* <ConChinCertificationPage /> */}
      {/* <MyPage /> */}
      {/*  */}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/main/*' element={<MainPage />} />
        <Route path='/mypage/*' element={<MyPage />} />
        <Route path='/concert/*' element={<ConcertPage />} />
        <Route path='/conchin/*' element={<ConChinPage />} />
        <Route path='/callbackGoogle/*' element={<CallbackGooglePage />} />
        <Route path='/callbackKakao/*' element={<CallbackKaKaoPage />} />
        {/* <Route path='my/*' element={<MyPage />} /> */}
        {/* <Route path='myEdit/*' element={<MyEditPage />} /> */}
        {/* <Route path='conchinCert/*' element={<ConChinCertificationPage />} /> */}
      </Routes>
    </div>
  );
}
export default App;
