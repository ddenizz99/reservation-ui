import { Form, Spinner } from 'react-bootstrap';
import { getAll } from "../../../services/LanguageService";
import { useState, useEffect  } from 'react';

const LanguageSelect = ({value, handleChange, name}) => {

    const [languageData, setLanguageData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLanguageData = async () => {
            setIsLoading(true);
            setError(null); 
            await getAll()
            .then(result => {
                if(result.success){
                    setLanguageData(result.data);
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

        fetchLanguageData();
    }, []);

    return (
        <Form.Group className="mb-3" controlId="formBasicLanguage">
            <Form.Label>Dil</Form.Label>
            <Form.Select 
                aria-label="Default select example" 
                name={name ?? "language"} 
                value={value} 
                onChange={handleChange} 
                disabled={isLoading || error}
                isInvalid={!!error}
            >
                {/* <option value="">Seviye seçiniz...</option> */}
                {languageData.map((value) => (
                    <option key={value.id} value={value.code}>{value.name}</option>
                ))}
            </Form.Select>
            {isLoading && <Spinner animation="border" />}
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Group>
      );
};

export default LanguageSelect;