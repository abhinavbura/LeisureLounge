import { useState } from "react";
import axios from "axios";

import "../App.css";
export default function Searchbox({ setsong }) {
  const [results, setresults] = useState([]);
  const [search, setsearch] = useState("");
  const fetchdata = async (value) => {
    try {
      const response = await axios.get("http://localhost:8080/api/allget");
      const op = response.data.filter((song) => {
        return (
          value &&
          song &&
          song.songName &&
          song.songName.toLowerCase().includes(value)
        );
      });
      setresults(op);
    } catch (error) {
      console.log(error);
    }
  };
  const handlechange = (value) => {
    setsearch(value);
    fetchdata(value);
  };
  let box;
  if (results.length > 0) {
    box = (
      <div class="search_results">
        <h3>Search Results</h3>
        <ul>
          {results.map((ele) => (
            <li onClick={(id) => setsong(ele._id)}>{ele.songName}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    box = <div></div>;
  }
  return (
    <div style={{ maxHeight: "267px" }}>
      <div class="search_container">
        <div class="search_box">
          <form>
            <input
              type="text"
              class="search_input"
              placeholder="Search..."
              value={search}
              onChange={(e) => handlechange(e.target.value)}
            />
          </form>
        </div>
        {box}
      </div>
    </div>
  );
}
