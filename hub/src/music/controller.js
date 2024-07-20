import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
export default function Controller() {
  const filepath = "/songgg.mp3";
  return (
    <div>
      <AudioPlayer autoPlay src={filepath} volume={0.5}></AudioPlayer>
    </div>
  );
}
