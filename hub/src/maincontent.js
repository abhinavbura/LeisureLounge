import Mainmusic from "./music/mainmusic";
import Mainmovies from "./movies/mainmovies.js";
import Games from "./games/maingames.js";
export default function MainContent({ selectedCategory }) {
  switch (selectedCategory) {
    case "movies":
      return <Mainmovies />;
    case "songs":
      return <Mainmusic />;
    case "games":
      return <Games />;
    default:
      return <p>Invalid category</p>;
  }
}
