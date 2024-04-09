import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ReservationTable from '../../components/Dashboard/ReservationTable';
import InfoCard from '../../components/Dashboard/InfoCard';
import DateControl from '../../components/Dashboard/DateControl';
import CustomModal from '../../components/Dashboard/CustomModal';
import CreateReservation from '../../components/Dashboard/CreateReservation';

function Dashboard() {

  const [show, setShow] = useState(false);
  const [tarih, setTarih] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Async fonksiyonu useEffect içerisinde tanımlıyoruz.
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(r => setTimeout(r, 1000));
      setIsLoading(false);
    };

    // Tanımlanan async fonksiyonu çağırıyoruz.
    fetchData();
    console.log(formatDateToDatabaseFormat(tarih, "full"));
  }, [tarih]); 

  function formatDateToDatabaseFormat(date, time = 'day') {
    if (time === 'full') {
      const yil = date.getFullYear();
      const ay = String(date.getMonth() + 1).padStart(2, '0');
      const gun = String(date.getDate()).padStart(2, '0');
      const saat = String(date.getHours()).padStart(2, '0');
      const dakika = String(date.getMinutes()).padStart(2, '0');
      const saniye = String(date.getSeconds()).padStart(2, '0');
    
      return `${yil}-${ay}-${gun} ${saat}:${dakika}:${saniye}`;
    }else{
      const yil = date.getFullYear();
      const ay = String(date.getMonth() + 1).padStart(2, '0');
      const gun = String(date.getDate()).padStart(2, '0');

      return `${yil}-${ay}-${gun}`;
    }
    
  }

  const tarihTr = () => {
    return tarih.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', weekday: 'long' });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <div className="breadcrumb-title pe-3">{tarihTr()}</div>
      </div>
      {/*end breadcrumb*/}

      <Button variant="success" className="m-1 px-5" onClick={handleShow}>
        <i className="bx bx-plus me-1"></i>Rezervasyon Ekle
      </Button>
      <button type="button" className="btn btn-success m-1 px-5">Walk ın</button>


      {/* <div className="btn-group m-1" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-secondary"><i className="bx bx-refresh me-1"></i></button>
        <button type="button" className="btn btn-secondary"><i className="bx bxs-cog me-1"></i></button>
        <button type="button" className="btn btn-secondary"><i className="bx bx-search me-1"></i></button>
      </div> */}

      <DateControl
        tarih={tarih}
        setTarih={setTarih}
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
            value="17"
            icon="bx-user"
            backGround="voilet"
            isLoading={isLoading}
          />
        </div>
        <div className="col-12 col-lg-3">
          <InfoCard
            title="Konfirme"
            value="7"
            icon="bx-check"
            backGround="primary-blue"
            isLoading={isLoading}
          />
        </div>
        <div className="col-12 col-lg-3">
          <InfoCard
            title="NoShow"
            value="3"
            icon="bx-low-vision"
            backGround="rose"
            isLoading={isLoading}
          />
        </div>
        <div className="col-12 col-lg-3">
          <InfoCard
            title="İptal"
            value="2"
            icon="bx-x"
            backGround="sunset"
            isLoading={isLoading}
          />
        </div>
        <div className='col-12'>
          <ReservationTable data={data} isLoading={isLoading}></ReservationTable>
        </div>
      </div>

      <CustomModal show={show} handleClose={handleClose}>
        <CreateReservation></CreateReservation>
      </CustomModal>

    </div>
  );
}

export default Dashboard;
