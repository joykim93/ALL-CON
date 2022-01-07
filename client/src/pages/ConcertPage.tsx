import Header from '../components/Header';
import ConcertBox from '../components/ConcertPage/ConcertBox';
import ConcertChosenBox from '../components/ConcertPage/ConcertChosenBox';
function ConcertPage() {
  return (
    <>
      <Header />
      <div id='concertContainer'>
        <div id='lineOrderWrapper'>
          <div id='bottomLineOrderBox'>
            <h1>조회수 순</h1>
            <p className='order'>조회수</p>
            <p className='order'>임박예정</p>
            <p className='order'>등록일</p>
          </div>
        </div>
        <div id='concertsBoard'>
          <div id='concertBoxWrapper'>
            <ConcertBox />
          </div>
          <div id='concertBoxWrapper2'>
            <ConcertChosenBox />
          </div>
          <div id='concertBoxWrapper3'>
            <ConcertBox />
          </div>
          <div id='concertBoxWrapper4'>
            <ConcertBox />
          </div>
          <div id='concertBoxWrapper5'>
            <ConcertBox />
          </div>
          <div id='concertBoxWrapper6'>
            <ConcertBox />
          </div>
          <div id='concertBoxWrapper7'>
            <ConcertBox />
          </div>
        </div>
      </div>
    </>
  );
}

export default ConcertPage;
