import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import img from './assets/react.svg';

const socket = io("http://localhost:3000/");

function DisplayAd() {
    const [adReceived, setAdReceived] = useState("")

    const sendMessage = () => {
        socket.emit("send_message", {message: "Hello"});
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            alert(data.message);
        });

        socket.on("display_ad", (data) => {
            alert(data.message);
            setAdReceived(img);
        });
    }, [socket]);

    return (
        <div className="App">
            <input placeholder="Message..."/>
            <button onClick={sendMessage}>Send Message</button>
            <img src={img} alt="Received Ad"/>
            {adReceived && <img src={adReceived} alt="Received Ad"/>}
        </div>
    )
}

export default DisplayAd;
