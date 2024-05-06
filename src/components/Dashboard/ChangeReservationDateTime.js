import { useEffect, useState } from 'react';
import { Modal, Button, Spinner, Alert, Table } from 'react-bootstrap';
import { getById, changeDateTime } from '../../services/ReservationService';
import { FaInfoCircle } from "react-icons/fa";
import { changeReservationDataTimeSchema } from '../../utils/validations/GlobalSchema';
import Swal from 'sweetalert2';
import DatePicker, { registerLocale } from "react-datepicker";
import { useFormik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { tr } from 'date-fns/locale/tr';
import TimePicker from './Form/TimePicker';
registerLocale('tr', tr)

const ChangeReservationDateTime = ({ modalItemId, setModalItemId, title, show, setShow, refreshMainData }) => {
    const [reservationData, setReservationData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshData, setRefreshData] = useState(null);
    const [newDate, setNewDate] = useState(null);

    useEffect(() => {
        const fetchReservationData = async () => {
            setIsLoading(true);
            setError(null); 
            await getById(modalItemId)
            .then(result => {
                if(result.success){
                    setReservationData(result.data);
                    setIsLoading(false);
                    formSetValues(result.data);
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

        return () => {
            setNewDate(null);
        };
    }, [modalItemId, refreshData]);

    // Modalı kapama fonksiyonu
    const handleClose = () => {
        setShow(false);
        //setModalItemId('');
    }

    const dateTr = (date) => {
        date = new Date(date);
        return date.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', weekday: 'short', hour: "numeric", minute: "numeric" });
    };

    const dateCompress = (date, time) => {
        if (date != null && time != null) {
            var newdate = new Date(formatDateToDatabaseFormat(date) + 'T' + time);
            return newdate.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', weekday: 'short', hour: "numeric", minute: "numeric" });
        }

        if (date == null) {
            if (time != null) {
                var newdate = new Date(reservationData.date + 'T' + time);
                return newdate.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', weekday: 'short', hour: "numeric", minute: "numeric" });
            }
            return '';
        }

        if (time == null) {
            if (date != null) {
                var newdate = new Date(formatDateToDatabaseFormat(date) + 'T' + reservationData.time);
                return newdate.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', weekday: 'short', hour: "numeric", minute: "numeric" });
            }
            return '';
        }
    }

    const formSetValues = (data) => {
        setFieldValue('reservation_id', data.reservation_id, false);
        setFieldValue('date', new Date(data.date), false);
        setFieldValue('time', data.rendered_time, false);
    }

    function formatDateToDatabaseFormat(date, time = 'day') {
        date = new Date(date);
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

    /*FORM*/
    const { handleSubmit, handleChange, values, touched, errors, dirty, isSubmitting, resetForm, setValues, setFieldValue } = useFormik({
        initialValues: {
            reservation_id: '',
            date: '',
            time: ''
        },
        validationSchema: changeReservationDataTimeSchema,
        onSubmit: async (values) => {
            values.date = formatDateToDatabaseFormat(values.date);
            setError('');
            setIsLoading(true);
            
            await changeDateTime(values)
                .then(result => {
                    if(result.success){
                        Swal.fire({
                            title: "Başarılı!",
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
    })

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
        <Modal.Body>
            {
                isLoading ? (
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', padding:30}}>
                        <Spinner animation="border" />
                    </div>
                ) : error ? (
                    <h3 className='text-danger'>{error}</h3>
                ) : (
                    <>
                        <div className='row'>
                            <div className='col-12'>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Ad Soyad</th>
                                            <th>Tarih</th>
                                            <th>Misafir</th>
                                            <th>Masa No</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{reservationData.customer_name}</td>
                                            <td>{dateTr(reservationData.date + 'T' + reservationData.time)}</td>
                                            <td>{reservationData.number_of_people}</td>
                                            <td>{reservationData.location_name + ' / ' + (reservationData.table_name ?? '-')}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>

                            <div className='col-md-6 mt-3'>
                                <DatePicker
                                    locale="tr"
                                    onChange={(date) => {setFieldValue('date', date, false); setNewDate(date);}}
                                    selected={values.date}
                                    inline
                                />
                                {touched.date && errors.date ? (
                                    <div className="validation-error-span">{errors.date}</div>
                                ) : null}
                            </div>

                            <div className='col-md-6 mt-3'>
                                <TimePicker value={values.time} setFieldValue={setFieldValue} />
                                {touched.time && errors.time ? (
                                    <div className="validation-error-span">{errors.time}</div>
                                ) : null}
                            </div>

                            <div className='col-12 mt-3'>
                                <h6>Yeni Tarih/Saat</h6>
                                
                                {(newDate || values.time != reservationData.rendered_time) ? (<span>{dateCompress(newDate, values.time)}</span>) : (<span><FaInfoCircle /> Henüz seçim yapılmadı.</span>)}
                            </div>
                        </div>
                        {/* add style */}
                        <style>{`
                            .react-datepicker__month-container {width:100%;}
                            .react-datepicker {width:100%; height:100%;}
                        `}</style>
                    </>
                )
            }
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Kapat
            </Button>
            <Button variant="success" disabled={!newDate && values.time == reservationData.rendered_time} onClick={handleSubmit}>
            Güncelle
            </Button>
        </Modal.Footer>
        </Modal>
    );
}

export default ChangeReservationDateTime;