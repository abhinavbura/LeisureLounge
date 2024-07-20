import "./moviesstyles.css";
import Moviecard from "./moviecard";
import { useEffect, useState } from "react";
import Searchbox from "./searchbox";
import axios from "axios";
import Featured from "./featured";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Videoplayer from "./videoplayer";
export default function Mainmovies() {
  const [currmovie, setcurrmovie] = useState("");
  const [allmovies, setallmovies] = useState([]);
  const [topthree, settopthree] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const getall = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/getmovies");
      console.log(response.data);
      setallmovies(response.data);
      settopthree(response.data.slice(0, 3));
    } catch (error) {
      console.error("Error geting songs:", error);
    }
  };

  useEffect(() => {
    getall();
    setcurrmovie("660f74da5bd869d74964035a");
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const downresponse = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const closePlayer = () => {
    setIsVisible(false);
  };

  const openPlayer = (id) => {
    setcurrmovie(id);
    setIsVisible(true);
  };
  let button;
  if (isVisible) {
    button = (
      <Videoplayer
        isVisible={isVisible}
        handleenent={closePlayer}
        id={currmovie}
      />
    );
  } else {
    button = <div></div>;
  }

  return (
    <div>
      <div className="container">
        <Searchbox setmovie={openPlayer} />
        <div className="content-container">
          <Carousel responsive={responsive}>
            {topthree.map((item) => (
              <Featured
                img={item.imgpath}
                name={item.moviename}
                description={item.description}
                handlechange={() => openPlayer(item._id)}
              />
            ))}
          </Carousel>
          <div className="movie-list-container">
            <h1
              className="movie-list-title"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "30px",
              }}
            >
              TRENDING
            </h1>
            <div className="movie-list-wrapper">
              <div className="movie-list">
                {allmovies.map((movie) => (
                  <Moviecard
                    img={`data:image/jpeg;base64, ${movie.imgpath}
                    `}
                    name={movie.moviename}
                    description={movie.description}
                    handlechange={() => openPlayer(movie._id)}
                  />
                ))}
              </div>
              <i className="fas fa-chevron-right arrow"></i>
            </div>
          </div>
          <div className="movie-list-container">
            <h1
              className="movie-list-title"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "30px",
              }}
            >
              NEW RELEASES
            </h1>
            <div className="movie-list-wrapper">
              {/* <div className="movie-list"> */}
              <Carousel responsive={downresponse}>
                {allmovies.reverse().map((movie) => (
                  <Moviecard
                    img={`data:image/jpeg;base64, ${movie.imgpath}
                    `}
                    name={movie.moviename}
                    description={movie.description}
                    handlechange={() => openPlayer(movie._id)}
                  />
                ))}
              </Carousel>
              {/* </div> */}
              {button}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
