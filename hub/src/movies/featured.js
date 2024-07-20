export default function Featured({ img, description, name, handlechange }) {
  const hstyle = {
    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, sans-serif',
    fontSize: "80px",
    textTransform: "uppercase",
  };
  const backgroundStyle = {
    background: `linear-gradient(to bottom, rgba(0,0,0,0), #151515), url("data:image/jpeg;base64, ${img}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <div>
      <div className="featured-content" style={backgroundStyle}>
        <h1 style={hstyle}>{name}</h1>
        <p className="featured-desc">{description}</p>
        <button className="featured-button" onClick={handlechange}>
          WATCH
        </button>
      </div>
    </div>
  );
}
