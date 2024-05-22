import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Button, Alert, Spinner } from 'react-bootstrap';
import { getByIdCustomerDetail } from '../../services/CustomerService';
import { getByCustomerId } from '../../services/ReservationService';
import InfoCard from '../../components/Dashboard/InfoCard';

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [reservationData, setReservationData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

    useEffect(() => {

        const fetchCustomerData = async () => {
            setIsLoading(true);
            setError(null); 

            await getByIdCustomerDetail(id)
            .then(result => {
                if(result.success){
                    setCustomer(result.data);
                
                }else{
                
                    setError(result.message);
                }
            }).catch(result => {
            
                setError(String(result));
            });

            await getByCustomerId(id)
            .then(result => {
                if(result.success){
                    setReservationData(result.data);
                }else{                   
                    setError(result.message);
                }
            }).catch(result => {             
                setError(String(result));
            });
            setIsLoading(false);
        };

        fetchCustomerData();
    }, [id]);

    const dateTr = (date) => {
        if (date == null || date === undefined || date === '') {
            return '';
        }

        var result = date.split("-");
        return result[2] + "/" + result[1] + "/" + result[0];
    }

    const reservationDateTr = (date) => {
        date = new Date(date);
        return date.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', weekday: 'short', hour: "numeric", minute: "numeric" });
    };

    const countStatus = (status) => {
        var result = reservationData.reduce(function (acc, cur) {
            return cur.status === status ? acc + 1 : acc;
        }, 0);
        return result;
    }

    const countNoShow = (status) => {
        var result = reservationData.reduce(function (acc, cur) {
            return cur.check_in === status ? acc + 1 : acc;
        }, 0);
        return result;
    }

  return (
    <>
        {isLoading || !customer ? 
            (<div style={{display:'flex', justifyContent:'center', alignItems:'center', padding:30}}>
                <Spinner animation="border" />
            </div>) 
            : error ? (<h3 className='text-danger'>{error}</h3>)
            : (<>
                <div className="content">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Misafirler / {customer.full_name}</h4>
                        <NavLink to={`/customer/edit/${customer.customer_id}`}>
                            <Button variant="secondary">Güncelle</Button>
                        </NavLink>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12 col-lg-4">
                            <InfoCard
                                title="Ziyaret"
                                value={reservationData.length}
                                icon="bx-user"
                                backGround="voilet"
                                isLoading={isLoading}
                            />
                        </div>
                        <div className="col-12 col-lg-4">
                            <InfoCard
                                title="NoShow"
                                value={countNoShow(String(2))}
                                icon="bx-low-vision"
                                backGround="rose"
                                isLoading={isLoading}
                            />
                        </div>
                        <div className="col-12 col-lg-4">
                            <InfoCard
                                title="İptal"
                                value={countStatus(String(5))}
                                icon="bx-x"
                                backGround="sunset"
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">Genel Bilgiler</div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-md-3">
                                <h6>Dil</h6>
                                <p>{customer.language}</p>
                                </div>
                                <div className="col-md-3">
                                <h6>Ülke</h6>
                                <p>{customer.country_name}</p>
                                </div>
                                <div className="col-md-3">
                                <h6>Ad Soyad</h6>
                                <p>{customer.full_name}</p>
                                </div>
                                <div className="col-md-3">
                                <h6>Cep Telefonu</h6>
                                <p>{customer.phone}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                <h6>E-Posta Adresi</h6>
                                <p>{customer.email}</p>
                                </div>
                                <div className="col-md-3">
                                <h6>Doğum Tarihi</h6>
                                <p>{dateTr(customer.birth_date)}</p>
                                </div>
                                <div className="col-md-3">
                                <h6>Yıl Dönümü</h6>
                                <p>{dateTr(customer.anniversary_date)}</p>
                                </div>
                                <div className="col-md-3">
                                <h6>Cinsiyet</h6>
                                <p>{customer.gender}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                <h6>Notlar</h6>
                                <p>{customer.customer_note}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">Asistan Bilgileri</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <h6>Ad Soyad</h6>
                                    <p>{customer.assistant_full_name}</p>
                                </div>
                                <div className="col-md-4">
                                    <h6>Cep Telefonu</h6>
                                    <p>{customer.assistant_phone}</p>
                                </div>
                                <div className="col-md-4">
                                    <h6>E-Posta Adresi</h6>
                                    <p>{customer.assistant_email}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">Etiketler</div>
                        <div className="card-body">
                        <p>Bu bölümde misafir ile ilişkilendirilmiş etiketleri görebilirsiniz.</p>
                        <p>İlişkili etiket bulunamadı</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">Şirket Bilgileri</div>
                        <div className="card-body">
                        <p>Bu bölümde misafire ait şirket bilgilerini görebilirsiniz.</p>
                        <h6>Şirket</h6>
                        <p>{customer.company_name}</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">Bildirim Seçebekleri</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <h6>SMS / E-Posta bildirimi yapılabilir mi?</h6>
                                    <div className="row">
                                        <div className="col-6">
                                            <span style={{fontWeight:500}}>SMS: </span>{customer.sms_permission === 1 ? 'Evet' : 'Hayır'}
                                        </div>
                                        <div className="col-6">
                                            <span style={{fontWeight:500}}>E-posta: </span>{customer.email_permission === 1 ? 'Evet' : 'Hayır'}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <h6>Konfirmasyon için sms/e-posta bildirimi yapılabilir mi?</h6>
                                     <div className="row">
                                        <div className="col-6">
                                            <span style={{fontWeight:500}}>SMS: </span>{customer.sms_permission === 1 ? 'Evet' : 'Hayır'}
                                        </div>
                                        <div className="col-6">
                                            <span style={{fontWeight:500}}>E-posta: </span>{customer.email_permission === 1 ? 'Evet' : 'Hayır'}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <h6>Değerlendirme için sms/e-posta bildirimi yapılabilir mi?</h6>
                                     <div className="row">
                                        <div className="col-6">
                                            <span style={{fontWeight:500}}>SMS: </span>{customer.sms_permission === 1 ? 'Evet' : 'Hayır'}
                                        </div>
                                        <div className="col-6">
                                            <span style={{fontWeight:500}}>E-posta: </span>{customer.email_permission === 1 ? 'Evet' : 'Hayır'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">Rezervasyonlar ({reservationData.length})</div>
                        <div className="card-body">
                        <p>Bu bölümde misafire ait rezervasyonları görebilirsiniz.</p>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Durum</th>
                                <th>Tarih</th>
                                <th>Misafir</th>
                                <th>NoShow</th>
                            </tr>
                            </thead>
                            <tbody>
                                {reservationData.map((value, key) => (
                                    <tr key={key}>
                                        <td>{value.status_text}</td>
                                        <td>{reservationDateTr(value.date + 'T' + value.time)}</td>
                                        <td>{value.number_of_people}</td>
                                        <td>{value.check_in != 0 ? value.check_in_status_text : '-'}</td>
                                    </tr>
                                ))}
                            
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>

            </>)
        }
    </>
  );
};

export default CustomerDetail;
