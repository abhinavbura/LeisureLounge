import { useEffect, useState } from "react";
import axios from "axios";
export default function Videoplayer({ isVisible, handleenent, id }) {
  console.log(id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [songUrl, setSongUrl] = useState(null);
  // let id = "660f74da5bd869d74964035a";
  useEffect(() => {
    const fetchSong = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:8080/api/getmovie/${id}`,
          {
            responseType: "blob",
          }
        );
        console.log(response.data);

        const audioUrl = URL.createObjectURL(response.data);
        setSongUrl(audioUrl);
      } catch (error) {
        console.error("Error streaming movie:", error);
        setError(
          error.message || "An error occurred while fetching the movie."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchSong();
    }
  }, [id]);
  const divstyle = { width: "100%", height: "100%" };
  return (
    <div className={`video-player ${isVisible ? "visible" : ""}`}>
      <button class="less-than-button" onClick={handleenent}>
        <span class="less-than-symbol">&lt;</span>
      </button>

      <div style={divstyle}>
        {isLoading && <p>Fetching Movie...</p>}
        {error && <p>Error: {error}</p>}
        {songUrl && (
          <iframe
            width="100%"
            height="100%"
            src={songUrl}
            title="Movie"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        )}
      </div>
    </div>
  );
}
