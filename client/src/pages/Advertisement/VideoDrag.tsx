import React, { useRef, useState, useEffect } from "react";
import {
  Stage,
  Layer,
  Rect,
  Transformer,
  Image as KonvaImageComponent,
  Text as KonvaTextComponent,
} from "react-konva";
import Konva from "konva";
import { v4 as uuidv4 } from "uuid";
import "./DynamicTV.css";

interface VideoData {
  id: string;
  src: string; // Object URL for display
  file?: File;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  type: "video";
  videoElement: HTMLVideoElement;
}

interface ImageData {
  id: string;
  src: string;
  file?: File;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  type: "image";
  imageElement: HTMLImageElement;
}

interface TextData {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fontStyle: string;
  fill: string;
  rotation: number;
  width: number;
  height: number;
  type: "text";
}

type MediaData = VideoData | ImageData | TextData;

const ResizableDraggableMedia: React.FC = () => {
  // Refs
  const videoImageRef = useRef<Array<Konva.Node | null>>([]);
  const imgRef = useRef<Array<Konva.Node | null>>([]);
  const textRef = useRef<Array<Konva.Node | null>>([]);
  const trRef = useRef<Konva.Transformer>(null);
  const stageRef = useRef<Konva.Stage>(null);
  // Ref to store requestAnimationFrame ID for offscreen canvas updates.
  const rafIdRef = useRef<number>(0);
  // Hidden container to keep video elements in the DOM.
  const hiddenVideoContainerRef = useRef<HTMLDivElement>(null);

  // States
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [images, setImages] = useState<ImageData[]>([]);
  const [texts, setTexts] = useState<TextData[]>([]);
  const [selected, setSelected] = useState<MediaData | null>(null);
  // Accumulate blob URLs for cleanup on unmount.
  const blobUrlsRef = useRef<Set<string>>(new Set());
  const [stageSize, setStageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [backgroundColor, setBackgroundColor] = useState("#333");
  // This state holds the recorded video URL for preview.
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  // State for the confirmation popup.
  const [showPopup, setShowPopup] = useState(false);
  // State for advertisement details (from the popup form)
  const [adName, setAdName] = useState("");
  const [adPurpose, setAdPurpose] = useState("");
  // This state holds the ad type as selected in the popup ("draft" or "finalized")
  const [saveAs, setSaveAs] = useState("finalized");

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setStageSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // TV screen dimensions
  const TV_SCREEN_WIDTH = stageSize.width * 0.8;
  const TV_SCREEN_HEIGHT = stageSize.height * 0.8;
  const TV_SCREEN_X = (stageSize.width - TV_SCREEN_WIDTH) / 2;
  const TV_SCREEN_Y = (stageSize.height - TV_SCREEN_HEIGHT) / 2;

  // Drag boundaries
  const getDragBoundFunc = (type: "video" | "image" | "text", id: string) => {
    return (pos: { x: number; y: number }) => {
      let element: MediaData | undefined;
      if (type === "video") {
        element = videos.find((v) => v.id === id);
      } else if (type === "image") {
        element = images.find((img) => img.id === id);
      } else if (type === "text") {
        element = texts.find((txt) => txt.id === id);
      }
      if (!element) return pos;
      const elementWidth = element.width;
      const elementHeight = element.height;
      const maxX = TV_SCREEN_X + TV_SCREEN_WIDTH - elementWidth;
      const maxY = TV_SCREEN_Y + TV_SCREEN_HEIGHT - elementHeight;
      const minX = TV_SCREEN_X;
      const minY = TV_SCREEN_Y;
      const newX = Math.max(minX, Math.min(pos.x, maxX));
      const newY = Math.max(minY, Math.min(pos.y, maxY));
      return { x: newX, y: newY };
    };
  };

  // Record the canvas and upload video
  const handleRecordCanvasAndUpload = async () => {
    if (!stageRef.current) return;

    const layer = stageRef.current.findOne("Layer") as Konva.Layer | null;
    if (!layer) {
      alert("No layer found to record!");
      return;
    }
    const mainCanvas = layer.canvas._canvas as HTMLCanvasElement;
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = TV_SCREEN_WIDTH;
    offscreenCanvas.height = TV_SCREEN_HEIGHT;
    const offscreenCtx = offscreenCanvas.getContext("2d");
    if (!offscreenCtx) {
      alert("Failed to get 2D context from offscreen canvas.");
      return;
    }
    const ratio = window.devicePixelRatio || 1;
    const updateOffscreen = () => {
      offscreenCtx.clearRect(0, 0, TV_SCREEN_WIDTH, TV_SCREEN_HEIGHT);
      offscreenCtx.drawImage(
        mainCanvas,
        TV_SCREEN_X * ratio,
        TV_SCREEN_Y * ratio,
        TV_SCREEN_WIDTH * ratio,
        TV_SCREEN_HEIGHT * ratio,
        0,
        0,
        TV_SCREEN_WIDTH,
        TV_SCREEN_HEIGHT
      );
      rafIdRef.current = requestAnimationFrame(updateOffscreen);
    };
    updateOffscreen();

    const stream = offscreenCanvas.captureStream(60); // 30 fps
    const options = { mimeType: "video/webm; codecs=vp9" };
    let mediaRecorder: MediaRecorder;
    try {
      mediaRecorder = new MediaRecorder(stream, options);
    } catch (error) {
      alert("MediaRecorder error: " + (error as Error).message);
      console.error("MediaRecorder error:", error);
      cancelAnimationFrame(rafIdRef.current);
      return;
    }

    const chunks: Blob[] = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    mediaRecorder.onstop = async () => {
      cancelAnimationFrame(rafIdRef.current);
      const videoBlob = new Blob(chunks, { type: "video/webm" });
      const localUrl = URL.createObjectURL(videoBlob);
      setRecordedVideoUrl(localUrl);

      // Create a File from the Blob using adName for the file name.
      const videoFile = new File([videoBlob], `${adName}.webm`, {
        type: "video/webm",
      });

      // Build the FormData to call the API.
      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("fileName", `${adName}.webm`);

      alert("Saving advertisement...");

      try {
        const response = await fetch(
          "http://localhost:3000/admin/upload-finalized-ad",
          {
            method: "POST",
            body: formData,
            credentials: "include",
          }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} ${errorText}`);
        }
        const result = await response.json();
        alert("Advertisement video successfully saved!");
        console.log("Upload result:", result);
      } catch (err: any) {
        console.error("Upload error:", err);
        alert(`Error uploading video: ${err.message}`);
      }
    };

    mediaRecorder.start();
    setTimeout(() => {
      mediaRecorder.stop();
    }, 10000);
  };

  // Cleanup recorded video URL on unmount
  useEffect(() => {
    return () => {
      if (recordedVideoUrl) {
        URL.revokeObjectURL(recordedVideoUrl);
      }
    };
  }, [recordedVideoUrl]);

  // File upload handlers for videos and images
  const handleFileUploadHandler = (type: "video" | "image") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = type === "video" ? "video/*" : "image/*";
    input.multiple = true;
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        for (const file of Array.from(target.files)) {
          if (type === "video") {
            handleAddVideo(file);
          } else {
            handleAddImage(file);
          }
        }
      }
    };
    input.click();
  };

  const handleAddVideo = (file: File) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.addEventListener("ended", () => {
      video.currentTime = 0;
      video.play().catch(console.error);
    });
    if (hiddenVideoContainerRef.current) {
      hiddenVideoContainerRef.current.appendChild(video);
    }
    const blobUrl = URL.createObjectURL(file);
    blobUrlsRef.current.add(blobUrl);
    video.src = blobUrl;
    video.onloadedmetadata = () => {
      video.play().catch((err) => console.error("Video playback error:", err));
      const vidData: VideoData = {
        id: `video-${uuidv4()}`,
        src: blobUrl,
        file,
        x: TV_SCREEN_X + 50,
        y: TV_SCREEN_Y + 50,
        width: 300,
        height: 200,
        rotation: 0,
        type: "video",
        videoElement: video,
      };
      setVideos((prev) => [...prev, vidData]);
    };
    video.onerror = (err) => console.error("Error loading video:", err);
  };

  const handleAddImage = (file: File) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    const blobUrl = URL.createObjectURL(file);
    blobUrlsRef.current.add(blobUrl);
    img.src = blobUrl;
    img.onload = () => {
      const imageData: ImageData = {
        id: `image-${uuidv4()}`,
        src: blobUrl,
        file,
        x: TV_SCREEN_X + 50,
        y: TV_SCREEN_Y + 50,
        width: 300,
        height: 200,
        rotation: 0,
        type: "image",
        imageElement: img,
      };
      setImages((prev) => [...prev, imageData]);
    };
    img.onerror = (err) => console.error("Error loading image:", err);
  };

  const handleAddText = () => {
    const textObj: TextData = {
      id: `text-${uuidv4()}`,
      text: "Double-click to edit",
      x: TV_SCREEN_X + 150,
      y: TV_SCREEN_Y + 150,
      fontSize: 20,
      fontFamily: "Arial",
      fontStyle: "normal",
      fill: "#ffffff",
      rotation: 0,
      width: 200,
      height: 50,
      type: "text",
    };
    setTexts((prev) => [...prev, textObj]);
  };

  // Selection & transformation
  const handleDragMove = (
    e: Konva.KonvaEventObject<DragEvent>,
    type: "video" | "image" | "text",
    id: string
  ) => {
    const { x, y } = e.target.position();
    if (type === "video") {
      setVideos((prev) =>
        prev.map((vid) => (vid.id === id ? { ...vid, x, y } : vid))
      );
    } else if (type === "image") {
      setImages((prev) =>
        prev.map((img) => (img.id === id ? { ...img, x, y } : img))
      );
    } else {
      setTexts((prev) =>
        prev.map((txt) => (txt.id === id ? { ...txt, x, y } : txt))
      );
    }
  };

  const handleTransformEnd = (
    e: Konva.KonvaEventObject<Event>,
    type: "video" | "image" | "text" | "gif",
    id: string
  ) => {
    const node = e.target as Konva.Rect | Konva.Image | Konva.Text;
    const newWidth = node.width() * node.scaleX();
    const newHeight = node.height() * node.scaleY();
    const newRotation = node.rotation();
    node.scaleX(1);
    node.scaleY(1);
    if (type === "video") {
      setVideos((prev) =>
        prev.map((vid) =>
          vid.id === id
            ? {
                ...vid,
                width: newWidth,
                height: newHeight,
                rotation: newRotation,
              }
            : vid
        )
      );
    } else if (type === "image") {
      setImages((prev) =>
        prev.map((img) =>
          img.id === id
            ? {
                ...img,
                width: newWidth,
                height: newHeight,
                rotation: newRotation,
              }
            : img
        )
      );
    } else {
      setTexts((prev) =>
        prev.map((txt) =>
          txt.id === id
            ? {
                ...txt,
                width: newWidth,
                height: newHeight,
                rotation: newRotation,
              }
            : txt
        )
      );
    }
  };

  useEffect(() => {
    const transformer = trRef.current;
    if (!transformer) return;
    let node: Konva.Node | null = null;
    if (selected?.type === "video") {
      const idx = videos.findIndex((v) => v.id === selected.id);
      node = videoImageRef.current[idx] || null;
    } else if (selected?.type === "image") {
      const idx = images.findIndex((i) => i.id === selected.id);
      node = imgRef.current[idx] || null;
    } else if (selected?.type === "text") {
      const idx = texts.findIndex((t) => t.id === selected.id);
      node = textRef.current[idx] || null;
    }
    if (node) {
      transformer.nodes([node]);
      transformer.getLayer()?.batchDraw();
    } else {
      transformer.nodes([]);
      transformer.getLayer()?.batchDraw();
    }
  }, [selected, videos, images, texts]);

  // Text styling functions
  const toggleBold = () => {
    if (selected && selected.type === "text") {
      const isBold = selected.fontStyle.includes("bold");
      const newFontStyle = isBold
        ? selected.fontStyle.replace("bold", "").trim()
        : `${selected.fontStyle} bold`.trim();
      setTexts((prev) =>
        prev.map((t) =>
          t.id === selected.id ? { ...t, fontStyle: newFontStyle } : t
        )
      );
      setSelected((prev) =>
        prev ? { ...prev, fontStyle: newFontStyle } : prev
      );
    }
  };

  const toggleItalic = () => {
    if (selected && selected.type === "text") {
      const isItalic = selected.fontStyle.includes("italic");
      const newFontStyle = isItalic
        ? selected.fontStyle.replace("italic", "").trim()
        : `${selected.fontStyle} italic`.trim();
      setTexts((prev) =>
        prev.map((t) =>
          t.id === selected.id ? { ...t, fontStyle: newFontStyle } : t
        )
      );
      setSelected((prev) =>
        prev ? { ...prev, fontStyle: newFontStyle } : prev
      );
    }
  };

  const handleDblClickText = (text: TextData) => {
    setSelected(text);
    const newVal = prompt("Enter text:", text.text);
    if (newVal !== null) {
      setTexts((prev) =>
        prev.map((t) => (t.id === text.id ? { ...t, text: newVal } : t))
      );
    }
  };

  // Delete selected element
  const handleDelete = () => {
    if (!selected) return;
    if (selected.type === "video") {
      setVideos((prev) => prev.filter((v) => v.id !== selected.id));
    } else if (selected.type === "image") {
      setImages((prev) => prev.filter((i) => i.id !== selected.id));
    } else {
      setTexts((prev) => prev.filter((t) => t.id !== selected.id));
    }
    setSelected(null);
  };

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" && selected) {
        handleDelete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  // Animate Konva video (with block body for cleanup)
  useEffect(() => {
    const layer = stageRef.current?.findOne("Layer") as Konva.Layer | null;
    if (!layer) return;
    const anim = new Konva.Animation(() => {}, layer);
    anim.start();
    return () => {
      anim.stop();
    };
  }, [videos, images, texts]);

  // Ensure video autoplays
  useEffect(() => {
    const intervalId = setInterval(() => {
      videos.forEach((videoData) => {
        if (videoData.videoElement && videoData.videoElement.paused) {
          videoData.videoElement
            .play()
            .catch((err) => console.error("Auto-playback error:", err));
        }
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [videos]);

  // Handle Confirm Save in popup: record video and upload ad info to API
  const handleConfirmSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger canvas recording and video upload
    handleRecordCanvasAndUpload();

    // Build advertisement info from popup state.
    // Type is determined by the saveAs state ("draft" or "finalized")
    const adInfo = {
      Title: adName,
      Description: adPurpose,
      Type: saveAs,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/admin/upload-ad-info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adInfo),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      console.log("Ad info upload result:", result);
      alert("Advertisement details saved successfully!");
    } catch (error: any) {
      console.error("Error uploading ad info:", error);
      alert(`Error uploading ad info: ${error.message}`);
    }

    // Close the popup after processing
    setShowPopup(false);
  };

  // Render media elements
  const renderVideos = () =>
    videos.map((vid, idx) => (
      <KonvaImageComponent
        key={vid.id}
        x={vid.x}
        y={vid.y}
        width={vid.width}
        height={vid.height}
        rotation={vid.rotation}
        image={vid.videoElement}
        draggable
        dragBoundFunc={getDragBoundFunc("video", vid.id)}
        ref={(ref) => {
          if (ref) videoImageRef.current[idx] = ref;
        }}
        onDragMove={(e) => handleDragMove(e, "video", vid.id)}
        onClick={() => setSelected(vid)}
        onTransformEnd={(e) => handleTransformEnd(e, "video", vid.id)}
        cursor="move"
      />
    ));

  const renderImages = () =>
    images.map((img, idx) => (
      <KonvaImageComponent
        key={img.id}
        x={img.x}
        y={img.y}
        width={img.width}
        height={img.height}
        rotation={img.rotation}
        image={img.imageElement}
        draggable
        dragBoundFunc={getDragBoundFunc("image", img.id)}
        ref={(ref) => {
          if (ref) imgRef.current[idx] = ref;
        }}
        onDragMove={(e) => handleDragMove(e, "image", img.id)}
        onClick={() => setSelected(img)}
        onTransformEnd={(e) => handleTransformEnd(e, "image", img.id)}
        cursor="move"
      />
    ));

  const renderTexts = () =>
    texts.map((txt, idx) => (
      <KonvaTextComponent
        key={txt.id}
        x={txt.x}
        y={txt.y}
        text={txt.text}
        fontSize={txt.fontSize}
        fontFamily={txt.fontFamily}
        fontStyle={txt.fontStyle}
        fill={txt.fill}
        rotation={txt.rotation}
        width={txt.width}
        height={txt.height}
        draggable
        dragBoundFunc={getDragBoundFunc("text", txt.id)}
        ref={(ref) => {
          if (ref) textRef.current[idx] = ref;
        }}
        onDragMove={(e) => handleDragMove(e, "text", txt.id)}
        onClick={() => setSelected(txt)}
        onDblClick={() => handleDblClickText(txt)}
        onTransformEnd={(e) => handleTransformEnd(e, "text", txt.id)}
        cursor="move"
      />
    ));

  // Main render
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        ref={stageRef}
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) {
            setSelected(null);
          }
        }}
      >
        <Layer>
          <Rect
            x={TV_SCREEN_X}
            y={TV_SCREEN_Y}
            width={TV_SCREEN_WIDTH}
            height={TV_SCREEN_HEIGHT}
            fill={backgroundColor}
            stroke="#000"
            strokeWidth={10}
          />
          {renderVideos()}
          {renderImages()}
          {renderTexts()}
          <Transformer
            ref={trRef}
            rotateEnabled
            enabledAnchors={[
              "top-left",
              "top-right",
              "bottom-left",
              "bottom-right",
            ]}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 50 || newBox.height < 50) return oldBox;
              const tooFarLeft = newBox.x < TV_SCREEN_X;
              const tooFarTop = newBox.y < TV_SCREEN_Y;
              const tooFarRight =
                newBox.x + newBox.width > TV_SCREEN_X + TV_SCREEN_WIDTH;
              const tooFarBottom =
                newBox.y + newBox.height > TV_SCREEN_Y + TV_SCREEN_HEIGHT;
              if (tooFarLeft || tooFarTop || tooFarRight || tooFarBottom) {
                return oldBox;
              }
              return newBox;
            }}
          />
        </Layer>
      </Stage>

      {/* Hidden container for video elements */}
      <div
        ref={hiddenVideoContainerRef}
        style={{
          visibility: "hidden",
          position: "absolute",
          width: "1px",
          height: "1px",
        }}
      ></div>

      {/* Toolbar */}
      <div
        style={{
          position: "absolute",
          top: TV_SCREEN_Y + TV_SCREEN_HEIGHT + 20,
          left: TV_SCREEN_X,
          width: TV_SCREEN_WIDTH,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          background: "#fff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          padding: "10px 20px",
        }}
      >
        <button
          className="tv-button"
          onClick={() => handleFileUploadHandler("video")}
        >
          Upload Videos
        </button>
        <button
          className="tv-button"
          onClick={() => handleFileUploadHandler("image")}
        >
          Upload Images
        </button>
        <button className="tv-button" onClick={handleAddText}>
          Add Text
        </button>
        {selected?.type === "text" && (
          <>
            <button className="bold-button" onClick={toggleBold}>
              {selected.fontStyle.includes("bold") ? "Unbold" : "Bold"}
            </button>
            <button className="italic-button" onClick={toggleItalic}>
              {selected.fontStyle.includes("italic") ? "Unitalic" : "Italic"}
            </button>
            <div>
              <label className="font-size-label">Font Size:</label>
              <input
                type="number"
                value={selected.fontSize}
                onChange={(e) => {
                  const newVal = Math.max(8, Number(e.target.value));
                  setTexts((prev) =>
                    prev.map((t) =>
                      t.id === selected.id ? { ...t, fontSize: newVal } : t
                    )
                  );
                  setSelected((prev) =>
                    prev && prev.type === "text"
                      ? { ...prev, fontSize: newVal }
                      : prev
                  );
                }}
                style={{ width: "50px", textAlign: "center" }}
              />
            </div>
          </>
        )}
        {selected && (
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        )}
        <div>
          <label className="background-color-label">Background:</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </div>
      </div>

      {/* "Save Ad" Button: Trigger popup confirmation */}
      <div
        style={{
          position: "absolute",
          top: TV_SCREEN_Y + TV_SCREEN_HEIGHT + 80,
          left: TV_SCREEN_X,
          width: TV_SCREEN_WIDTH,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button className="save-ad-button" onClick={() => setShowPopup(true)}>
          Save Customized Ad
        </button>
      </div>

      {/* Popup Confirmation Modal */}
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p className="modal-header">Advertisement Details</p>
            <form onSubmit={handleConfirmSave}>
              <div className="form-group">
                <label htmlFor="adName" className="form-label">
                  <p className="form-name">Name</p>
                </label>
                <input
                  type="text"
                  id="adName"
                  className="form-title"
                  placeholder="Give your advertisement a name"
                  value={adName}
                  onChange={(e) => setAdName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="adPurpose" className="form-label">
                  <p className="form-name">Purpose (optional)</p>
                </label>
                <input
                  id="adPurpose"
                  className="form-purpose"
                  placeholder="What is the purpose of this advertisement?"
                  value={adPurpose}
                  onChange={(e) => setAdPurpose(e.target.value)}
                />
              </div>
              <div className="form-group">
                <p className="form-option">Save as:</p>
                <label>
                  <input
                    className="radio-input"
                    type="radio"
                    name="saveAs"
                    value="Finalized"
                    checked={saveAs === "Finalized"}
                    onChange={(e) => setSaveAs(e.target.value)}
                  />
                  <span>&nbsp;Finalized</span>
                </label>
                <label className="radio-label">
                  <input
                    className="radio-input"
                    type="radio"
                    name="saveAs"
                    value="Draft"
                    checked={saveAs === "Draft"}
                    onChange={(e) => setSaveAs(e.target.value)}
                  />
                  <span>&nbsp;Draft</span>
                </label>
              </div>
              <div className="modal-actions">
                <button type="submit" className="tv-confirm-button">
                  Confirm
                </button>
                <button
                  type="button"
                  className="tv-cancel-button"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Optional preview of recorded video */}
      {/* {recordedVideoUrl && (
        <div className="ad-preview-container" style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>Advertisement Preview</h3>
          <video src={recordedVideoUrl} controls autoPlay loop style={{ maxWidth: "100%" }} />
        </div>
      )} */}
    </div>
  );
};

export default ResizableDraggableMedia;
