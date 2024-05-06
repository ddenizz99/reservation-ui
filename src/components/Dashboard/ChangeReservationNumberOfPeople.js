import { useEffect, useState } from 'react';
import { Modal, Button, Spinner, Alert, Table, ButtonGroup, ToggleButton, Tabs, Tab } from 'react-bootstrap';
import { getById, changeNumberOfPeople } from '../../services/ReservationService';
import { FaInfoCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import NumberOfPeople from './Form/NumberOfPeople';

const ChangeReservationNumberOfPeople = ({ modalItemId, setModalItemId, title, show, setShow, refreshMainData }) => {
    const [reservationData, setReservationData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshData, setRefreshData] = useState(null);
    const [formValue, setFormValue] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        
        const fetchData = async () => {
            setIsLoading(true);
            setError(null); 
            await getById(modalItemId)
            .then(result => {
                if(result.success){
                    setReservationData(result.data);
                    setFormValue(result.data.number_of_people);
                }else{                   
                    setError(result.message);
                }
            }).catch(result => {             
                setError(String(result));
            });
            setIsLoading(false);
        };

        fetchData();

        return () => {
            setReservationData([]);
            setRefreshData(null);
            setFormValue(null);
            setIsSubmit(false);
        };
    }, [modalItemId, refreshData]);

    // Modalı kapama fonksiyonu
    const handleClose = () => {
        setShow(false);
    }
    
    const handleSubmit = async () => {
        setIsSubmit(false);
        var data = JSON.stringify({reservation_id: reservationData.reservation_id, number_of_people: formValue});

        await changeNumberOfPeople(data)
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
                    setIsSubmit(true);
                }
            }).catch(result => {
                setIsLoading(false);
                setError(String(result));
            });
    }

    const setFieldValue = (name, value, status) => {
        setFormValue(value);
        setIsSubmit(true);
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
                    <>
                        <div className='row'>
                            <div className='col-12'>
                                <NumberOfPeople value={formValue} setFieldValue={setFieldValue} touched={null} errors={null}></NumberOfPeople>                                
                            </div>
                        </div>
                    </>
                )
            }
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Kapat
            </Button>
            <Button variant="success" disabled={!isSubmit} onClick={handleSubmit}>
            Güncelle
            </Button>
        </Modal.Footer>
        </Modal>
    );
}

export default ChangeReservationNumberOfPeople;