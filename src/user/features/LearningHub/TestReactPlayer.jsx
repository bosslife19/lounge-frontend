import React from "react";
import ReactPlayer from "react-player";

export default function VideoTest() {
  return (
    <div style={{ width: "500px", height: "300px", margin: "50px auto" }}>
      <ReactPlayer
        // url="https://www.w3schools.com/html/mov_bbb.mp4"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        controls
        playing={false} // don't force autoplay
        width="100%"
        height="100%"
      />
      <video
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        controls
        width="500"
        height="300"
      />
    </div>
  );
}
