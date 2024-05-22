import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Button, Alert, Spinner, Form } from 'react-bootstrap';
import { useFormik } from "formik";
import { getById, updateCustomer } from '../../services/CustomerService';
import { updateCustomerSchema } from '../../utils/validations/GlobalSchema';
import CountryCodeSelect from '../../components/Dashboard/Form/CountryCodeSelect';
import LanguageSelect from '../../components/Dashboard/Form/LanguageSelect';
import LevelSelect from '../../components/Dashboard/Form/LevelSelect';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

const CustomerEdit = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
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
    gender: '',
    sms_permission: '',
    email_permission: ''
});

    useEffect(() => {

        const fetchCustomerData = async () => {
            setIsLoading(true);
            setError(null); 

            await getById(id)
            .then(result => {
                if(result.success){
                    setCustomer(result.data);
                    setInitialData({
                        customer_id: id ?? '',
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
                        gender: result.data.gender ?? '',
                        sms_permission: result.data.sms_permission  === '1' ? true : false,
                        email_permission: result.data.email_permission  === '1' ? true : false
                    });
                }else{
                
                    setError(result.message);
                }
            }).catch(result => {
            
                setError(String(result));
            });
            setIsLoading(false);
        };

        fetchCustomerData();
    }, [id,refreshData]);


    /*FORM*/

    const formik = useFormik({
        initialValues: initialData,
        enableReinitialize: true,
        validationSchema: updateCustomerSchema,
        onSubmit: async (values) => {
            values.birth_date = formatDateToDatabaseFormat(values.birth_date);
            values.anniversary_date = formatDateToDatabaseFormat(values.anniversary_date);
          
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

    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date);
    };

  return (
    <>
        {isLoading || !customer ? 
            (<div style={{display:'flex', justifyContent:'center', alignItems:'center', padding:30}}>
                <Spinner animation="border" />
            </div>) 
            : error ? (<h3 className='text-danger'>{error}</h3>)
            : (<>
            <Form onSubmit={formik.handleSubmit}>
                <div className="content row">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Misafirler / {customer.full_name}</h4>
                        <NavLink to={`/customers`}>
                            <Button variant="secondary">Tüm Müşteriler</Button>
                        </NavLink>
                    </div>
                    
                    <div className='col-md-9'>
                       
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Genel Bilgiler</h5>
                                    <hr />
                                        <div className='row mb-3'>
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
                                                    <br/>
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
                                                    <br/>
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
                                        </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Asistan Bilgileri</h5>
                                    <hr />
                                    <div className='row mb-3'>
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

                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">VIP, Seviye Seçenekleri</h5>
                                    <hr />
                                    <div className='row mb-3'>

                                        <div className="col-md-6">
                                            <Form.Group className="mb-3" controlId="formBasicCheckboxs">
                                                <Form.Label>VIP Misafir mi?</Form.Label>
                                                <Form.Check type="checkbox" label="VIP Misafir" name="vip" checked={formik.values.vip} onChange={formik.handleChange} />
                                            </Form.Group>    
                                        </div>

                                        <div className="col-md-6">
                                        <LevelSelect value={formik.values.level_id} handleChange={formik.handleChange} name="level_id"></LevelSelect>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Bildirim Seçenekleri</h5>
                                    <hr />
                                    <div className='row mb-3'>

                                        <div className="col-md-6">
                                            <Form.Group>
                                                <Form.Check
                                                    type="checkbox"
                                                    id="customerSmsPermission"
                                                    label="SMS Gönderilsin"
                                                    checked={formik.values.sms_permission}
                                                    name="sms_permission"
                                                    onChange={formik.handleChange}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Group>
                                                <Form.Check
                                                    type="checkbox"
                                                    id="customerEmailPermission"
                                                    label="E-posta Gönderilsin"
                                                    checked={formik.values.email_permission}
                                                    name="email_permission"
                                                    onChange={formik.handleChange}
                                                />
                                            </Form.Group>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        
                    </div>
                    <div className='col-md-3'>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">İşlemler</h5>
                                <hr />
                                <div className="d-grid gap-2">
                                    <Button variant="success" type="submit" disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)}>
                                        Kaydet
                                    </Button>
                                    <Button variant="secondary">
                                        İptal
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                </Form>
            </>)
        }
    </>
  );
};

export default CustomerEdit;
