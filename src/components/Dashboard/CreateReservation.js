import React from "react";
import { useEffect, useState } from "react";
import { Modal, Button, Alert, Form } from 'react-bootstrap';
import FormWizard from "react-form-wizard-component";
import { BsInfoCircleFill } from "react-icons/bs";
import "react-form-wizard-component/dist/style.css";
import ReactSelect from "./Form/ReactSelect";
import { useFormik, ErrorMessage  } from "formik";
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

const CreateReservation = ({ show, handleClose }) => {

    const formWizardRef = React.createRef();

    const [finishButton, setFinishButton] = useState(false);
    const [isOpenCustomerCreation, setIsOpenCustomerCreation] = useState(false);
    const [newCustomerName, setNewCustomerName] = useState('');

    const [error, setError] = useState('');
    const [alertType, setAlertType] = useState('danger');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // newCustomerName props'unda bir değişiklik olduğunda, formik state'ini güncelle
        setValues(values => ({
            ...values,
            full_name: newCustomerName || ''
        }));
    }, [newCustomerName]);

    const handleComplete = () => {
        //alert("Form completed!");
        handleSubmit();
        
        // Handle form completion logic here
    };
    
    const tabChanged = ({ prevIndex, nextIndex }) => {
        if (nextIndex === 3) {
            setFinishButton(true);
        }else{
            setFinishButton(false);
        }
    };

    const handelNext = () => {
        formWizardRef.current?.nextTab();
    };
    const handelPrev = () => {
        formWizardRef.current?.prevTab();
    };
    const handelReset = () => {
        formWizardRef.current?.reset();
        CreateReservationDestroy();
    };
    /* const handelActiveAll = () => {
        console.log("activeAll");
        formWizardRef.current?.activeAll();
    };
    const handelChangeTab = () => {
        console.log("changeTab");
        formWizardRef.current?.goToTab(2);
    }; */

    const CreateReservationDestroy = () => {
        setIsOpenCustomerCreation(false);
        setNewCustomerName('');
        resetForm();
    };

    function formatDateToDatabaseFormat(date, time = 'day') {
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
            customer_id: null,
            full_name: newCustomerName || '',
            phone: '',
            date: new Date(),
            time: '',
            tags: [],
            email: '',
            language: '1',
            telephone_code: '237',
            level: '',
            vip: false,
            customer_note: '',
            reservation_note: '',
            location: '',
            number_of_people: '',
        },
        //validationSchema: LoginSchema,
        onSubmit: async (values, { resetForm }) => {
            values.date = formatDateToDatabaseFormat(values.date);
            setError('');
            setIsLoading(true);
            //console.log(JSON.stringify(values, null, 2));

            //resetForm();
            //CreateReservationDestroy();
        
            //apiye git
        
            /* if (result.success) {
                setAlertType('success');
                alert('yes');
            }else{
                setIsLoading(false);
                setError(result.messages);
            } */
            //handleClose();
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
                                    />
                                </>
                            ):(
                                <>
                                    <div className="col-md-12 mt-3">
                                        <div className="row">
                                            <div className="col-md-12 mb-3">
                                                <Button variant="secondary" onClick={() => setIsOpenCustomerCreation(false)} style={{textTransform: "none"}}>Farklı bir misafir seçmek istiyorum.</Button>
                                            </div>
                                            <div className="col-md-12 text-start">
                                                <div className="row">

                                                    <div className="col-md-6">
                                                        <Form.Group className="mb-3" controlId="formBasicFullName">
                                                            <Form.Label>Ad Soyad</Form.Label>
                                                            <Form.Control type="text" name="full_name" placeholder="Müşteri adı" value={values.full_name} onChange={handleChange} />
                                                            {/* <Form.Text className="text-muted">
                                                                We'll never share your email with anyone else.
                                                            </Form.Text> */}
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <LanguageSelect value={values.language} handleChange={handleChange}></LanguageSelect>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <CountryCodeSelect value={values.telephone_code} handleChange={handleChange}></CountryCodeSelect>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Form.Group className="mb-3" controlId="formBasicTelephone">
                                                            <Form.Label>Telefon</Form.Label>
                                                            <Form.Control type="text" name="phone" placeholder="5xxxxxxx" value={values.phone} onChange={handleChange} />
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>E-posta</Form.Label>
                                                            <Form.Control type="email" name="email" placeholder="E-posta adresi" value={values.email} onChange={handleChange} />
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
                                <NumberOfPeople value={values.number_of_people} setFieldValue={setFieldValue}></NumberOfPeople>
                                <LocationRadio className="mb-3 mt-3" value={values.location} handleChange={handleChange}></LocationRadio>
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
                            </div>
                            
                            <div className="col-12 mt-5">
                                <TimePicker value={values.time} setFieldValue={setFieldValue}></TimePicker>
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

                <Button variant="warning" onClick={handelReset}>Reset</Button>
                <Button variant="primary" onClick={handelPrev}>Geri</Button>
                
                {!finishButton ?
                 (<Button variant="primary" onClick={handelNext}>İleri</Button>) : 
                 (<Button variant="success" onClick={handleComplete}>Rezervasyonu Tamamla</Button>)
                }

                </Modal.Footer>
            </Modal>
            
            
        </div>
    );
}
  

export default CreateReservation;