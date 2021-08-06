import React from 'react'; 
import { Col, Row, InputGroup, FormControl, Button} from 'react-bootstrap';
import styled from 'styled-components'; 

const DayStyle = {
     'margin': '0 auto',
     'margin-bottom': '4px',
     'text-align': 'center',
};


const TimeControl = ({setTime, dayOfWeek, actualTime }) => {
    debugger
    const setDailyTime = (e) => {
        const { value } = e.target;
        setTime(actualTime => ({
            ...actualTime,
            [dayOfWeek]: value
            })
        )
    };

    return (
        <Row>          
        <Col>      
           <Row style={DayStyle}> {dayOfWeek} </Row>
           <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon1">Time</InputGroup.Text>
    <FormControl
    onChange={setDailyTime} value={actualTime.dayOfWeek}
      placeholder="Tempo no dia"
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
        </Col>
      
        </Row>
    )
}
export default TimeControl;