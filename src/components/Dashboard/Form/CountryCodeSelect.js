import { Form, Spinner } from 'react-bootstrap';
import { getAll } from "../../../services/CountryCodeService";
import { useState, useEffect  } from 'react';

const CountryCodeSelect = ({value, handleChange}) => {

    const [countryCodeData, setCountryCodeData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountryCodeData = async () => {
            setIsLoading(true);
            setError(null); 
            await getAll()
            .then(result => {
                if(result.success){
                    setCountryCodeData(result.data);
                    setIsLoading(false);
                }else{
                    setIsLoading(false);
                    setError(result.message);
                }
            }).catch(result => {
                setIsLoading(false);
                setError(String(result));
            });
            /* try {
                 await getAll()
                .then(result => {
                    if(result.data.success){
                        setCountryCodeData(result.data.data);
                        setIsLoading(false);
                    }else{
                        setIsLoading(false);
                        setError(result.data.message);
                    }
                })
                .catch(result => {
                    setIsLoading(false);
                    setError('.');
                    if (result.response) {
                        if (result.response.status === 401) {
                                const resultData = result.response.data;
                                if (!resultData.success) {
                                    toast.error(resultData.message);
                                }
                        } else {
                            console.error('Error Message:', result.response.data.error);
                        }
                    }
                })
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            } */
        };

        fetchCountryCodeData();
    }, []);

    return (
        <Form.Group className="mb-3" controlId="formBasicTelephoneCodes">
            <Form.Label>Telefon Kodu</Form.Label>
            <Form.Select 
                aria-label="Default select example" 
                name="telephone_code" 
                value={value} 
                onChange={handleChange} 
                disabled={isLoading || error}
                isInvalid={!!error}
            >
                {/* <option value="">Seviye seçiniz...</option> */}
                {countryCodeData.map((value) => (
                    <option key={value.id} value={value.id}>{value.name}</option>
                ))}
            </Form.Select>
            {isLoading && <Spinner animation="border" />}
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Group>
      );
};

export default CountryCodeSelect;