import React, { useEffect, useState, Suspense } from 'react';
import Button from 'react-bootstrap/Button';
import ReservationTable from '../../components/Dashboard/ReservationTable';
import InfoCard from '../../components/Dashboard/InfoCard';
import DateControl from '../../components/Dashboard/DateControl';
import CreateReservation from '../../components/Dashboard/CreateReservation';
import { getByRestaurantId } from "../../services/ReservationService";
const ChangeReservationArea = React.lazy(() => import('../../components/Dashboard/ChangeReservationArea'));
const ChangeReservationStatus = React.lazy(() => import('../../components/Dashboard/ChangeReservationStatus'));
const ChangeReservationDateTime = React.lazy(() => import('../../components/Dashboard/ChangeReservationDateTime'));
const ChangeReservationNumberOfPeople = React.lazy(() => import('../../components/Dashboard/ChangeReservationNumberOfPeople'));
const ChangeReservationInfo = React.lazy(() => import('../../components/Dashboard/ChangeReservationInfo'));

function Dashboard() {

  const [createReservationShow, setCreateReservationShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [reservationData, setReservationData] = useState([]);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState('');


  /*MODALS*/
  const [modalItemId, setModalItemId] = useState(0);
  const [changeReservationShow, setChangeReservationShow] = useState(false);
  const [changeReservationDateTimeShow, setChangeReservationDateTimeShow] = useState(false);
  const [changeReservationAreaShow, setChangeReservationAreaShow] = useState(false);
  const [changeReservationNumberOfPeopleShow, setChangeReservationNumberOfPeopleShow] = useState(false);
  const [changeReservationInfoShow, setChangeReservationInfoShow] = useState(false);

  useEffect(() => {
    // Tanımlanan async fonksiyonu çağırıyoruz.
    fetchData();
    //console.log(formatDateToDatabaseFormat(date, "full"));
    return () => {
      setModalItemId(0);
      setReservationData([]);
    };
  }, [date, refresh]); 

  const fetchData = async () => {
    setIsLoading(true);
    setError('');
    //await new Promise(r => setTimeout(r, 1000));
    await getByRestaurantId(formatDateToDatabaseFormat(date))
      .then(result => {
          if(result.success){
              setReservationData(result.data);
              setIsLoading(false);
          }else{
              result.data = [];
              setIsLoading(false);
              setReservationData(result.data);
              setError(result.message);
          }
      }).catch(result => {
          setIsLoading(false);
          setError(String(result));
      });
    //setIsLoading(false);
  };

  function formatDateToDatabaseFormat(date, time = 'day') {
    if (time === 'full') {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hour = String(date.getHours()).padStart(2, '0');
      const minute = String(date.getMinutes()).padStart(2, '0');
      const second = String(date.getSeconds()).padStart(2, '0');
    
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }else{
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }
    
  }

  const dateTr = () => {
    return date.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', weekday: 'long' });
  };

  const countStatus = (status) => {
    var result = reservationData.reduce(function (acc, cur) {
        return cur.status === status ? acc + 1 : acc;
    }, 0);
    return result;
  }

  const totalNumberOfPeople = () => {
    var result = reservationData.reduce(function (acc, cur) {
      return acc + parseInt(cur.number_of_people);
    }, 0);
    return result;
  }

  const handleClose = () => {setCreateReservationShow(false); setDate(new Date());}

  return (
    <div>
      {/*breadcrumb*/}
      <div className="page-breadcrumb d-md-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">{dateTr()}</div>
      </div>
      {/*end breadcrumb*/}

      <Button variant="success" className="m-1 px-5" onClick={() => setCreateReservationShow(true)}>
        <i className="bx bx-plus me-1"></i>Rezervasyon Ekle
      </Button>
      {/* <button type="button" className="btn btn-success m-1 px-5">Walk ın</button> */}


      {/* <div className="btn-group m-1" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-secondary"><i className="bx bx-refresh me-1"></i></button>
        <button type="button" className="btn btn-secondary"><i className="bx bxs-cog me-1"></i></button>
        <button type="button" className="btn btn-secondary"><i className="bx bx-search me-1"></i></button>
      </div> */}

      <DateControl
        date={date}
        setDate={setDate}
      />

      {/* <div className="btn-group m-1" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-secondary">Left</button>
        <button type="button" className="btn btn-secondary">Middle</button>
        <button type="button" className="btn btn-secondary">Right</button>
      </div>

      <div className="btn-group m-1" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-secondary">Left</button>
        <button type="button" className="btn btn-secondary">Middle</button>
        <button type="button" className="btn btn-secondary">Right</button>
      </div> */}


      <div className="row mt-5">
        <div className="col-12 col-lg-3">
          <InfoCard
            title="Misafir"
            value={totalNumberOfPeople()}
            icon="bx-user"
            backGround="voilet"
            isLoading={isLoading}
          />
        </div>
        <div className="col-12 col-lg-3">
          <InfoCard
            title="Konfirme"
            value={countStatus(String(2)) + countStatus(String(7))}
            icon="bx-check"
            backGround="primary-blue"
            isLoading={isLoading}
          />
        </div>
        <div className="col-12 col-lg-3">
          <InfoCard
            title="NoShow"
            value={countStatus(String(4))}
            icon="bx-low-vision"
            backGround="rose"
            isLoading={isLoading}
          />
        </div>
        <div className="col-12 col-lg-3">
          <InfoCard
            title="İptal"
            value={countStatus(String(5))}
            icon="bx-x"
            backGround="sunset"
            isLoading={isLoading}
          />
        </div>
        <div className='col-12 mb-4'>
          <ReservationTable 
            data={reservationData} 
            isLoading={isLoading} 
            error={error} 
            setModalItemId={setModalItemId} 
            setChangeReservationShow={setChangeReservationShow} 
            setChangeReservationDateTimeShow={setChangeReservationDateTimeShow}
            setChangeReservationAreaShow={setChangeReservationAreaShow}
            setChangeReservationNumberOfPeopleShow={setChangeReservationNumberOfPeopleShow}
            setChangeReservationInfoShow={setChangeReservationInfoShow}
          />
        </div>
      </div>

      {/*MODALS*/}
      <CreateReservation show={createReservationShow} handleClose={handleClose}></CreateReservation>
      
      {changeReservationShow && (
        <Suspense fallback={<div></div>}>
          <ChangeReservationStatus modalItemId={modalItemId} setModalItemId={setModalItemId} show={changeReservationShow} setShow={setChangeReservationShow} refreshMainData={fetchData}></ChangeReservationStatus>
        </Suspense>
      )}

      {changeReservationDateTimeShow && (
        <Suspense fallback={<div></div>}>
          <ChangeReservationDateTime modalItemId={modalItemId} setModalItemId={setModalItemId} title={'Tarih/Saat Değiştir'} show={changeReservationDateTimeShow} setShow={setChangeReservationDateTimeShow} refreshMainData={fetchData}></ChangeReservationDateTime>
        </Suspense>
      )}

      {changeReservationAreaShow && (
        <Suspense fallback={<div></div>}>
          <ChangeReservationArea modalItemId={modalItemId} setModalItemId={setModalItemId} title={'Alan / Masa Değişikliği'} show={changeReservationAreaShow} setShow={setChangeReservationAreaShow} refreshMainData={fetchData}></ChangeReservationArea>
        </Suspense>
      )}

      {changeReservationNumberOfPeopleShow && (
        <Suspense fallback={<div></div>}>
          <ChangeReservationNumberOfPeople modalItemId={modalItemId} setModalItemId={setModalItemId} title={'Misafir Sayısı Değişikliği'} show={changeReservationNumberOfPeopleShow} setShow={setChangeReservationNumberOfPeopleShow} refreshMainData={fetchData}></ChangeReservationNumberOfPeople>
        </Suspense>
      )}
      
      {changeReservationInfoShow && (
        <Suspense fallback={<div></div>}>
          <ChangeReservationInfo modalItemId={modalItemId} setModalItemId={setModalItemId} title={'Rezervasyon Bilgilerini Düzenle'} show={changeReservationInfoShow} setShow={setChangeReservationInfoShow} refreshMainData={fetchData}></ChangeReservationInfo>
        </Suspense>
      )}
      

    </div>
  );
}

export default Dashboard;
