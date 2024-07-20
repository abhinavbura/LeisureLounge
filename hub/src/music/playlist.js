import axios from "axios";
import { useEffect, useState } from "react";
// import React, { useState } from "react";
import Playlistsong from "./playlistsong";
export default function Playlist({ setsong }) {
  const [alldata, setalldata] = useState([]);
  const [playlists, setplaylists] = useState([]);
  const [using, setusing] = useState([]);
  useEffect(() => {
    async function getdata() {
      const data = await getall();
      setalldata(data);
      let temp = [];
      data.map((item) => temp.push(item.playlistName));
      setplaylists(temp);
      // setusing(data[0].details);
    }
    getdata();
  }, []);

  const getall = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/plalylists/getall"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error geting songs:", error);
    }
  };
  const changecontent = (data) => {
    setusing(alldata.filter((obj) => obj.playlistName === data)[0].details);
    console.log(using);
  };

  return (
    <div className="playlist-container">
      <div className="playlist-playlists">
        <h2>Playlists</h2>
        <ul id="playlist-list">
          {playlists.map((data) => (
            <li
              className="playlist-item"
              key={data}
              onClick={() => changecontent(data)}
            >
              {data}
            </li>
          ))}
        </ul>
      </div>
      <div className="playlist-songs">
        <h2>Songs</h2>
        <ul id="song-list">
          {using.map((song) => (
            <Playlistsong
              name={song.name}
              singer={song.singer}
              setsong={setsong}
              id={song.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
