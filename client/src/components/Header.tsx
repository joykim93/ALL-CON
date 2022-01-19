/* Config import */
import { persistor } from '../index';
/* CSS import */
import logo from '../images/allConLogo.png';
import menu from '../images/menu.png';
import search from '../images/search.png';
import user from '../images/user.png';
/* Component import */
import AutoComplete from './AutoComplete';
/* Store import */
import { RootState } from '../index';
import {
  showLoginModal,
  showSideMenuModal,
  showMyDropDown,
  showConcertModal,
} from '../store/ModalSlice';
import {
  setAllArticles,
  setArticleTotalPage,
  setArticleCurPage,
  setTargetArticle,
  setArticleRendered,
} from '../store/ConChinSlice';
import {
  setIsScrolled,
  setScrollCount,
  setTimerMessage,
} from '../store/HeaderSlice';
import { setPageNum } from '../store/ConcertCommentSlice';
import {
  setPassToConcert,
  setOrder,
  setTarget,
  setTargetIdx,
  setIsHeaderClick
} from '../store/MainSlice';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
  const { allConcerts, targetIdx, target, order } = useSelector((state: RootState) => state.main);
  const {
    loginModal,
    signupModal,
    sideMenuModal,
    myDropDown,
    conChinProfileModal,
    mainKakaoModal,
  } = useSelector((state: RootState) => state.modal);
  const { isScrolled, scrollCount, timerMessage } = useSelector(
    (state: RootState) => state.header,
  );
  const { articleOrder, allArticles } = useSelector(
    (state: RootState) => state.conChin,
  );

  /* 타이머 변수 설정: 현재 시간 */
  let now = new Date();
  const sc = 1000;
  const mt = sc * 60;
  const hr = mt * 60;
  let nowHours = now.getHours() * hr;
  let nowMinutes = now.getMinutes() * mt;
  let nowSeconds = now.getSeconds() * sc;

  /* 타이머 변수 설정: 오픈 시간 */
  let openHours = 65;

  if (now.getHours() >= 9) {
    openHours -= now.getHours();
  } else {
    openHours = (13 - now.getHours()) * 2;
  }
  let openTime = openHours * hr;
  let nowTime = nowHours + nowMinutes + nowSeconds;
  let distance = openTime - nowTime;

  /* 타이머 변수 설정: 남은 시간 */
  let dHours: string | number = Math.floor(distance / hr / 2);
  let dMinutes: string | number = Math.floor((distance % hr) / mt);
  let dSeconds: string | number = Math.floor((distance % mt) / sc);

  /* 한자리 수일경우 옆에 0 붙이기 */
  if (String(dHours).length === 1) {
    dHours = `0${String(dHours)}`;
  }
  if (String(dMinutes).length === 1) {
    dMinutes = `0${String(dMinutes)}`;
  }
  if (String(dSeconds).length === 1) {
    dSeconds = `0${String(dSeconds)}`;
  }

  dispatch(
    setTimerMessage(
      `다음 콘서트를 업데이트하기까지 ${dHours}:${dMinutes}:${dSeconds}`,
    ),
  );

  /* 스크롤 위치 저장 useEffect */
  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });
  /* 해당 모달 띄워져있을 시 스크롤바 제거 useEffect */
  useEffect(() => {
    if (loginModal || signupModal || conChinProfileModal || mainKakaoModal)
      document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  });

  /* 현재시간 타이머 useEffect */
  // useEffect(() => {
  //   const countdown = setInterval(
  //     () => {
  //       /* 현재 시간 */
  //       now = new Date();
  //       nowHours = now.getHours() * hr;
  //       nowMinutes = now.getMinutes() * mt;
  //       nowSeconds = now.getSeconds() * sc;
  //       nowTime = nowHours + nowMinutes + nowSeconds;
  //       distance = openTime - nowTime;

  //       /* 남은 시, 초, 분 */
  //       dHours = Math.floor(distance / hr / 2);
  //       dMinutes = Math.floor((distance % hr) / mt);
  //       dSeconds = Math.floor((distance % mt) / sc);
  //       /* 한자리 수일 경우 0 붙이기 */
  //       if (String(dHours).length === 1) {
  //         dHours = `0${String(dHours)}`;
  //       }
  //       if (String(dMinutes).length === 1) {
  //         dMinutes = `0${String(dMinutes)}`;
  //       }
  //       if (String(dSeconds).length === 1) {
  //         dSeconds = `0${String(dSeconds)}`;
  //       }
  //       dispatch(
  //         setTimerMessage(
  //           `다음 콘서트를 업데이트하기까지 ${dHours}:${dMinutes}:${dSeconds}`,
  //         ),
  //       );
  //     },
  //     1000,
  //     timerMessage,
  //   );
  // }, [now]);

  /* 드랍다운 오픈 상태 변경 핸들러 */
  const displayMyDropDown = () => {
    dispatch(showMyDropDown(!myDropDown));
  };
  /* 스크롤 위치 저장 핸들러 */
  const updateScroll = () => {
    dispatch(
      setScrollCount(window.scrollY || document.documentElement.scrollTop),
    );
    if (scrollCount > 0.5) dispatch(setIsScrolled(true));
  };

  /* 랜딩 페이지 클릭 시 히든타이머 호출 핸들러 */
  const showTimer = () => {
    dispatch(setIsScrolled(false));
  };

  /* 전체 게시물 받아오기 */
  const getAllArticles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/article?order=${articleOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setAllArticles(response.data.data.articleInfo));
        dispatch(setArticleTotalPage(response.data.data.totalPage));
        dispatch(setArticleCurPage(1));
      } else {
        console.log('없거나 실수로 못가져왔어요..');
      }
    } catch (err) {
      console.log(err);
      console.log('에러가 났나봐요.');
    }
  };

  /* 메뉴별 이동시 상태 초기화 핸들러 */
  const resetHandler = (menu: string) => {
    /* Common */
    dispatch(showConcertModal(false)); // concertPage 모달창
    /* LandingPage */
    if(menu === 'logo'){
      showTimer();
    }
    /* MainPage */
    else if(menu === 'main'){
      dispatch(setTarget({}));
      dispatch(setTargetIdx(0));
      dispatch(setOrder('view')); 
      dispatch(setPageNum(1));
      dispatch(setPassToConcert(false));
      dispatch(setIsHeaderClick(true));
      navigate('/main');
    } 
    /* ConcertPage */
    else if(menu === 'concert'){
      dispatch(setTarget({}));
      dispatch(setOrder('view')); 
      navigate('/concert');
    }
    /* ConChinPage */
    else if(menu === 'conchin'){
      dispatch(setTarget({}));
      dispatch(setTargetArticle({}));
      dispatch(setArticleRendered(false));
      dispatch(setArticleCurPage(1));
      getAllArticles();
      navigate('/conchin');
    }
  };

  return (
    /* 해당 모달들(loginModal, signupModal 등) 띄워져있을 시 헤더 통채로 교체 */
    <div
      id={
        loginModal || signupModal || conChinProfileModal || mainKakaoModal
          ? 'headerSecondContainer'
          : 'headerContainer'
      }
    >
      {/* 스크롤 후 히든타이머 제거 */}
      <div id={isScrolled === false ? 'firstHiddenBar' : 'hiddenBar'}>
        {timerMessage}
      </div>

      <div id='logoBar'>
        <Link to='/' onClick={() => resetHandler('logo')}>
          {/* 스크롤 후 로고 호출*/}
          <img
            className={isScrolled === false ? 'logohide' : 'logo'}
            alt='logoImg'
            src={logo}
          />
        </Link>
      </div>
      {/* 스크롤위치에 따라 헤더 포지션 변경 */}
      <div id={scrollCount < 48 ? 'absoluteBar' : 'fixedBar'}>
        {/* 사이드메뉴 open여부에따라 open/close */}
        <div
          id='menuWrapper'
          onClick={() => dispatch(showSideMenuModal(!sideMenuModal))}
        >
          <img className='menu' alt='menuImg' src={menu} />
        </div>
        <AutoComplete />
        <div id='searchWrapper'>
          <img className='search' alt='searchImg' src={search} />
        </div>
        <div id='loginWrapper'>
          {/* 로그인 여부에 따라 프로필 이미지 혹은 로그인 버튼 출력 */}
          {isLogin ? (
            <img
              className='profile'
              alt='profileImg'
              src={userInfo.image ? userInfo.image : user}
              onClick={() => dispatch(displayMyDropDown())}
            />
          ) : (
            <p className='login' onClick={() => dispatch(showLoginModal(true))}>
              로그인
            </p>
          )}
        </div>
        <div id='hiddenMenuBox'>
          <p className='menu' onClick={() => resetHandler('main')}>홈</p>
          <p className='menu' onClick={() => resetHandler('concert')}>콘서트</p>
          <p className='menu' onClick={() => resetHandler('conchin')}>콘친 찾기</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
