import { useState } from "react";
import API from "../services/api";

function CameraFeed() {
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [processedVideo, setProcessedVideo] = useState("");

  const uploadVideo = async () => {
    if (!video) {
      alert("Please select a video.");
      return;
    }

    const formData = new FormData();
    formData.append("file", video);

    try {
      setLoading(true);

      const response = await API.post("/upload/video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);

      setProcessedVideo(
        "http://127.0.0.1:8000/" +
          response.data.detection.output_video.replace("app/", "")
      );
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#1f2937",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "25px",
      }}
    >
      <h2>🎥 SafeDrive Video Analysis</h2>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => {
          if (e.target.files) {
            setVideo(e.target.files[0]);
          }
        }}
      />

      <br />
      <br />

      <button
        onClick={uploadVideo}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Upload Video
      </button>

      <br />
      <br />

      {loading && <h3>Processing Video...</h3>}

      {processedVideo && (
        <video
          width="700"
          controls
          src={processedVideo}
        />
      )}
    </div>
  );
}

export default CameraFeed;