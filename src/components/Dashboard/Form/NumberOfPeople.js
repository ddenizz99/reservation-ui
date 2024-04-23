import { ButtonGroup, ToggleButton, Tabs, Tab } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const NumberOfPeople = ({value, setFieldValue}) => {

  const people = [
    '1', '2', '3', '4', 
    '5', '6', '7', '8'
  ];


  const group = [];
    for (let i = 9; i <= 50; i++) {
        group.push(i.toString());
    }


  const style = {margin:10, padding:15};

  return (

    <div className='col-12 mt-5 mb-5'>
        <div className='row'>
            <div className='col-md-6 text-center'>
                <h4>Kişi Sayısı</h4>
                <ButtonGroup className='row'>
                    {people.map((time, idx) => (
                        <ToggleButton
                        key={time}
                        id={`people-${time}`}
                        type="radio"
                        variant="outline-primary"
                        name="number_of_people"
                        value={time}
                        checked={value === time}
                        onChange={(e) => setFieldValue('number_of_people', e.currentTarget.value, false)}
                        className={value === time ? 'col-2 active' : 'col-2'}
                        style={style}
                        >
                        {time}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </div>
            <div className='col-md-6 text-center' style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Form.Select aria-label="Default select example" name="number_of_people" value={value} onChange={(e) => setFieldValue('number_of_people', e.currentTarget.value, false)}>
                    <option>Grup</option>
                    {group.map((time, idx) => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </Form.Select>
            </div>
        </div>
    </div>
  );
};

export default NumberOfPeople;