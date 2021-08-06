import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import VideoCard from "../components/VideoCard";
import WordBox from "../components/WordBox";
import { DAYS_OF_WEEK } from "../utils/conts/conts";
import TimeControl from "../components/TimeControl";
import styled from "styled-components";
import { handleVideosByDailyTime } from "../utils/conts/helper";
import Pagination from "@material-ui/lab/Pagination";
import {
  Col,
  Container,
  Row,
  FormControl,
  Button,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const DaysStyle = {
  "padding-top": "124px",
};

const ContainerVideos = {
  background: "cornsilk",
  border: "solid 1px",
};

const ContainerDays = {
  background: "lightgrey",
  border: "solid 1px",
};

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ContainerTimeInput = styled.div`
  //display: flex;
  justify-content: space-evenly;
  margin: 1rem;
`;
const IMG = styled.img`
  display: flex;
  flex-shrink: ;
`;
const WeekDay = styled.label`
  font-size: 20px;
`;

const IndexPage = () => {
  const [q, setQ] = useState("");
  const [videos, setVideos] = useState([]);
  const [dailyTime, setDailyTime] = useState({
    Monday: 900,
    Tuesday: 900,
    Wednesday: 900,
    Thursday: 900,
    Friday: 900,
    Saturday: 900,
    Sunday: 900,
  });
  const [currentWeekPage, setCurrentWeekPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentWeekPage(value);
  };

  const [mostUsedWords, setMostUsedWords] = useState([]);

  const searchVideos = async (query) => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    };

    const response = await fetch("http://localhost:8080/search", settings);
    const data = await response.json();
    setMostUsedWords(data.mostUsedWords);
    const videosByTime = handleVideosByDailyTime(data, DAYS_OF_WEEK, dailyTime);
    console.log(data);
    console.log(videosByTime);
    setVideos(videosByTime);
  };

  const cards = videos
    ?.slice(currentWeekPage - 1, currentWeekPage)
    .map((weekIndex, index) => {
      return Object.entries(weekIndex).map(([weekDay, videosInDay]) => (
        <Container>
          <Row>
            <WeekDay> {weekDay} </WeekDay>
            {videosInDay.map(({ id, title, thumbNail }) => (
              <VideoCard
                videoURl={id}
                videoTitle={title}
                thumb={thumbNail.medium.url}
              />
            ))}
          </Row>
        </Container>
      ));
    });

  const daysOfWeek = DAYS_OF_WEEK.map((day) => {
    return (
      <TimeControl
        setTime={setDailyTime}
        dayOfWeek={day}
        actualTime={dailyTime}
      />
    );
  });

  return (
    <>
      <Container>
        <Row>
          <Col xs={2}>
            <IMG src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/80px-YouTube_Logo_2017.svg.png" />
          </Col>
          <Col xs={10}>
            <SearchBar setQ={setQ} q={q} searchVideos={searchVideos} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col xs={3} style={ContainerDays}>
            <Row>
              <InputGroup className="mb-3">
                <Button variant="outline-secondary" id="button-addon1">
                  Pesquisar
                </Button>
                <FormControl
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Row>
            <ContainerTimeInput>{daysOfWeek}</ContainerTimeInput>
          </Col>
          <Col xs={9} style={ContainerVideos}>
            <MainContainer>
              <WordBox words={mostUsedWords} />
              {videos.length && cards}
              {console.log(currentWeekPage)}
              <Pagination
                count={videos.length}
                page={currentWeekPage}
                onChange={handlePageChange}
              />
            </MainContainer>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default IndexPage;
