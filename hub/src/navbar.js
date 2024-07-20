export default function Navbar({ onNavigationClick, setmessage }) {
  const decor = { color: "white", textDecoration: "none" };
  const decorp = {
    color: "white",
    textDecoration: "none",
    marginLeft: "100vh",
  };
  return (
    <div class="navbar">
      <div class="navbar-container">
        <div class="logo-container">
          <h1 class="logo">EntertainmentHub</h1>
        </div>
        <div class="menu-container">
          <ul class="menu-list">
            <li class="menu-list-item">
              <a
                style={decor}
                href="#"
                id="movies-link"
                onClick={onNavigationClick}
              >
                Movies
              </a>
            </li>
            <li class="menu-list-item">
              <a
                style={decor}
                href="#"
                id="songs-link"
                onClick={onNavigationClick}
              >
                Songs
              </a>{" "}
            </li>
            <li class="menu-list-item">
              <a
                style={decor}
                href="#"
                id="games-link"
                onClick={onNavigationClick}
              >
                Games
              </a>
            </li>
            <li class="menu-list-item">
              <a
                style={decorp}
                href="#"
                id="logout"
                onClick={() => setmessage("loggoff")}
              >
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
