import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";

interface MediaFile {
  type: "image" | "video" | "text";
  url?: string;
  id: string;
  width: number;
  height: number;
  position: { x: number; y: number };
  content?: string;
}

const Canvas: React.FC = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [newText, setNewText] = useState("");
  const [savedImageUrl, setSavedImageUrl] = useState<string | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (event.target.files) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }

      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const newMedia: MediaFile[] = [];
        data.files.forEach((file: { url: string; type: string }) => {
          newMedia.push({
            type: file.type.startsWith("video") ? "video" : "image",
            url: `http://localhost:3000${file.url}`,
            id: `${file.type}-${Date.now()}`,
            width: 300,
            height: 200,
            position: { x: 50, y: 50 },
          });
        });
        setMediaFiles((prev) => [...prev, ...newMedia]);
      } else {
        alert("Failed to upload files");
      }
    }
  };

  const handleAddText = () => {
    const newTextItem: MediaFile = {
      type: "text",
      content: newText,
      id: `text-${Date.now()}`,
      width: 200,
      height: 50,
      position: { x: 50, y: 50 },
    };
    setMediaFiles((prev) => [...prev, newTextItem]);
    setNewText("");
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    setIsDragging(true);
    setDraggedItemId(id);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && draggedItemId) {
      const box = boxRef.current;
      if (!box) return;

      const boxRect = box.getBoundingClientRect();
      const offsetX = e.clientX - boxRect.left;
      const offsetY = e.clientY - boxRect.top;

      setMediaFiles((prev) =>
        prev.map((media) =>
          media.id === draggedItemId
            ? {
                ...media,
                position: {
                  x: Math.min(
                    Math.max(0, offsetX - media.width / 2),
                    boxRect.width - media.width
                  ),
                  y: Math.min(
                    Math.max(0, offsetY - media.height / 2),
                    boxRect.height - media.height
                  ),
                },
              }
            : media
        )
      );
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedItemId(null);
  };

  const handleResize = (dimension: "width" | "height", value: number) => {
    setMediaFiles((prev) =>
      prev.map((media) =>
        media.id === selectedItemId ? { ...media, [dimension]: value } : media
      )
    );
  };

  const handleSaveToServer = async () => {
    if (!boxRef.current) return;

    await Promise.all(
      mediaFiles.map((media) => {
        if (media.type === "image" && media.url) {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = media.url;
            img.crossOrigin = "anonymous";
            img.onload = resolve;
            img.onerror = resolve;
          });
        }
        return Promise.resolve();
      })
    );

    const canvasElement = await html2canvas(boxRef.current, {
      useCORS: true,
    });
    const imageDataUrl = canvasElement.toDataURL("image/png");

    const response = await fetch("http://localhost:3000/saveCanvasImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageDataUrl }),
    });

    if (response.ok) {
      const data = await response.json();
      setSavedImageUrl(data.filePath);
      alert("Canvas saved on the server!");
    } else {
      alert("Failed to save the canvas to the server.");
    }
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        ref={boxRef}
        style={{
          width: "75vw",
          height: "85vh",
          border: "2px solid #000",
          marginTop: "20px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {mediaFiles.map((media) => (
          <div
            key={media.id}
            style={{
              position: "absolute",
              left: `${media.position.x}px`,
              top: `${media.position.y}px`,
              width: `${media.width}px`,
              height: `${media.height}px`,
              boxSizing: "border-box",
            }}
            onMouseDown={(e) => handleMouseDown(e, media.id)}
            onClick={() => setSelectedItemId(media.id)}
          >
            {media.type === "image" ? (
              <img
                src={media.url}
                alt="Uploaded"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : media.type === "video" ? (
              <video
                src={media.url}
                controls
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  fontSize: "18px",
                  fontWeight: "bold",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                {media.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", marginTop: "20px" }}>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleUpload}
        />
        <input
          type="text"
          placeholder="Enter text to add"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <button onClick={handleAddText}>Add Text</button>
        <button onClick={handleSaveToServer}>Save to Server</button>
      </div>

      {selectedItemId && (
        <div style={{ marginTop: "20px" }}>
          <h3>Edit Selected Item</h3>
          <label>Width: </label>
          <input
            type="range"
            min="50"
            max="800"
            value={
              mediaFiles.find((media) => media.id === selectedItemId)?.width ||
              100
            }
            onChange={(e) => handleResize("width", Number(e.target.value))}
          />
          <span>
            {mediaFiles.find((media) => media.id === selectedItemId)?.width} px
          </span>
          <br />
          <label>Height: </label>
          <input
            type="range"
            min="50"
            max="800"
            value={
              mediaFiles.find((media) => media.id === selectedItemId)?.height ||
              100
            }
            onChange={(e) => handleResize("height", Number(e.target.value))}
          />
          <span>
            {mediaFiles.find((media) => media.id === selectedItemId)?.height} px
          </span>
        </div>
      )}

      {savedImageUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Saved Screenshot:</h3>
          <img
            src={`http://localhost:3000${savedImageUrl}`}
            alt="Saved Screenshot"
            style={{ width: "75vw", border: "1px solid #ccc" }}
          />
        </div>
      )}
    </div>
  );
};

export default Canvas;
