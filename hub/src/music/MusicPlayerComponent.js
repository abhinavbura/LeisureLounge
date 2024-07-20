import React, { useState, useEffect } from "react";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";

import "react-h5-audio-player/lib/styles.css";

function MusicPlayerComponent({ songId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [songUrl, setSongUrl] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:8080/api/getsong/${songId}`,
          {
            responseType: "blob",
          }
        );

        const audioUrl = URL.createObjectURL(response.data);
        console.log("audioUrl:", audioUrl);
        setSongUrl(audioUrl);
      } catch (error) {
        console.error("Error streaming song:", error);
        setError(error.message || "An error occurred while fetching the song.");
      } finally {
        setIsLoading(false);
      }
    };

    if (songId) {
      fetchSong();
    }
  }, [songId]);

  return (
    <div>
      {isLoading && <p>Loading song...</p>}
      {error && <p>Error: {error}</p>}
      {songUrl && <AudioPlayer src={songUrl} />}
    </div>
  );
}

export default MusicPlayerComponent;
