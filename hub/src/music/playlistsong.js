export default function Playlistsong({ name, singer, setsong, id }) {
  return (
    <div>
      <li
        className="playlist-song-item"
        onClick={(e) => setsong(id)}
        style={{ cursor: "pointer" }}
      >
        {name} <br /> {singer}
      </li>
    </div>
  );
}
