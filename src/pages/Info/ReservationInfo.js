import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Modal, Button, Spinner, Alert } from 'react-bootstrap';
import { FaPhoneAlt, FaMoon, FaCheck, FaCalendarAlt, FaTimes } from "react-icons/fa";
import { getByInfoCode, reservationCanceledCustomer, reservationConfirmCustomer } from '../../services/ReservationService';
import Swal from 'sweetalert2';

function ReservationInfo() {

  let { code } = useParams();

    const [reservationData, setReservationData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshData, setRefreshData] = useState(null);

    useEffect(() => {
        const fetchReservationData = async () => {
            setIsLoading(true);
            setError(null); 
            await getByInfoCode(code)
            .then(result => {
                if(result.success){
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
        };

        fetchReservationData();
    }, [refreshData]);

  const notifySuccess = () => toast.success('Başarılı bildirim!');

  const dateTr = (date, time = false) => {
    date = new Date(date);
    if (!time) {
        return date.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', weekday: 'long' });
    }
    const dateString = date.toLocaleString('tr-TR', { hour: "numeric", minute: "numeric" });
    return dateString.split(' ')[0];
  };

  const reservationCanceled = () => {
    Swal.fire({
        title: "Rezervasyonu iptal etmek istiyor musunuz?",
        text: "Rezervasyonunuz iptal edilmek üzere!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Hayır",
        confirmButtonText: "Evet, İptal Et"
      }).then(async (result) => {
        if (result.isConfirmed) {
            setIsLoading(true);
            await reservationCanceledCustomer({"code":code})
            .then(result => {
                if(result.success){
                    Swal.fire({
                        title: "İptal Edildi!",
                        text: result.message,
                        icon: "success",
                        confirmButtonText: "Tamam"
                    });
                    setRefreshData(Math.floor(Math.random() * 10));
                }else{
                    Swal.fire({
                        title: "Başarısız!",
                        text: result.message,
                        icon: "error",
                        confirmButtonText: "Tamam"
                    });
                }
            }).catch(result => {
                setIsLoading(false);
                setError(String(result));
            });
        }
      });
  }

  const reservationConfirm = async () => {
    setIsLoading(true);
    await reservationConfirmCustomer({"code":code})
    .then(result => {
        if(result.success){
            Swal.fire({
                title: "Konfirme Edildi!",
                text: result.message,
                icon: "success",
                confirmButtonText: "Tamam"
            });
            setRefreshData(Math.floor(Math.random() * 10));
        }else{
            Swal.fire({
                title: "Başarısız!",
                text: result.message,
                icon: "error",
                confirmButtonText: "Tamam"
            });
        }
    }).catch(result => {
        setIsLoading(false);
        setError(String(result));
    });
  }

  return (

    <>
    {
        isLoading ? (
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', padding:30}}>
                <Spinner animation="border" />
            </div>
        ) : error ? (
            <h3 className='text-danger'>{error}</h3>
        ) : (
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="card text-center">
                            <div className="card-header">
                                <h1>{reservationData.restaurant_name}</h1>
                                <p>Sayın {reservationData.customer_name};</p>
                            </div>
                            <div className="card-body">
                                {reservationData.status == 5 ? (<div className="text-danger"><h5><FaTimes/> Rezervasyonunuz İptal Edilmiştir</h5>
                                <p></p>
                                <hr /></div>) : ('')}

                                <h5 className="card-title">Rezervasyon Bilgileri</h5>
                                <p className="card-text">
                                    Tarih: {dateTr(reservationData.date)} <br />
                                    Saat: {dateTr(reservationData.date + 'T' + reservationData.time, true)} <br />
                                    Misafir: {reservationData.number_of_people}
                                </p>
                                {/* <p>Dilerseniz bu rezervasyonu Google Takvime ekleyebilirsiniz.</p>
                                <a href="#" className="btn btn-primary">Google Takvime Ekle</a> */}
                                <hr />
                                <h5>Şartlar &amp; Koşullar</h5>
                                <p>Restoranımız 12:00 - 00:00 arası hizmet vermektedir.<br />
                                    Mutfak 22:45'e kadar açıktır.</p>
                                <hr />
                                <h5>Kıyafet Yönlülüğü</h5>
                                <p>Smart Casual'dır. Şort, terlik ve eşofman kabul edilmemektedir.</p>
                                <hr />

                                {reservationData.status != 5 ? (<><h6>Fikrinizi mi değiştirdiniz veya rezervasyonunuz ile ilgili değişiklik mi yapmak istiyorsunuz?</h6>
                                <div>
                                    <a data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" className="text-decoration-underline">
                                        Rezervasyonumla ilgili değişiklik yapmak istiyorum.
                                    </a>
                                    <div className="collapse mt-2" id="collapseExample">
                                        <div className="card card-body text-white bg-secondary">
                                            Rezervasyon ile ilgili değişiklik yapmak için <a style={{color:'white', fontSize:30}} href={'tel:' + reservationData.restaurant_phone}><FaPhoneAlt/> {reservationData.restaurant_phone}</a> numarasını arayarak restoran ile iletişime geçebilirsiniz.
                                        </div>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-danger m-3" onClick={reservationCanceled}>Rezervasyonu İptal Et</button>
                                {reservationData.status == 3 ? <button type="button" className="btn btn-success m-3" onClick={reservationConfirm}>Rezervasyonu Konfirme Et</button> : ''}
                                <hr /></>) : ('')}
                                
                                <h5>Adres</h5>
                                <p>{reservationData.restaurant_address  ?? '-'}</p>
                                <hr />
                                <h5>Telefon</h5>
                                <p>{reservationData.restaurant_phone  ?? '-'}</p>
                                <hr />
                                <h5>Email</h5>
                                <p>{reservationData.restaurant_email ?? '-'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    </>
  );
}

export default ReservationInfo;
  