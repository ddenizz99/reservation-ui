import React, { useState, useEffect  } from 'react';
import { useFormik, ErrorMessage  } from "formik";
import { Modal, Button, Alert, Form, Tabs, Tab } from 'react-bootstrap';
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LanguageSelect from "./LanguageSelect";
import CountryCodeSelect from "./CountryCodeSelect";
import LevelSelect from './LevelSelect';
import { getById } from '../../../services/CustomerService';

const CustomerUpdate = ({customer_id, date, number}) => {

    const [customerData, setCustomerData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshData, setRefreshData] = useState(null);
    const [initialData, setInitialData] = useState({
        full_name: '',
        phone: '',
        birth_date:'',
        anniversary_date: '',
        email: '',
        language_code: 'tr',
        country_telephone_code_id: '237',
        level_id: '',
        vip: false,
        customer_note: '',
        assistant_full_name: '',
        assistant_phone: '',
        assistant_email: '',
        gender: ''
    });

    useEffect(() => {
        const fetchCustomerData = async () => {
            setIsLoading(true);
            setError(null); 
            await getById(customer_id)
            .then(result => {
                if(result.success){
                    setCustomerData(result.data);
                    setInitialData(...result.data);
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

        fetchCustomerData();
        //alert(JSON.stringify(customerData));
    }, []);

    /*FORM*/
    const { handleSubmit, handleChange, values, touched, errors, dirty, isSubmitting, resetForm, setValues, setFieldValue } = useFormik({
        initialValues: initialData,
        enableReinitialize: true,
        //validationSchema: createReservationSchema(newCustomerName),
        onSubmit: async (values) => {
            console.log(JSON.stringify(values));
            /* values.date = formatDateToDatabaseFormat(values.date);
            setError('');
            setIsLoading(true);
            
            await addReservation(values)
                .then(result => {
                    if(result.success){
                        setIsLoading(false);
                        toast.success(result.message);
                        CreateReservationDestroy();
                        handleClose();
                    }else{
                        setIsLoading(false);
                        setError(result.message);
                        toast.error(result.message);
                    }
                }).catch(result => {
                    setIsLoading(false);
                    setError(String(result));
                    toast.error(String(result));
                }); */
                
        }
    })

    return (
        <>
            <div className='row'>
                <div className='col-md-3 text-center'>
                    <FaCalendarAlt style={{color:'#c09853', margin:10, fontSize:60}}/>
                    <h6 className='mt-2'>Rezervasyon Bilgileri</h6>
                    <p className="mb-0 fw-bold">{date}</p>
                    <p className="mb-0 text-secondary">{number} Misafir</p>
                    <hr/>
                    <a href='#'>Misafir Detayına Git</a>
                    <br/>
                    <a href='#'>Detaylı Düzenle</a>
                </div>
                <div className='col-md-9'>
                    <div className='row'>

                        <div className="col-md-6">
                            <LanguageSelect value={values.language_code} handleChange={handleChange}></LanguageSelect>
                        </div>

                        <div className="col-md-6">
                            <CountryCodeSelect value={values.country_telephone_code_id} handleChange={handleChange}></CountryCodeSelect>
                            {touched.country_telephone_code_id && errors.country_telephone_code_id ? (
                                <Form.Text className="text-muted text-danger">
                                    {errors.country_telephone_code_id}
                                </Form.Text>
                            ) : null}
                        </div>

                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="formBasicFullName">
                                <Form.Label>Ad Soyad <strong style={{color: '#dd4814'}}>*</strong></Form.Label>
                                <Form.Control type="text" name="full_name" placeholder="Müşteri adı" value={values.full_name} onChange={handleChange} />
                                {touched.full_name && errors.full_name ? (
                                    <Form.Text className="text-muted text-danger">
                                        {errors.full_name}
                                    </Form.Text>
                                ) : null}
                            </Form.Group>
                            
                        </div>

                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="formBasicTelephone">
                                <Form.Label>Telefon <strong style={{color: '#dd4814'}}>*</strong></Form.Label>
                                <Form.Control type="text" name="phone" placeholder="5xxxxxxx" value={values.phone} onChange={handleChange} />
                                {touched.phone && errors.phone ? (
                                    <Form.Text className="text-muted text-danger">
                                        {errors.phone}
                                    </Form.Text>
                                ) : null}
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>E-posta</Form.Label>
                                <Form.Control type="email" name="email" placeholder="E-posta adresi" value={values.email} onChange={handleChange} />
                                {touched.email && errors.email ? (
                                    <Form.Text className="text-muted text-danger">
                                        {errors.email}
                                    </Form.Text>
                                ) : null}
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="formBasicSelectss">
                                <Form.Label>Cinsiyet</Form.Label>
                                <Form.Select name="platform" className="form-select" aria-label="Kadın,Erkek,Diğer..." value={values.gender} onChange={handleChange}>
                                    <option value="">Kadın,Erkek,Diğer...</option>
                                    <option value="Kadın">Kadın</option>
                                    <option value="Erkek">Erkek</option>
                                    <option value="Diğer">Diğer</option>
                                </Form.Select>
                                {touched.gender && errors.gender ? (
                                    <div className="validation-error-span">{errors.gender}</div>
                                ) : null}
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="formBasicDateOfBirth">
                                <Form.Label>Doğum Tarihi</Form.Label>
                                <DatePicker
                                    showIcon
                                    locale="tr"
                                    selected={values.birth_date}
                                    onChange={(date) => setFieldValue('birth_date', date, false)}
                                    dateFormat="yyyy-MM-dd"
                                    className='form-control'
                                />
                                {touched.birth_date && errors.birth_date ? (
                                    <div className="validation-error-span">{errors.birth_date}</div>
                                ) : null}
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="formBasicAnniversary">
                                <Form.Label>Yıl Dönümü</Form.Label>
                                <DatePicker
                                    showIcon
                                    locale="tr"
                                    selected={values.anniversary_date}
                                    onChange={(date) => setFieldValue('anniversary_date', date, false)}
                                    dateFormat="yyyy-MM-dd"
                                    className='form-control'
                                />
                                {touched.anniversary_date && errors.anniversary_date ? (
                                    <div className="validation-error-span">{errors.anniversary_date}</div>
                                ) : null}
                            </Form.Group>
                        </div>

                        <div className="col-md-12">
                            <Form.Group className="mb-3" controlId="formBasicNotes">
                                <Form.Label>Not</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    placeholder="Misafire ait özel notlar"
                                    name="customer_note"
                                    value={values.customer_note} 
                                    onChange={handleChange} 
                                />
                                {touched.customer_note && errors.customer_note ? (
                                    <Form.Text className="text-muted text-danger">
                                        {errors.customer_note}
                                    </Form.Text>
                                ) : null}
                            </Form.Group>
                        </div>
                        
                        <div className="col-md-12">
                            <h5>Segmentasyon</h5>
                            <hr/>
                        </div>

                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Label>VIP Misafir mi?</Form.Label>
                                <Form.Check type="checkbox" label="VIP Misafir" name="vip" checked={values.vip} onChange={handleChange} />
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <LevelSelect value={values.level_id} handleChange={handleChange}></LevelSelect>
                        </div>

                        <div className="col-md-12">
                            <h5>Asistan Bilgileri</h5>
                            <hr/>
                        </div>

                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="formBasicAssistantFullName">
                                <Form.Label>Ad Soyad</Form.Label>
                                <Form.Control type="text" name="assistant_full_name" placeholder="Asistan adı" value={values.assistant_full_name} onChange={handleChange} />
                                {touched.assistant_full_name && errors.assistant_full_name ? (
                                    <Form.Text className="text-muted text-danger">
                                        {errors.assistant_full_name}
                                    </Form.Text>
                                ) : null}
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="formBasicAssistantTelephone">
                                <Form.Label>Telefon</Form.Label>
                                <Form.Control type="text" name="assistant_phone" placeholder="5xxxxxxx" value={values.assistant_phone} onChange={handleChange} />
                                {touched.assistant_phone && errors.assistant_phone ? (
                                    <Form.Text className="text-muted text-danger">
                                        {errors.assistant_phone}
                                    </Form.Text>
                                ) : null}
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group className="mb-3" controlId="formBasicAssistantEmail">
                                <Form.Label>E-posta</Form.Label>
                                <Form.Control type="email" name="assistant_email" placeholder="Asistan E-posta adresi" value={values.assistant_email} onChange={handleChange} />
                                {touched.assistant_email && errors.assistant_email ? (
                                    <Form.Text className="text-muted text-danger">
                                        {errors.assistant_email}
                                    </Form.Text>
                                ) : null}
                            </Form.Group>
                        </div>

                    
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerUpdate;