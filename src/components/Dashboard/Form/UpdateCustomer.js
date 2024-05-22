import React, { useState, useEffect, forwardRef, useImperativeHandle  } from 'react';
import { useFormik, ErrorMessage  } from "formik";
import { Modal, Button, Alert, Form, Tabs, Tab, Spinner } from 'react-bootstrap';
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import LanguageSelect from "./LanguageSelect";
import CountryCodeSelect from "./CountryCodeSelect";
import LevelSelect from './LevelSelect';
import { getById, updateCustomer } from '../../../services/CustomerService';
import { updateCustomerSchema } from '../../../utils/validations/GlobalSchema';

const UpdateCustomer = forwardRef((props, ref) => {

    const [customerData, setCustomerData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshData, setRefreshData] = useState(null);
    const [initialData, setInitialData] = useState({
        customer_id: '',
        full_name: '',
        phone: '',
        birth_date: new Date(),
        anniversary_date: new Date(),
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
            await getById(props.customer_id)
            .then(result => {
                if(result.success){
                    setCustomerData(result.data);
                    setInitialData({
                        customer_id: props.customer_id ?? '',
                        full_name: result.data.full_name ?? '',
                        phone: result.data.phone ?? '',
                        birth_date: (result.data.birth_date ==! null || result.data.birth_date ==! '') ? new Date(result.data.birth_date + 'T00:00:00') : null,
                        anniversary_date: (result.data.anniversary_date ==! null || result.data.anniversary_date ==! '') ? new Date(result.data.anniversary_date + 'T00:00:00') : null,
                        email: result.data.email ?? '',
                        language_code: result.data.language_code ?? 'tr',
                        country_telephone_code_id: result.data.country_telephone_code_id ?? '237',
                        level_id: result.data.level_id ?? '',
                        vip: result.data.vip === '1' ? true : false,
                        customer_note: result.data.customer_note ?? '',
                        assistant_full_name: result.data.assistant_full_name ?? '',
                        assistant_phone: result.data.assistant_phone ?? '',
                        assistant_email: result.data.assistant_email ?? '',
                        gender: result.data.gender ?? ''
                    });
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
    }, [refreshData]);

    /*FORM*/

    const formik = useFormik({
        initialValues: initialData,
        enableReinitialize: true,
        validationSchema: updateCustomerSchema,
        onSubmit: async (values) => {
            values.birth_date = formatDateToDatabaseFormat(values.birth_date);
            values.anniversary_date = formatDateToDatabaseFormat(values.anniversary_date);
            
            //console.log(JSON.stringify(values, null, 2));
          
            setError('');
            setIsLoading(true);
            
            await updateCustomer(values)
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
                        props.refreshMainData();
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

    useImperativeHandle(ref, () => ({
        submitForm: formik.submitForm,
        isDirty: formik.dirty,
        isValid: formik.isValid,
    }));

    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date);
    };

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

    return (
        <>
            {isLoading ? (<div style={{display:'flex', justifyContent:'center', alignItems:'center', padding:30}}>
                                <Spinner animation="border" />
                            </div>) 
                            : (<Form onSubmit={formik.handleSubmit}>
                                <div className='row'>
                                    <div className='col-md-3 text-center'>
                                        <FaCalendarAlt style={{color:'#c09853', margin:10, fontSize:60}}/>
                                        <h6 className='mt-2'>Rezervasyon Bilgileri</h6>
                                        <p className="mb-0 fw-bold">{props.date}</p>
                                        <p className="mb-0 text-secondary">{props.number} Misafir</p>
                                        <hr/>
                                        <a href='#'>Misafir Detayına Git</a>
                                        <br/>
                                        <a href='#'>Detaylı Düzenle</a>
                                    </div>
                                    <div className='col-md-9'>
                                        <div className='row'>
                
                                            <div className="col-md-6">
                                                <LanguageSelect value={formik.values.language_code} handleChange={formik.handleChange} name="language_code"></LanguageSelect>
                                            </div>
                
                                            <div className="col-md-6">
                                                <CountryCodeSelect value={formik.values.country_telephone_code_id} handleChange={formik.handleChange} name="country_telephone_code_id"></CountryCodeSelect>
                                                {formik.touched.country_telephone_code_id && formik.errors.country_telephone_code_id ? (
                                                    <Form.Text className="text-muted text-danger">
                                                        {formik.errors.country_telephone_code_id}
                                                    </Form.Text>
                                                ) : null}
                                            </div>
                
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3" controlId="formBasicFullName">
                                                    <Form.Label>Ad Soyad <strong style={{color: '#dd4814'}}>*</strong></Form.Label>
                                                    <Form.Control type="text" name="full_name" placeholder="Müşteri adı" value={formik.values.full_name} onChange={formik.handleChange} isInvalid={!!formik.errors.full_name}/>
                                                    {formik.touched.full_name && formik.errors.full_name ? (
                                                        <Form.Text className="text-muted text-danger">
                                                            {formik.errors.full_name}
                                                        </Form.Text>
                                                    ) : null}
                                                </Form.Group>
                                                
                                            </div>
                
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3" controlId="formBasicTelephone">
                                                    <Form.Label>Telefon <strong style={{color: '#dd4814'}}>*</strong></Form.Label>
                                                    <Form.Control type="text" name="phone" placeholder="5xxxxxxx" value={formik.values.phone} onChange={formik.handleChange} isInvalid={!!formik.errors.phone} />
                                                    {formik.touched.phone && formik.errors.phone ? (
                                                        <Form.Text className="text-muted text-danger">
                                                            {formik.errors.phone}
                                                        </Form.Text>
                                                    ) : null}
                                                </Form.Group>
                                            </div>
                
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>E-posta</Form.Label>
                                                    <Form.Control type="email" name="email" placeholder="E-posta adresi" value={formik.values.email} onChange={formik.handleChange} isInvalid={!!formik.errors.email} />
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <Form.Text className="text-muted text-danger">
                                                            {formik.errors.email}
                                                        </Form.Text>
                                                    ) : null}
                                                </Form.Group>
                                            </div>
                
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3" controlId="formBasicSelectss">
                                                    <Form.Label>Cinsiyet</Form.Label>
                                                    <Form.Select name="gender" className="form-select" aria-label="Kadın,Erkek,Diğer..." value={formik.values.gender} onChange={formik.handleChange} isInvalid={!!formik.errors.gender}>
                                                        <option value="">Kadın,Erkek,Diğer...</option>
                                                        <option value="Kadın">Kadın</option>
                                                        <option value="Erkek">Erkek</option>
                                                        <option value="Diğer">Diğer</option>
                                                    </Form.Select>
                                                    {formik.touched.gender && formik.errors.gender ? (
                                                        <div className="validation-error-span">{formik.errors.gender}</div>
                                                    ) : null}
                                                </Form.Group>
                                            </div>
                
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3" controlId="formBasicDateOfBirth">
                                                    <Form.Label>Doğum Tarihi</Form.Label>
                                                    <DatePicker
                                                        showIcon
                                                        locale="tr"
                                                        selected={formik.values.birth_date}
                                                        onChange={(date) => {
                                                            if (isValidDate(date)) {
                                                                formik.setFieldValue('birth_date', date, false);
                                                            } 
                                                        }}
                                                        dateFormat="dd/MM/yyyy"
                                                        className='form-control'
                                                        placeholderText="Gün/Ay/Yıl"
                                                    />
                                                    {formik.touched.birth_date && formik.errors.birth_date ? (
                                                        <div className="validation-error-span">{formik.errors.birth_date}</div>
                                                    ) : null}
                                                </Form.Group>
                                            </div>
                
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3" controlId="formBasicAnniversary">
                                                    <Form.Label>Yıl Dönümü</Form.Label>
                                                    <DatePicker
                                                        showIcon
                                                        locale="tr"
                                                        selected={formik.values.anniversary_date}
                                                        onChange={(date) => {
                                                            if (isValidDate(date)) {
                                                                formik.setFieldValue('anniversary_date', date, false)
                                                            } 
                                                        }}
                                                        dateFormat="dd/MM/yyyy"
                                                        className='form-control'
                                                        placeholderText="Gün/Ay/Yıl"
                                                    />
                                                    {formik.touched.anniversary_date && formik.errors.anniversary_date ? (
                                                        <div className="validation-error-span">{formik.errors.anniversary_date}</div>
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
                                                        value={formik.values.customer_note} 
                                                        onChange={formik.handleChange} 
                                                        isInvalid={!!formik.errors.customer_note}
                                                    />
                                                    {formik.touched.customer_note && formik.errors.customer_note ? (
                                                        <Form.Text className="text-muted text-danger">
                                                            {formik.errors.customer_note}
                                                        </Form.Text>
                                                    ) : null}
                                                </Form.Group>
                                            </div>
                                            
                                            <div className="col-md-12">
                                                <h5>Segmentasyon</h5>
                                                <hr/>
                                            </div>
                
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3" controlId="formBasicCheckboxs">
                                                    <Form.Label>VIP Misafir mi?</Form.Label>
                                                    <Form.Check type="checkbox" label="VIP Misafir" name="vip" checked={formik.values.vip} onChange={formik.handleChange} />
                                                </Form.Group>
                                            </div>
                
                                            <div className="col-md-6">
                                                <LevelSelect value={formik.values.level_id} handleChange={formik.handleChange} name="level_id"></LevelSelect>
                                            </div>
                
                                            <div className="col-md-12">
                                                <h5>Asistan Bilgileri</h5>
                                                <hr/>
                                            </div>
                
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3" controlId="formBasicAssistantFullName">
                                                    <Form.Label>Ad Soyad</Form.Label>
                                                    <Form.Control type="text" name="assistant_full_name" placeholder="Asistan adı" value={formik.values.assistant_full_name} onChange={formik.handleChange} />
                                                    {formik.touched.assistant_full_name && formik.errors.assistant_full_name ? (
                                                        <Form.Text className="text-muted text-danger">
                                                            {formik.errors.assistant_full_name}
                                                        </Form.Text>
                                                    ) : null}
                                                </Form.Group>
                                            </div>
                
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3" controlId="formBasicAssistantTelephone">
                                                    <Form.Label>Telefon</Form.Label>
                                                    <Form.Control type="text" name="assistant_phone" placeholder="5xxxxxxx" value={formik.values.assistant_phone} onChange={formik.handleChange} />
                                                    {formik.touched.assistant_phone && formik.errors.assistant_phone ? (
                                                        <Form.Text className="text-muted text-danger">
                                                            {formik.errors.assistant_phone}
                                                        </Form.Text>
                                                    ) : null}
                                                </Form.Group>
                                            </div>
                
                                            <div className="col-md-6">
                                                <Form.Group className="mb-3" controlId="formBasicAssistantEmail">
                                                    <Form.Label>E-posta</Form.Label>
                                                    <Form.Control type="email" name="assistant_email" placeholder="Asistan E-posta adresi" value={formik.values.assistant_email} onChange={formik.handleChange} isInvalid={!!formik.errors.assistant_email} />
                                                    {formik.touched.assistant_email && formik.errors.assistant_email ? (
                                                        <Form.Text className="text-muted text-danger">
                                                            {formik.errors.assistant_email}
                                                        </Form.Text>
                                                    ) : null}
                                                </Form.Group>
                                            </div>
                
                                        
                                        </div>
                                    </div>
                                </div>
                            </Form>)
            }
        </>
    );
});

export default UpdateCustomer;