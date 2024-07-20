import "./App.css";
export default function Songcard({ setfunction, name, singer, img }) {
  return (
    <div>
      <div class="card" onClick={setfunction}>
        <img src={img} alt="Song"></img>
        <div class="card-text">
          <div class="song-title">{name}</div>
          <div class="singer">{singer}</div>
        </div>
      </div>
    </div>
  );
}
