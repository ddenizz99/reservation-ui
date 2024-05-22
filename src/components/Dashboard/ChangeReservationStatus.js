import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button, Spinner, Alert } from 'react-bootstrap';
import { MdDateRange, MdCheckCircleOutline, MdAccessTime, MdPayment, MdBlock } from "react-icons/md";
import { getById, reservationCanceled, reservationConfirm, askForConfirmation, bookAgain } from '../../services/ReservationService';
import UpdateCustomer from '../../components/Dashboard/Form/UpdateCustomer'; 
import Swal from 'sweetalert2';

const ChangeReservationStatus = ({ modalItemId, setModalItemId, show, setShow, refreshMainData }) => {

    const formRef = useRef(null);
    const [isCustomerUpdateFormDirty, setIsCustomerUpdateFormDirty] = useState(false);
    const [isCustomerUpdateFormValid, setIsCustomerUpdateFormValid] = useState(true);

    const [reservationData, setReservationData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshData, setRefreshData] = useState(null);
    const [customerUpdateWindow, setCustomerUpdateWindow] = useState(null);
    const [title, setTitle] = useState('Durum Değiştir');

    useEffect(() => {
        const fetchReservationData = async () => {
            setIsLoading(true);
            setError(null); 
            await getById(modalItemId)
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

        const interval = setInterval(() => {
            if (formRef.current) {
                setIsCustomerUpdateFormDirty(formRef.current.isDirty);
                setIsCustomerUpdateFormValid(formRef.current.isValid);
            }
        }, 100);
        return () => clearInterval(interval);
        /* if (formRef.current) {
            setIsCustomerUpdateFormDirty(formRef.current.isDirty);
            setIsCustomerUpdateFormValid(formRef.current.isValid);
        } */
    }, [modalItemId, refreshData]);

    // Modalı kapama fonksiyonu
    const handleClose = () => {
        setShow(false);
        //setModalItemId('');
    }

    const customerUpdateHandleButtonClick = () => {
        if (formRef.current) {
            formRef.current.submitForm();
        }
    };

    const dateTr = (date) => {
        date = new Date(date);
        return date.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', weekday: 'short', hour: "numeric", minute: "numeric" });
    };

    const buttonStyle = {
        display:'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
    }

    const reservationCancel = () => {
        Swal.fire({
            title: "Rezervasyonu iptal etmek istiyor musunuz?",
            text: "Rezervasyon iptal edilmek üzere!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Hayır",
            confirmButtonText: "Evet, İptal Et"
          }).then(async (result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                await reservationCanceled({"reservation_id":reservationData.reservation_id})
                .then(result => {
                    if(result.success){
                        Swal.fire({
                            title: "İptal Edildi!",
                            text: result.message,
                            icon: "success",
                            confirmButtonText: "Tamam"
                        });
                        setRefreshData(Math.floor(Math.random() * 10));
                        //main data
                        refreshMainData();
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

    const reservationConfirmed = async () => {
        setIsLoading(true);
        await reservationConfirm({"reservation_id":reservationData.reservation_id})
        .then(result => {
            if(result.success){
                Swal.fire({
                    title: "Konfirme Edildi!",
                    text: result.message,
                    icon: "success",
                    confirmButtonText: "Tamam"
                });
                setRefreshData(Math.floor(Math.random() * 10));
                //main data
                refreshMainData();
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

    const handleAskForConfirmation = async () => {
        setIsLoading(true);
        await askForConfirmation({"reservation_id":reservationData.reservation_id})
        .then(result => {
            if(result.success){
                Swal.fire({
                    title: "İstek Gönderildi!",
                    text: result.message,
                    icon: "success",
                    confirmButtonText: "Tamam"
                });
                setRefreshData(Math.floor(Math.random() * 10));
                //main data
                refreshMainData();
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

    const handleBookAgain = async () => {
        setIsLoading(true);
        await bookAgain({"reservation_id":reservationData.reservation_id})
        .then(result => {
            if(result.success){
                Swal.fire({
                    title: "Tekrar Rezerve Edildi!",
                    text: result.message,
                    icon: "success",
                    confirmButtonText: "Tamam"
                });
                setRefreshData(Math.floor(Math.random() * 10));
                //main data
                refreshMainData();
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

    const statusHelper = () => {
        if (reservationData.reservation_log_status) {
            var user_name;
            var date;
            var reservation_log_person_who_verifies = JSON.parse(reservationData.reservation_log_person_who_verifies);

            if (reservation_log_person_who_verifies.user == "personal") {
                user_name = reservationData.added_user;
            }else{
                user_name = reservationData.customer_name;
            }

            if (reservationData.reservation_log_updated_at) {
                date = reservationData.reservation_log_updated_at;
            }else{
                date = reservationData.reservation_log_created_at;
            }

            switch (reservationData.reservation_log_status) {
                case '5':
                    return (<Alert key={'danger'} variant={'danger'}>
                                <b>{dateTr(date)}</b> tarihinde <b>{user_name}</b> tarafından iptal edildi.
                            </Alert>);

                case '6':
                    return (<Alert key={'secondary'} variant={'secondary'}>
                                <b>{dateTr(date)}</b> tarihinde <b>{user_name}</b> tarafından tekrar rezerve edildi.
                            </Alert>);
                    
                case '2':
                    return (<Alert key={'success'} variant={'success'}>
                                <b>{dateTr(date)}</b> tarihinde <b>{user_name}</b> tarafından konfirme edildi.
                            </Alert>);

                case '3':
                    return (<Alert key={'info'} variant={'info'}>
                                <b>Onay bekliyor.</b>
                            </Alert>);

                case '7':
                    return (<Alert key={'warning'} variant={'warning'}>
                                Geç Konfirme: <b>{dateTr(date)}</b> tarihinde <b>{user_name}</b> tarafından konfirme edildi.
                            </Alert>);
                    
            
                default:
                    return null;
                    
            }
        }  
        return null;
    }

    const eventHelper = () => {
        switch (reservationData.status) {
            case '5':
                return (<><button type="button" onClick={handleBookAgain} className="btn btn-outline-warning btn-block m-2 p-2 border-0" style={buttonStyle}>
                            <MdDateRange style={{fontSize:30}}/>
                            <span className='mt-2'>Rezervasyon</span>
                        </button></>);
                
            case '2':
                return (<><button type="button" onClick={reservationCancel} className="btn btn-outline-danger btn-block m-2 p-2 border-0" style={buttonStyle}>
                        <MdBlock style={{fontSize:30}}/>
                        <span className='mt-2'>İptal Et</span>
                    </button></>);

            case '3':
                return (<><button type="button" onClick={reservationConfirmed} className="btn btn-outline-success btn-block m-2 p-2 border-0" style={buttonStyle}>
                            <MdCheckCircleOutline style={{fontSize:30}}/>
                            <span className='mt-2'>Konfirme Et</span>
                        </button>
                        <button type="button" onClick={handleAskForConfirmation} className="btn btn-outline-primary btn-block m-2 p-2 border-0" style={buttonStyle}>
                            <MdAccessTime style={{fontSize:30}}/>
                            <span className='mt-2'>Konfirme İste</span>
                        </button>
                        <button type="button" onClick={reservationCancel} className="btn btn-outline-danger btn-block m-2 p-2 border-0" style={buttonStyle}>
                            <MdBlock style={{fontSize:30}}/>
                            <span className='mt-2'>İptal Et</span>
                        </button></>);

            case '4':
                return (<><button type="button" onClick={reservationCancel} className="btn btn-outline-danger btn-block m-2 p-2 border-0" style={buttonStyle}>
                        <MdBlock style={{fontSize:30}}/>
                        <span className='mt-2'>İptal Et</span>
                    </button></>);

            case '6':
                return (<><button type="button" onClick={reservationConfirmed} className="btn btn-outline-success btn-block m-2 p-2 border-0" style={buttonStyle}>
                            <MdCheckCircleOutline style={{fontSize:30}}/>
                            <span className='mt-2'>Konfirme Et</span>
                        </button>
                        <button type="button" onClick={handleAskForConfirmation} className="btn btn-outline-primary btn-block m-2 p-2 border-0" style={buttonStyle}>
                            <MdAccessTime style={{fontSize:30}}/>
                            <span className='mt-2'>Konfirme İste</span>
                        </button>
                        <button type="button" onClick={reservationCancel} className="btn btn-outline-danger btn-block m-2 p-2 border-0" style={buttonStyle}>
                            <MdBlock style={{fontSize:30}}/>
                            <span className='mt-2'>İptal Et</span>
                        </button></>);

            case '7':
                return (<><button type="button" onClick={reservationCancel} className="btn btn-outline-danger btn-block m-2 p-2 border-0" style={buttonStyle}>
                        <MdBlock style={{fontSize:30}}/>
                        <span className='mt-2'>İptal Et</span>
                    </button></>);
                
        
            default:
                return null;
                
        }
    }

    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            backdrop="static" 
            keyboard={false} 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
            {
                customerUpdateWindow ? (
                    <UpdateCustomer ref={formRef} customer_id={reservationData.customer_id} date={dateTr(reservationData.date + 'T' + reservationData.time)} number={reservationData.number_of_people} refreshMainData={refreshMainData} />
                    
                ) : isLoading ? (
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', padding:30}}>
                        <Spinner animation="border" />
                    </div>
                ) : error ? (
                    <h3 className='text-danger'>{error}</h3>
                ) : (
                    <div className='row'>
                        <div className='col-md-3'>
                            <div className="card radius-15">
                                <div className="card-body text-center">
                                    <img src="assets/images/avatars/empty-avt.png" width={100} height={100} className="rounded-circle p-1 border" />
                                    <h5 className="mb-0 mt-4">{reservationData.customer_name}</h5>
                                    <p className="mb-0 text-secondary">{reservationData.customer_phone}</p>
                                    <span className="mb-0 text-secondary">{reservationData.customer_email}</span>
                                    <hr/>
                                    <p className="mb-0 fw-bold">{dateTr(reservationData.date + 'T' + reservationData.time)}</p>
                                    <p className="mb-0 text-secondary">{reservationData.number_of_people} Misafir</p>
                                    <hr/>
                                    <div>
                                        <Button className="btn-sm mb-2" variant="secondary" onClick={() => {setCustomerUpdateWindow(true); setTitle('Misafir Bilgilerini Güncelle');}}>Düzenle</Button>
                                        <Button className="btn-sm mb-2" variant="secondary" onClick={() => console.log("misafir detayı")}>Misafir Detayı</Button>
                                    </div>

                                    <div className="list-inline contacts-social mt-3"> 
                                        <a href={`tel:${reservationData.customer_phone}`} className="list-inline-item"><i className="bx bxs-phone" /></a>
                                        <a href={`mail:${reservationData.customer_email}`} className="list-inline-item"><i className="bx bx-envelope" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-9 text-center'>
                            <Alert key={'warning'} variant={'warning'}>
                                <b>{dateTr(reservationData.created_at)}</b> tarihinde <b>{reservationData.added_user}</b> tarafından oluşturuldu.
                            </Alert>
                            {reservationData.reservation_log_status ? statusHelper() : null}
                            <hr className='mt-4 mb-4'/>
                            <h6 className='mb-3'>Rezervasyonla ilgili ne yapmak istiyorsunuz?</h6>
                            <div style={{display:'flex', justifyContent: 'center'}}>
                                {eventHelper()}
                            </div>
                        </div>
                    </div>
                )
            }
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Kapat</Button>
            {customerUpdateWindow && 
                <>
                    <Button variant="warning" onClick={() => {setCustomerUpdateWindow(false); setTitle('Durum Değiştir');}}>Geri Dön</Button>
                    <Button variant="success" onClick={customerUpdateHandleButtonClick} disabled={!(isCustomerUpdateFormValid && isCustomerUpdateFormDirty)}>Misafir Bilgilerini Güncelle</Button>
                </>
            }
        </Modal.Footer>
        </Modal>
    );
};

export default ChangeReservationStatus;