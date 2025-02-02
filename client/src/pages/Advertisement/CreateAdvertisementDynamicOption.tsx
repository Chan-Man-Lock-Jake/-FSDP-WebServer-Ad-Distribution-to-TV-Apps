import React, { useRef, useState, useEffect } from "react";
import {
  Stage,
  Layer,
  Text,
  Image as KonvaImage,
  Transformer,
  Rect,
} from "react-konva";
import useImage from "use-image";

const TV_WIDTH = 900;
const TV_HEIGHT = 500;

const AdvertisementEditor: React.FC = () => {
  const stageRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<{
    id: string;
    text: string;
  } | null>(null);

  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [loadedImage] = useImage(imageURL || "");

  const [texts, setTexts] = useState<
    { id: string; text: string; x: number; y: number; fontSize: number }[]
  >([]);

  const [imageProps, setImageProps] = useState({
    id: "image",
    x: 50,
    y: 50,
    width: 250,
    height: 250,
  });

  const addNewText = () => {
    const newText = {
      id: `text-${texts.length + 1}`,
      text: "New Text",
      x: 100,
      y: 100,
      fontSize: 24,
    };
    setTexts([...texts, newText]);
  };

  const handleSelect = (id: string) => {
    setSelectedShapeId(id);
    setEditingText(null);
    const selectedNode =
      id === "image"
        ? stageRef.current.findOne("#uploaded-image")
        : stageRef.current.findOne(`#${id}`);

    if (trRef.current && selectedNode) {
      trRef.current.nodes([selectedNode]);
      trRef.current.getLayer()?.batchDraw();
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (editingText) {
      setEditingText({ ...editingText, text: event.target.value });
      setTexts((prevTexts) =>
        prevTexts.map((txt) =>
          txt.id === editingText.id ? { ...txt, text: event.target.value } : txt
        )
      );
    }
  };

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

  useEffect(() => {
    if (editingText) {
      const textNode = stageRef.current?.findOne(`#${editingText.id}`);
      if (textNode) {
        const stageBox = stageRef.current.container().getBoundingClientRect();
        const textPosition = textNode.getAbsolutePosition();

        const textarea =
          document.querySelector<HTMLTextAreaElement>("#editing-textarea");
        if (textarea) {
          textarea.style.top = `${textPosition.y + stageBox.top}px`;
          textarea.style.left = `${textPosition.x + stageBox.left}px`;
          textarea.style.fontSize = `${textNode.fontSize()}px`;
          textarea.style.width = `${textNode.width()}px`;
          textarea.style.height = `${textNode.height()}px`;
        }
      }
    }
  }, [editingText]);

  return (
    <div>
      <p>Advertisement Editor</p>

      <Stage
        ref={stageRef}
        width={TV_WIDTH}
        height={TV_HEIGHT}
        style={{ backgroundColor }}
      >
        <Layer>
          <Rect width={TV_WIDTH} height={TV_HEIGHT} fill={backgroundColor} />

          {imageURL && (
            <KonvaImage
              id="uploaded-image"
              image={loadedImage}
              x={imageProps.x}
              y={imageProps.y}
              width={imageProps.width}
              height={imageProps.height}
              draggable
              onClick={() => handleSelect("image")}
              onTap={() => handleSelect("image")}
            />
          )}

          {texts.map((txt) => (
            <Text
              key={txt.id}
              id={txt.id}
              text={txt.text}
              x={txt.x}
              y={txt.y}
              fontSize={txt.fontSize}
              fill="black"
              draggable
              onClick={() => handleSelect(txt.id)}
              onTap={() => handleSelect(txt.id)}
              onDblClick={() => setEditingText(txt)}
            />
          ))}
          <Transformer ref={trRef} />
        </Layer>
      </Stage>

      {editingText && (
        <textarea
          id="editing-textarea"
          value={editingText.text}
          onChange={handleTextChange}
          style={{
            position: "absolute",
            zIndex: 2,
            background: "white",
            border: "1px solid black",
            resize: "none",
          }}
        />
      )}

      <div>
        <button onClick={handleStorageSelection}>Upload Image</button>
        <button onClick={addNewText}>Add Text</button>
        <input
          type="color"
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AdvertisementEditor;
