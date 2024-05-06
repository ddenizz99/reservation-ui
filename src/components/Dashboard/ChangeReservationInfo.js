import { useEffect, useState } from 'react';
import { Modal, Button, Spinner, Alert, Form } from 'react-bootstrap';
import { getById, changeReservationInfoApi } from '../../services/ReservationService';
import { useFormik, ErrorMessage  } from "formik";
import Swal from 'sweetalert2';
import TagsSelection from './Form/TagsSelection';
import PlatformSelect from './Form/PlatformSelect';
import { changeReservationInfoSchema } from '../../utils/validations/GlobalSchema';

const ChangeReservationInfo = ({ modalItemId, setModalItemId, title, show, setShow, refreshMainData }) => {

    const [reservationData, setReservationData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshData, setRefreshData] = useState(null);
    const [initialData, setInitialData] = useState({
        reservation_id: '',
        tags: [],
        notes: '',
        cake_order: 'no',
        flower_order: 'no',
        platform: ''
    });

    useEffect(() => {
        const fetchReservationData = async () => {
            setIsLoading(true);
            setError(null); 
            await getById(modalItemId)
            .then(result => {
                if(result.success){
                    setReservationData(result.data);
                    setIsLoading(false);
                    setInitialData({
                        reservation_id: result.data.reservation_id,
                        tags: JSON.parse(result.data.tags),
                        notes: result.data.reservation_note,
                        cake_order: result.data.cake_order,
                        flower_order: result.data.flower_order,
                        platform: result.data.platform
                    });
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
        
    }, [modalItemId, refreshData]);

    /*FORM*/
    const { handleSubmit, handleChange, values, touched, errors, dirty, isSubmitting, resetForm, setValues, setFieldValue, isValid } = useFormik({
        initialValues: initialData,
        enableReinitialize: true,
        validationSchema: changeReservationInfoSchema,
        onSubmit: async (values) => {
            await changeReservationInfoApi(values)
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

    // Modalı kapama fonksiyonu
    const handleClose = () => {
        setShow(false);
    }

    const dateTr = (date) => {
        date = new Date(date);
        return date.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', weekday: 'short', hour: "numeric", minute: "numeric" });
    };

    const buttonStyle = {
        display:'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
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
        <Modal.Body>
            {
                isLoading ? (
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
                                    <img src="assets/images/avatars/empty-avt.png" width={100} height={100} className="rounded-circle p-1 border" alt='' />
                                    <h5 className="mb-0 mt-4">{reservationData.customer_name}</h5>
                                    <p className="mb-0 text-secondary">{reservationData.customer_phone}</p>
                                    <span className="mb-0 text-secondary">{reservationData.customer_email}</span>
                                    <hr/>
                                    <p className="mb-0 fw-bold">{dateTr(reservationData.date + 'T' + reservationData.time)}</p>
                                    <p className="mb-0 text-secondary">{reservationData.number_of_people} Misafir</p>
                                    <hr/>
                                    <div>
                                        <button type="button" className="btn btn-secondary btn-sm mb-2">Düzenle</button>
                                        <button type="button" className="btn btn-secondary btn-sm mb-2">Misafir Detayı</button>
                                    </div>

                                    <div className="list-inline contacts-social mt-3"> 
                                        <a href={`tel:${reservationData.customer_phone}`} className="list-inline-item"><i className="bx bxs-phone" /></a>
                                        <a href={`mail:${reservationData.customer_email}`} className="list-inline-item"><i className="bx bx-envelope" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-9'>
                            <Form.Group className="mb-3 mt-3" controlId="formBasicTagsNotes">
                                <Form.Label className='fw-bold'>Rezervasyon Notları</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    placeholder="Doğum günü, evlilik teklifi, özel misafir vb."
                                    name="notes"
                                    value={values.notes} 
                                    onChange={handleChange} 
                                />
                                {touched.notes && errors.notes ? (
                                    <div className="validation-error-span">{errors.notes}</div>
                                ) : null}
                            </Form.Group>
                            <Form.Label className='fw-bold'>Etiketler</Form.Label>
                            <TagsSelection className="mb-3 mt-3" value={values.tags} setFieldValue={setFieldValue}></TagsSelection>

                            <PlatformSelect value={values.platform} setFieldValue={setFieldValue} touched={touched.platform} errors={errors.platform} />
                            <div className='row'>
                                <div className='col-md-6'>
                                <Form.Group className="mb-3 mt-3" controlId="formBasicCheck1">
                                    <Form.Label className='fw-bold'>Pasta siparişi var mı?</Form.Label>
                                    <br/>
                                    <Form.Check
                                        inline
                                        type="radio"
                                        id="default-radio-no"
                                        label="Hayır"
                                        name="cake_order"
                                        value="no"
                                        onChange={handleChange}
                                        checked={values.cake_order === 'no'}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        id="default-radio-yes"
                                        label="Evet"
                                        name="cake_order"
                                        value="yes"
                                        onChange={handleChange}
                                        checked={values.cake_order === 'yes'}
                                    />
                                    {touched.cake_order && errors.cake_order ? (
                                        <div className="validation-error-span">{errors.cake_order}</div>
                                    ) : null}
                                </Form.Group>
                                </div>
                                <div className='col-md-6'>
                                <Form.Group className="mb-3 mt-3" controlId="formBasicCheck2">
                                    <Form.Label className='fw-bold'>Çiçek siparişi var mı?</Form.Label>
                                    <br/>
                                    <Form.Check
                                        inline
                                        type="radio"
                                        id="default-radio-no-1"
                                        label="Hayır"
                                        name="flower_order"
                                        value="no"
                                        onChange={handleChange}
                                        checked={values.flower_order === 'no'}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        id="default-radio-yes-1"
                                        label="Evet"
                                        name="flower_order"
                                        value="yes"
                                        onChange={handleChange}
                                        checked={values.flower_order === 'yes'}
                                    />
                                    {touched.flower_order && errors.flower_order ? (
                                        <div className="validation-error-span">{errors.flower_order}</div>
                                    ) : null}
                                </Form.Group>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Kapat
            </Button>
            <Button variant="success" disabled={!(dirty && isValid)} onClick={handleSubmit}>
            Güncelle
            </Button>
        </Modal.Footer>
        </Modal>
    );
};

export default ChangeReservationInfo;