import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import DisplayAd from './DisplayAd';

var HOST = '' || 'localhost'
const socket = io(`http://${HOST}:3000/`);

const PushAd: React.FC = () => {
    const [room, setRoom] = useState("");
    const [fileName, setFileName] = useState("");
    const [image, setImage] = useState("");

    const pushAd = () => {
        socket.emit("push_ad", {message: image, room});
        console.log(`Pushing to room: ${room}`);
    };

    const clearLocalStorage = () => {
        socket.emit("push_clear_ad");
    };

    // useEffect(() => {
    //     socket.on("receive_message", (data) => {
    //         console.log(`Ad Received`);
    //         alert(data.message);
    //     });

    //     return () => {
    //         socket.off("receive_message");
    //     };
    // }, []);
    
    const handleFileUpload = (file) => {
        setFileName(file.name);
        setImage(URL.createObjectURL(file));
        // Can upload the file here, e.g., to an API or cloud storage
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) handleFileUpload(file);
    };
    
        const handleChange = (event) => {
        const file = event.target.files[0];
        if (file) handleFileUpload(file);
    };

    const App = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '50px',
    }

    const dragdropbox = {
        backgroundColor: '#aaa',
        display: 'flexbox',
        borderRadius: '10px',
        padding: '20px',
        width: '200px',
    }

    return (
        <div className="App" style={App}>
            <input placeholder='TV Group' onChange={(event) => setRoom(event.target.value)}/>
            <div>
            <button onClick={pushAd}>Push Advertisement</button>
            <button onClick={clearLocalStorage}>Clear Storage</button>
            </div>

            <input type="file" id="file-input" onChange={handleChange} />
            <div
            style={dragdropbox}
            className="drag-drop-box"
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            >
            <p>Drag & Drop a file here or click to select</p>
            {fileName && <div className="file-name">Uploaded File: {fileName}</div>}
            </div>
        </div>
    )
}

export default PushAd;
