import Mainmusic from "./music/mainmusic";
import Mainmovies from "./movies/mainmovies.js";
import Games from "./games/maingames.js";
import "./index.css";
import { useState } from "react";
import Navbar from "./navbar.js";
import MainContent from "./maincontent.js";
import Lframe from "./logins/Lframe.js";
export default function Mainfile() {
  const [selectedCategory, setSelectedCategory] = useState("movies");
  const handleNavigationClick = (event) => {
    const clickedCategory = event.target.id.replace("-link", "");
    setSelectedCategory(clickedCategory);
  };
  const [status, setstatus] = useState("loggoff");
  console.log(status);
  let compp;
  if (status === "Login successful" || status === "User added successfully") {
    compp = <MainContent selectedCategory={selectedCategory} />;
  } else {
    compp = <Lframe setmessage={setstatus} />;
  }
  return (
    <div>
      <Navbar
        onNavigationClick={handleNavigationClick}
        setmessage={setstatus}
      />
      {compp}
    </div>
  );
}
