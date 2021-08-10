import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { YOUTUBE_URL } from "../utils/conts/conts";


const VideoCard = ({ videoURl, videoTitle, thumb, words }) => {
  debugger;
  return (
    <>
      <Container>
        <Row>
          <a href={`${YOUTUBE_URL}${videoURl}`} target="_blank"> {" "} <img src={thumb}></img>{" "} </a>
          <h2 className="videoTitle">{videoTitle}</h2> 
        </Row>
      </Container>
      <Container>
        <Row>
          {words.map((word) => (
            <Col>{word}</Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default VideoCard;
