export default function Moviecard({ img, name, handlechange }) {
  return (
    <div>
      <div className="movie-list-item">
        <img className="movie-list-item-img" src={img} alt=""></img>
        <span className="movie-list-item-title">{name}</span>
        <button onClick={handlechange} className="movie-list-item-button">
          Watch
        </button>
      </div>
    </div>
  );
}
