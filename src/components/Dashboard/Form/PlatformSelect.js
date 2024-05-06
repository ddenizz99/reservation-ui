import Form from 'react-bootstrap/Form';

const PlatformSelect = ({value, setFieldValue, touched, errors}) => {

  const platforms = [
    "Instagram", 
    "Web Sitesi", 
    "Telefon", 
    "Google", 
    "Hediye", 
    "E-Posta", 
    "Walk-In", 
    "Bekleme Listesi",
    "CondoLife",
    "Müdavim.Net",
    "Quandoo",
    "Rezervem",
    "Rezervin",
    "Reztoran",
    "TheFork",
    "TripAdvisor",
    "Zomato"
  ];

  return (
    <>
        <Form.Group className="mb-3 mt-3" controlId="formBasicSelectss">
            <Form.Label className='fw-bold'>Sağlayıcı Platform</Form.Label>
            <Form.Select name="platform" className="form-select" aria-label="Platform seçin." value={value || ""} onChange={(e) => setFieldValue("platform" , e.target.value, false)}>
                <option value="">Hangi platformdan geldi?</option>
                {platforms.map((val, key) => (
                    <option key={key} value={val}>{val}</option>
                ))}
            </Form.Select>
            {touched && errors ? (
                <div className="validation-error-span">{errors}</div>
            ) : null}
        </Form.Group>
    </>
  );
};

export default PlatformSelect;