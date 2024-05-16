import { Form, Spinner } from 'react-bootstrap';
import { getByRestaurantId } from "../../../services/CompanyService";
import { useState, useEffect  } from 'react';

const CompanySelect = ({value, handleChange}) => {

    const [companyData, setCompanyData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanyData = async () => {
            setIsLoading(true);
            setError(null); 
            await getByRestaurantId()
            .then(result => {
                if(result.success){
                    setCompanyData(result.data);
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

        fetchCompanyData();
    }, []);

    return (
        <Form.Group className="mb-3" controlId="formCompanies">
            <Form.Label>Şirket</Form.Label>
            <Form.Select 
                aria-label="Default select example" 
                name="company_id" 
                value={value} 
                onChange={handleChange} 
                disabled={isLoading || error}
                isInvalid={!!error}
            >
                <option value="">Şirket seçiniz...</option> 
                {companyData.map((value, index) => (
                    <option key={index} value={value.id}>{value.company_name}</option>
                ))}
            </Form.Select>
            {isLoading && <Spinner animation="border" />}
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Group>
      );
};

export default CompanySelect;