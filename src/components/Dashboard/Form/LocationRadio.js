import { Form, Spinner } from 'react-bootstrap';
import { getByRestaurantId } from "../../../services/LocationService";
import { useState, useEffect  } from 'react';
 
const LocationRadio = ({value, handleChange, touched, errors}) => {

  const [locationData, setLocationData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
        setIsLoading(true);
        setError(null); // Hataları sıfırla yeni istek başlamadan önce
        await getByRestaurantId()
        .then(result => {
            if(result.success){
                setLocationData(result.data);
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

    fetchLocationData();
}, []);

    return (
        <Form>
            <div className="mb-3">
              {locationData.map((v, k) => (
                    <Form.Check
                      inline
                      label={v.name}
                      name="location"
                      value={v.id}
                      checked={value === v.id}
                      onChange={handleChange}
                      type="radio"
                      id={`inline-radio-${k}`}
                      isInvalid={!!error}
                    />
              ))}
            </div>
            {isLoading && <Spinner animation="border" />}
            <Form.Control.Feedback type="invalid" style={{ display: error ? 'block' : 'none' }}>
                {error}
            </Form.Control.Feedback>
            {touched && errors ? (
                <Form.Text className="text-muted text-danger">
                    {errors}
                </Form.Text>
            ) : null}
        </Form>
      );
};

export default LocationRadio;