import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import VideoCard from "../components/VideoCard";
import { DAYS_OF_WEEK } from "../utils/conts/conts";
import TimeControl from "../components/TimeControl";
import { handleVideosByDailyTime } from "../utils/conts/helper";
import Pagination from "@material-ui/lab/Pagination";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "../images/YouTube_Logo_2017.png";
import "../stylesheets/main.scss";


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
    console.log(data);
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
            <div> {weekDay} </div>
            {videosInDay.map(({ id, snippet: { title, thumbnails }, mostFrequentWords }) => (
              <VideoCard
                videoURl={id}
                videoTitle={title}
                thumb={thumbnails.medium.url}
                words={mostFrequentWords}
              />
            ))}
            <hr></hr>           
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
      <Container className="headerCss">
        <Row>
          <Col xs={10}>
            <img className="imgCss" src={img}/>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col xs={3} className="containerDays">
            <SearchBar setQ={setQ} q={q} searchVideos={searchVideos} />
            <hr></hr>
            <Row>
              <label>Dias da Semana</label>
            </Row>
            <div className="containerTimeInput">{daysOfWeek}</div>
          </Col>
          <Col xs={9} className="containerVideos">
            <div className="mainContainer">
              {videos.length && cards}
              <Pagination
                count={videos.length}
                page={currentWeekPage}
                onChange={handlePageChange}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default IndexPage;
