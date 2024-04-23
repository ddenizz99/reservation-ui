import { Form, Spinner } from 'react-bootstrap';
import { getAll } from "../../../services/LevelService";
import { useState, useEffect  } from 'react';

const LevelSelect = ({value, handleChange}) => {

    const [levelData, setLevelData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLevelData = async () => {
            setIsLoading(true);
            setError(null); // Hataları sıfırla yeni istek başlamadan önce
            await getAll()
            .then(result => {
                if(result.success){
                    setLevelData(result.data);
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

        fetchLevelData();
    }, []);

    return (
        <Form.Group className="mb-3" controlId="formBasicTelephoneCodes">
            <Form.Label>Seviye</Form.Label>
            <Form.Select 
                aria-label="Default select example" 
                name="level" 
                value={value} 
                onChange={handleChange} 
                disabled={isLoading || error}
                isInvalid={!!error}
            >
                <option value="">Seviye seçiniz...</option>
                {levelData.map((value) => (
                    <option key={value.id} value={value.id}>{value.title}</option>
                ))}
            </Form.Select>
            {isLoading && <Spinner animation="border" />}
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Group>
      );
};

export default LevelSelect;