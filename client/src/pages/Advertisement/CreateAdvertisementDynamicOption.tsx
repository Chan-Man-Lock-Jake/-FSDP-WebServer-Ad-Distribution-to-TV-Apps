import React, { useRef, useState } from "react";
import {
  Stage,
  Layer,
  Text,
  Image as KonvaImage,
  Transformer,
} from "react-konva";
import useImage from "use-image";
import "./CreateAdvertisementDynamicOption.css";

const AdvertisementEditor: React.FC = () => {
  const stageRef = useRef<any>(null);
  const textRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [text, setText] = useState<string>("Your Advertisement Text");
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);

  const [textProps, setTextProps] = useState({
    x: 100,
    y: 200,
    fontSize: 28,
    width: 200,
  });

  const [imageProps, setImageProps] = useState({
    x: 50,
    y: 50,
    width: 200,
    height: 200,
  });

  // Load image dynamically
  const [loadedImage] = useImage(imageURL || "");

  // Handle image upload
  const handleStorageSelection = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event: any) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        setImageURL(fileUrl);
      }
    };
    input.click();
  };

  // Toggle text bold and italic
  const toggleBold = () => setIsBold(!isBold);
  const toggleItalic = () => setIsItalic(!isItalic);

  // Change background color
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(event.target.value);
  };

  // Handle object selection
  const handleSelect = (shape: string) => {
    setSelectedShape(shape);
    if (trRef.current) {
      trRef.current.nodes([
        shape === "image" ? imageRef.current : textRef.current,
      ]);
      trRef.current.getLayer()?.batchDraw();
    }
  };

  // Handle text dragging
  const handleTextDragMove = (e: any) => {
    setTextProps({ ...textProps, x: e.target.x(), y: e.target.y() });
  };

  // Handle text resizing
  const handleTextTransform = () => {
    const node = textRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    setTextProps({
      ...textProps,
      fontSize: textProps.fontSize * scaleX,
      width: textProps.width * scaleX,
    });
    node.scaleX(1);
    node.scaleY(1);
  };

  // Handle image dragging
  const handleImageDragMove = (e: any) => {
    setImageProps({ ...imageProps, x: e.target.x(), y: e.target.y() });
  };

  // Handle image resizing
  const handleImageTransform = () => {
    const node = imageRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    setImageProps({
      ...imageProps,
      width: imageProps.width * scaleX,
      height: imageProps.height * scaleY,
    });
    node.scaleX(1);
    node.scaleY(1);
  };

  // Handle save (export canvas as an image)
  const handleSave = () => {
    const stage = stageRef.current;
    const dataURL = stage.toDataURL(); // Export the canvas as an image
    console.log("Canvas exported as:", dataURL);
    alert("Advertisement saved successfully!");
  };

  return (
    <div className="editor-container">
      <p className="tv-title">Advertisement Editor</p>
      <Stage
        ref={stageRef}
        width={850}
        height={500}
        style={{
          border: "10px solid black",
          borderRadius: "10px",
          backgroundColor: backgroundColor,
          margin: "20px auto",
        }}
      >
        <Layer>
          {/* Render uploaded image */}
          {imageURL && (
            <>
              <KonvaImage
                ref={imageRef}
                image={loadedImage}
                x={imageProps.x}
                y={imageProps.y}
                width={imageProps.width}
                height={imageProps.height}
                draggable
                onClick={() => handleSelect("image")}
                onTap={() => handleSelect("image")}
                onDragMove={handleImageDragMove}
                onTransformEnd={handleImageTransform}
              />
              {selectedShape === "image" && <Transformer ref={trRef} />}
            </>
          )}

          {/* Render Text */}
          <Text
            ref={textRef}
            text={text}
            x={textProps.x}
            y={textProps.y}
            fontSize={textProps.fontSize}
            width={textProps.width}
            fontStyle={`${isBold ? "bold" : ""} ${isItalic ? "italic" : ""}`}
            fill="black"
            draggable
            onClick={() => handleSelect("text")}
            onTap={() => handleSelect("text")}
            onDragMove={handleTextDragMove}
            onTransformEnd={handleTextTransform}
          />
          {selectedShape === "text" && <Transformer ref={trRef} />}
        </Layer>
      </Stage>

      <div className="controls">
        <button className="control-button" onClick={handleStorageSelection}>
          Upload Image
        </button>

        <label>
          <input
            type="color"
            onChange={handleColorChange}
            style={{ display: "none" }}
          />
          <button className="control-button">Background Colour</button>
        </label>

        <button
          className={`control-button ${isBold ? "active" : ""}`}
          onClick={toggleBold}
        >
          B
        </button>

        <button
          className={`control-button ${isItalic ? "active" : ""}`}
          onClick={toggleItalic}
        >
          I
        </button>
      </div>

      <div className="text-input">
        <input
          type="text"
          placeholder="Enter Advertisement Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="save-button">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AdvertisementEditor;
