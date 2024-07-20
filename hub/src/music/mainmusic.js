import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import Searchbox from "./searchbox/searchbox";
import Songcard from "./songcard";
import Listofsongs from "./Listofsongs";
import MusicPlayerComponent from "./MusicPlayerComponent";
import Playlist from "./playlist";
import Addplaylist from "./addplaylist";
export default function Mainmusic() {
  const [currmusic, setcurrmusic] = useState([]);
  const [allmusic, setallmusic] = useState([]);

  useEffect(() => {
    getall();
    changesong("660ecf27490e17c2f881f4fa");
  }, []);
  const changesong = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/music/${id}`);
      setcurrmusic(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getall = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/allget");
      setallmusic(response.data);
    } catch (error) {
      console.error("Error geting songs:", error);
    }
  };

  const responsive = {
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
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <div className="container">
        <div className="top-section">
          <div className="left-section-container">
            <div className="left-section">
              <h
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "30px",
                }}
              >
                All Songs
              </h>
              {allmusic.map((obj) => (
                <Listofsongs
                  src={`data:image/jpeg;base64, ${obj.imgpath}
                  `}
                  name={obj.songName}
                  artist={obj.artist}
                  onClick={() => changesong(obj._id)}
                />
              ))}
            </div>
          </div>
          <div className="right-section-container">
            <Searchbox setsong={changesong} />

            <div className="right-section">
              <div className="playingcontainer">
                <div className="playingimage-container">
                  <img
                    src={`data:image/jpeg;base64, ${currmusic.imgpath}
                     `}
                    alt="currentplaying"
                    className="image"
                  ></img>
                </div>
                <div className="playingdetails-container">
                  <p>Song</p>
                  <p style={{ fontSize: "55px" }}>{currmusic.songName}</p>
                  <p style={{ fontSize: "25px" }}>{currmusic.artist}</p>
                  <p>{currmusic.timesPlayed}M plays this week</p>
                </div>

                <Addplaylist
                  currsong={currmusic._id}
                  name={currmusic.songName}
                  singer={currmusic.artist}
                />
              </div>
              <h
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "45px",
                }}
              >
                TRENDING
              </h>
              <Carousel responsive={responsive}>
                {allmusic.map((obj) => (
                  <Songcard
                    styleard
                    img={`data:image/jpeg;base64, ${obj.imgpath}
                  `}
                    name={obj.songName}
                    singer={obj.artist}
                    setfunction={() => changesong(obj._id)}
                  />
                ))}
              </Carousel>
            </div>

            <h
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "25px",
              }}
            >
              Playlists
            </h>
            <Playlist setsong={changesong} />
          </div>
        </div>
        <div className="bottom-section">
          <MusicPlayerComponent songId={currmusic._id} />
        </div>
      </div>
    </div>
  );
}
