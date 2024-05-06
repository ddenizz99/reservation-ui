import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Modal, Button, Alert, Form } from 'react-bootstrap';
import FormWizard from "react-form-wizard-component";
import { BsInfoCircleFill } from "react-icons/bs";
import "react-form-wizard-component/dist/style.css";
import ReactSelect from "./Form/ReactSelect";
import SelectDate from "./Form/SelectDate";
import TimePicker from "./Form/TimePicker";
import TagsSelection from "./Form/TagsSelection";
import LocationRadio from "./Form/LocationRadio";
import NumberOfPeople from "./Form/NumberOfPeople";
import LevelSelect from "./Form/LevelSelect";
import LanguageSelect from "./Form/LanguageSelect";
import CountryCodeSelect from "./Form/CountryCodeSelect";
import { addReservation } from "../../services/ReservationService";
import { toast } from 'react-toastify';
import { createReservationSchema } from '../../utils/validations/GlobalSchema';

const CreateReservation = ({ show, handleClose }) => {

    const formWizardRef = useRef(null);
    const [finishButton, setFinishButton] = useState(false);
    const [isOpenCustomerCreation, setIsOpenCustomerCreation] = useState(false);
    const [newCustomerName, setNewCustomerName] = useState('');
    const [customerOptions, setCustomerOptions] = useState([]);
    const [error, setError] = useState('');
    const [alertType, setAlertType] = useState('danger');
    const [isLoading, setIsLoading] = useState(false);

    /*FORM*/
    const { handleSubmit, handleChange, values, touched, errors, dirty, isSubmitting, resetForm, setValues, setFieldValue } = useFormik({
        initialValues: {
            customer_id: null,
            full_name: newCustomerName || '',
            phone: '',
            date: new Date(),
            time: '',
            tags: [],
            email: '',
            language: 'tr',
            telephone_code: '237',
            level: '',
            vip: false,
            customer_note: '',
            reservation_note: '',
            location: '',
            number_of_people: '',
        },
        validationSchema: createReservationSchema(newCustomerName),
        onSubmit: async (values) => {
            values.date = formatDateToDatabaseFormat(values.date);
            setError('');
            setIsLoading(true);
            
            await addReservation(values)
                .then(result => {
                    if(result.success){
                        //setLevelData(result.data);
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
                });
                
        }
    })

    useEffect(() => {
        setFieldValue("full_name", newCustomerName || "");
    }, [newCustomerName, setFieldValue]);

    const handleComplete = () => {
        handleSubmit();
    };

    const tabChanged = ({ nextIndex }) => {
        setFinishButton(nextIndex === 3);
    };

    const handleNext = () => {
        formWizardRef.current?.nextTab();
    };

    const handlePrev = () => {
        formWizardRef.current?.prevTab();
    };

    const handleReset = () => {
        formWizardRef.current?.reset();
        resetForm();
        setIsOpenCustomerCreation(false);
        setNewCustomerName("");
    };

    const CreateReservationDestroy = () => {
        setIsOpenCustomerCreation(false);
        setNewCustomerName('');
        resetForm();
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
        <div>

            <Modal show={show} fullscreen={true} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Rezervasyon Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormWizard
                        onComplete={handleComplete}
                        ref={formWizardRef}
                        onTabChange={tabChanged}
                    >
                        <FormWizard.TabContent title="Müşteri Bilgileri" icon="ti-user">

                            {!isOpenCustomerCreation ? 
                            (
                                <>
                                    <Alert key="primary" variant="primary">
                                        <BsInfoCircleFill style={{fontSize: 30}} />
                                        <div style={{fontSize: 15, fontWeight: "bold"}}>
                                            Ad soyad, cep telefonu ve e-posta adresi ile arama yapabilirsiniz.
                                        </div>
                                    </Alert> 

                                    <ReactSelect 
                                        setIsOpenCustomerCreation={setIsOpenCustomerCreation}
                                        setNewCustomerName={setNewCustomerName}
                                        options={customerOptions}
                                        setOptions={setCustomerOptions}
                                        value={values.customer_id}
                                        setFieldValue={setFieldValue}
                                    />
                                    {touched.customer_id && errors.customer_id ? (
                                        <div className="validation-error-span">{errors.customer_id}</div>
                                    ) : null}
                                </>
                            ):(
                                <>
                                    <div className="col-md-12 mt-3">
                                        <div className="row">
                                            <div className="col-md-12 mb-3">
                                                <Button variant="secondary" onClick={() => CreateReservationDestroy()} style={{textTransform: "none"}}>Farklı bir misafir seçmek istiyorum.</Button>
                                            </div>
                                            <div className="col-md-12 text-start">
                                                <div className="row">

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
                                                        <LanguageSelect value={values.language} handleChange={handleChange}></LanguageSelect>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <CountryCodeSelect value={values.telephone_code} handleChange={handleChange}></CountryCodeSelect>
                                                        {touched.telephone_code && errors.telephone_code ? (
                                                            <Form.Text className="text-muted text-danger">
                                                                {errors.telephone_code}
                                                            </Form.Text>
                                                        ) : null}
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
                                                        <LevelSelect value={values.level} handleChange={handleChange}></LevelSelect>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                            <Form.Check type="checkbox" label="VIP Misafir" name="vip" checked={values.vip} onChange={handleChange} />
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

                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>     
                                </>
                            )}


                        </FormWizard.TabContent>
                        <FormWizard.TabContent title="Rezervasyon Bilgileri" icon="ti-settings">

                            <div className="col-md-12 mt-5 text-start">
                                <NumberOfPeople value={values.number_of_people} setFieldValue={setFieldValue} touched={touched.number_of_people} errors={errors.number_of_people}></NumberOfPeople>
                                <LocationRadio className="mb-3 mt-3" value={values.location} handleChange={handleChange} touched={touched.location} errors={errors.location}></LocationRadio>
                                <TagsSelection className="mb-3 mt-3" value={values.tags} setFieldValue={setFieldValue}></TagsSelection>
                                <Form.Group className="mb-3 mt-3" controlId="formBasicTagsNotes">
                                    <Form.Label>Not</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={3} 
                                        placeholder="Doğum günü, evlilik teklifi, özel misafir vb."
                                        name="reservation_note"
                                        value={values.reservation_note} 
                                        onChange={handleChange} 
                                    />
                                </Form.Group>
                            </div>
                            
                        </FormWizard.TabContent>
                        <FormWizard.TabContent title="Tarih/Saat" icon="ti-check">
                            <div className="col-12 mt-5">
                                <SelectDate value={values.date} setFieldValue={setFieldValue}></SelectDate>
                                {touched.date && errors.date ? (
                                    <Form.Text className="text-muted text-danger">
                                        {errors.date}
                                    </Form.Text>
                                ) : null}
                            </div>
                            
                            <div className="col-12 mt-5">
                                <TimePicker value={values.time} setFieldValue={setFieldValue}></TimePicker>
                                {touched.time && errors.time ? (
                                    <Form.Text className="text-muted text-danger">
                                        {errors.time}
                                    </Form.Text>
                                ) : null}
                            </div>
                        </FormWizard.TabContent>
                    </FormWizard>
                    {/* Harici butonlar */}
                    {/* <button className="sample-refrence-button" onClick={handelNext}>
                    nextTab
                    </button>
                    <button className="sample-refrence-button" onClick={handelPrev}>
                    prevTab
                    </button>
                    <button className="sample-refrence-button" onClick={handelReset}>
                    reset
                    </button>
                    <button className="sample-refrence-button" onClick={handelActiveAll}>
                    activeAll
                    </button>
                    <button className="sample-refrence-button" onClick={handelChangeTab}>
                    changeTab
                    </button> */}
                    {/* add style */}
                    <style>{`
                        @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
                        .react-form-wizard .wizard-btn {display:none; color:black;}
                    `}</style>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => {CreateReservationDestroy(); handleClose();}}>Kapat</Button>

                <Button variant="warning" onClick={handleReset}>Reset</Button>
                <Button variant="primary" onClick={handlePrev}>Geri</Button>
                
                {!finishButton ?
                 (<Button variant="primary" onClick={handleNext}>İleri</Button>) : 
                 (<Button variant="success" onClick={handleComplete}>Rezervasyonu Tamamla</Button>)
                }

                </Modal.Footer>
            </Modal>
            
            
        </div>
    );
}
  

export default CreateReservation;