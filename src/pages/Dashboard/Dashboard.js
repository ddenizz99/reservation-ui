import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ReservationTable from '../../components/Dashboard/ReservationTable';
import InfoCard from '../../components/Dashboard/InfoCard';
import DateControl from '../../components/Dashboard/DateControl';
import CreateReservation from '../../components/Dashboard/CreateReservation';
import { getByRestaurantId } from "../../services/ReservationService";

function Dashboard() {

  const [createReservationShow, setCreateReservationShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [reservationData, setReservationData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Async fonksiyonu useEffect içerisinde tanımlıyoruz.
    const fetchData = async () => {
      setIsLoading(true);
      //await new Promise(r => setTimeout(r, 1000));
      await getByRestaurantId()
        .then(result => {
            if(result.success){
                console.log(result.data)
                setReservationData(result.data);
                setIsLoading(false);
            }else{
                setIsLoading(false);
                setError(result.message);
            }
        }).catch(result => {
            setIsLoading(false);
            setError(String(result));
        });
      //setIsLoading(false);
    };

    // Tanımlanan async fonksiyonu çağırıyoruz.
    fetchData();
    //console.log(formatDateToDatabaseFormat(date, "full"));
  }, [date]); 

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

  //DataTable
  const data = [
      {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
      },
      {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
      },
      {
        id: 3,
        title: 'Bursaspor',
        year: '1963',
      },
      {
        id: 4,
        title: 'Galatasaray',
        year: '1905',
      },
  ]

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
      <button type="button" className="btn btn-success m-1 px-5">Walk ın</button>


      {/* <div className="btn-group m-1" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-secondary"><i className="bx bx-refresh me-1"></i></button>
        <button type="button" className="btn btn-secondary"><i className="bx bxs-cog me-1"></i></button>
        <button type="button" className="btn btn-secondary"><i className="bx bx-search me-1"></i></button>
      </div> */}

      <DateControl
        date={date}
        setDate={setDate}
      />

      <div className="btn-group m-1" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-secondary">Left</button>
        <button type="button" className="btn btn-secondary">Middle</button>
        <button type="button" className="btn btn-secondary">Right</button>
      </div>

      <div className="btn-group m-1" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-secondary">Left</button>
        <button type="button" className="btn btn-secondary">Middle</button>
        <button type="button" className="btn btn-secondary">Right</button>
      </div>


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
            value={countStatus(String(2))}
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
          <ReservationTable data={reservationData} isLoading={isLoading}></ReservationTable>
        </div>
      </div>

      <CreateReservation show={createReservationShow} handleClose={() => setCreateReservationShow(false)}></CreateReservation>

    </div>
  );
}

export default Dashboard;
