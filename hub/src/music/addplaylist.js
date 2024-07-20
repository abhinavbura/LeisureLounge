/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { useEffect, useState } from "react";
export default function Addplaylist({ currsong, singer, name }) {
  const [playlists, setplaylists] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const getall = () => {
    axios.get("http://localhost:8080/api/playlists/onlylists").then((res) => {
      setplaylists(res.data);
    });
  };
  useEffect(() => {
    getall();
    console.log(playlists);
  }, []);
  const addsong = () => {
    if (!playlists.includes(inputValue) && inputValue.length >= 1) {
      axios
        .post("http://localhost:8080/api/playlist/addsong", {
          name: inputValue,
          details: {
            name: name,
            id: currsong,
            singer: singer,
          },
        })
        .then(() => {
          alert("added song");

          playlists.push(inputValue);
          setInputValue("");
        });
    } else {
      alert("playlist already exsists");
    }
  };

  const addto = (data) => {
    axios
      .put("http://localhost:8080/api/playlist/onlysong", {
        name: data,
        details: {
          name: name,
          id: currsong,
          singer: singer,
        },
      })
      .then(() => {
        alert("added song");
        setInputValue("");
      });
  };
  return (
    <div>
      <div class="dropdown">
        <button class="dropdown-btn">Add to Playlist</button>
        <div class="dropdown-content">
          <input type="text" value={inputValue} onChange={handleInputChange} />
          <button type="button" onClick={addsong}></button>
          {playlists.map((data) => (
            <a href="#" key={data} onClick={() => addto(data)}>
              {data}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
