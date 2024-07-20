export default function Listofsongs({ src, name, artist, onClick }) {
  return (
    <div>
      <div class="song-item" onClick={onClick}>
        <img src={src} alt="Song 1"></img>
        <div class="song-details">
          <div class="song-title">{name}</div>
          <div class="song-artist">{artist}</div>
        </div>
      </div>
    </div>
  );
}
