import React, { useState } from "react";
import "./CreateAdvertisementDynamicOption.css";

const AdvertisementEditor: React.FC = () => {
  const [background, setBackground] = useState<string>("#ffffff");
  const [text, setText] = useState<string>("");
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setBackground(`url(${fileUrl})`);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const toggleBold = () => setIsBold(!isBold);
  const toggleItalic = () => setIsItalic(!isItalic);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBackground(event.target.value);
  };

  const handleSave = () => {
    alert("Advertisement saved successfully!");
  };

  return (
    <div className="editor-container">
      <div className="tv-screen" style={{ background }}>
        <div
          className="screen-text"
          style={{
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
          }}
        >
          {text}
        </div>
      </div>

      <div className="controls">
        <label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <button className="control-button">Image/Video</button>
        </label>

        <label>
          <input
            type="color"
            onChange={handleColorChange}
            style={{ display: "none" }}
          />
          <button className="control-button">Colour</button>
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
          placeholder="Enter Text"
          value={text}
          onChange={handleTextChange}
        />
      </div>

      <div className="save-button">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AdvertisementEditor;
