import React from "react";
import { Col, Row, InputGroup, FormControl, Container } from "react-bootstrap";
import  "../stylesheets/main.scss"

const TimeControl = ({ setTime, dayOfWeek, actualTime }) => {
  const setDailyTime = (e) => {
    const { value } = e.target;
    setTime((actualTime) => ({
      ...actualTime,
      [dayOfWeek]: value,
    }));
  };

  return (
    <Container>      
    <Row>
      <Col>      
        <InputGroup className="mb-3">       
          <InputGroup.Text id="basic-addon1" className="timeCss" >{dayOfWeek}</InputGroup.Text>
          <FormControl
            onChange={setDailyTime}
            value={actualTime.dayOfWeek}
            placeholder="Tempo no dia"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </Col>
    </Row>
    </Container>
  );
};
export default TimeControl;
