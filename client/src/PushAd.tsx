import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000/");

export function PushAd() {
    const pushAd = () => {
        socket.emit("push_ad", {message: "Advertisement"});
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(`Ad Recieved`);
            alert(data.message);
        });
    }, [socket]);

    return (
        <div className="App">
            <button onClick={pushAd}>Push Advertisement</button>
        </div>
    )
}

export default PushAd;
