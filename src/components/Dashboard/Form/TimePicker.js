//import { useState } from 'react';
import { ButtonGroup, ToggleButton, Tabs, Tab } from 'react-bootstrap';

const TimePicker = ({value, setFieldValue}) => {

  //const [selectedTime, setSelectedTime] = useState(''); // varsayılan seçili saat

  const noonTimes = [
    '12:00', '12:30', '13:00', '13:30', 
    '14:00', '14:30', '15:00', '15:30', 
    '16:00', '16:30', '17:00'
  ];

  const eveningTimes = [
    '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', 
    '22:00', '22:30', '23:00'
  ];

  const style = {margin:10, padding:15};

  return (

    <Tabs
      defaultActiveKey="noon"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="noon" title="Öğle Yemeği">
        <ButtonGroup className='row'>
          {noonTimes.map((time, idx) => (
            <ToggleButton
              key={time}
              id={`time-${time}`}
              type="radio"
              variant="outline-primary"
              name="time"
              value={time}
              checked={value === time}
              onChange={(e) => setFieldValue('time', e.currentTarget.value, false)}
              className={value === time ? 'col-3 active' : 'col-3'}
              style={style}
            >
              {time}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Tab>
      <Tab eventKey="evening" title="Akşam Yemeği">
        <ButtonGroup className='row'>
          {eveningTimes.map((time, idx) => (
            <ToggleButton
              key={time}
              id={`time-${time}`}
              type="radio"
              variant="outline-primary"
              name="time"
              value={time}
              checked={value === time}
              onChange={(e) => setFieldValue('time', e.currentTarget.value, false)}
              className={value === time ? 'col-3 active' : 'col-3'}
              style={style}
            >
              {time}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Tab>
    </Tabs>
  );
};

export default TimePicker;