import { useState } from "react";

export default function Videos() {
  const [videoFile, setVideoFile] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setVideoFile(url);
  };

  return (
    <div className="videoPage">

      <div className="uploadBox">
        <input
          type="file"
          accept="video/*"
          onChange={handleUpload}
        />
      </div>

      {videoFile ? (
        <video
          src={videoFile}
          controls
          className="videoPlayer"
        />
      ) : (
        <div className="emptyState">🎥 Sube un vídeo</div>
      )}

    </div>
  );
}