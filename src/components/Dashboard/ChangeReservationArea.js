import { useEffect, useState } from 'react';
import { Modal, Button, Spinner, Alert, Table, ButtonGroup, ToggleButton, Tabs, Tab } from 'react-bootstrap';
import { getById, getByRestaurantIdAreaAndTable, changeAreaAndTable } from '../../services/ReservationService';
import { FaInfoCircle } from "react-icons/fa";
import Swal from 'sweetalert2';

const ChangeReservationArea = ({ modalItemId, setModalItemId, title, show, setShow, refreshMainData }) => {
    const [reservationData, setReservationData] = useState([]);
    const [areaData, setAreaData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshData, setRefreshData] = useState(null);
    const [formValue, setFormValue] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        
        const fetchData = async () => {
            setIsLoading(true);
            setError(null); 
            await getByRestaurantIdAreaAndTable()
            .then(result => {
                if(result.success){
                    setAreaData(result.data);
                }else{                
                    setError(result.message);
                }
            }).catch(result => {              
                setError(String(result));
            });

            await getById(modalItemId)
            .then(result => {
                if(result.success){
                    setReservationData(result.data);
                    setFormValue(JSON.stringify({reservation_id:result.data.reservation_id, location_id:result.data.reservation_location_id, table_id:result.data.reservation_table_id}));
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
            setAreaData([]);
            setRefreshData(null);
            setFormValue(null);
            setIsSubmit(false);
        };
    }, [modalItemId, refreshData]);

    // Modalı kapama fonksiyonu
    const handleClose = () => {
        setShow(false);
    }

    const defaultActiveKeyFunction = () => {
        var locations = areaData;
        var tableId = reservationData.reservation_table_id ? reservationData.reservation_table_id.toString() : "";
        var locationId = reservationData.reservation_location_id ? reservationData.reservation_location_id.toString() : "";
    
        // Varsayılan olarak ilk lokasyonun tab_name'ini sakla
        let defaultLocationTabName = locations[0]?.location_tab_name;
    
        // Tüm lokasyonları döngüye al
        for (let location of locations) {
            // Her bir lokasyondaki masaları kontrol et (null ve boşluk kontrolü)
            if (location.tables && location.tables.length > 0) {
                for (let table of location.tables) {
                    if (table.table_id && table.table_id.toString() === tableId) {
                        
                        return location.location_tab_name;
                    }
                }
            }
        }
    
        // Eğer table_id bulunamazsa, verilen location_id ile eşleşen satırın location_tab_name'ini döndür
        for (let location of locations) {
            if (location.location_id.toString() === locationId) {

                return location.location_tab_name;
            }
        }
    
        // Eğer istenen table_id veya location_id bulunamazsa varsayılan location_tab_name'i döndür
  
        return defaultLocationTabName;
    }
    
    const handleSubmit = async () => {
        setIsSubmit(false);
        await changeAreaAndTable(formValue)
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

    const style = {margin:5, padding:10, maxWidth:80, fontSize:12};

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
                                <Tabs
                                    defaultActiveKey={defaultActiveKeyFunction}
                                    //defaultActiveKey="on-bahce"
                                    id="uncontrolled-tab-example"
                                    className="mb-3"
                                >
                                    {areaData.map((area, index) => (
                                        <Tab key={index} eventKey={area.location_tab_name} title={area.location_name}>
                                            <ButtonGroup className='row' style={{justifyContent:'center'}}>
                                                {area.tables.map((v, k) => (
                                                    v.table_id ? (<ToggleButton
                                                        key={v.table_id}
                                                        id={`table-${v.table_id}`}
                                                        type="radio"
                                                        variant="outline-primary"
                                                        name="table"
                                                        value={JSON.stringify({reservation_id:reservationData.reservation_id, location_id:area.location_id, table_id:v.table_id})}
                                                        //checked={v.table_id === reservationData.reservation_table_id}
                                                        checked={v.table_id === JSON.parse(formValue).table_id}
                                                        onChange={(e) => {setFormValue(e.currentTarget.value); setIsSubmit(true);}}
                                                        className={v.table_id === JSON.parse(formValue).table_id ? 'col-3 active' : 'col-3'}
                                                        style={style}
                                                    >
                                                        <b>{v.table_name}</b>
                                                        <br/>
                                                        {v.table_capacity + " Misafir"}
                                                    </ToggleButton>) : (<span key={k} className='p-4'><FaInfoCircle className='text-danger'/> <b>Bu alanda masa bulunmamaktadır.</b></span>)
                                                    
                                                ))}
                                            </ButtonGroup>
                                        </Tab>
                                    ))}
                                    
                                </Tabs>
                                
                            </div>
                        </div>
                        {/* add style */}
                        <style>{`
                            /*.react-datepicker__month-container {width:100%;}
                            .react-datepicker {width:100%; height:100%;}*/
                        `}</style>
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

export default ChangeReservationArea;