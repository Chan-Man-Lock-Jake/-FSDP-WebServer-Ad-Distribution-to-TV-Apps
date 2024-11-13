import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import img from './assets/react.svg';

var HOST = '172.20.10.2' || 'localhost'
const socket = io(`http://${HOST}:3000/`);

const DisplayAd: React.FC = () => {
    const [room, setRoom] = useState("");
    const [currentRoom, setCurrentRoom] = useState<string | null>(null); 
    const [adReceived, setAdReceived] = useState<string | null>(localStorage.getItem('adReceived') || null);

    const joinRoom = () => {
        if (room !== "") {
            if (currentRoom && currentRoom !== room) {
                console.log(`Leaving room: ${currentRoom}`);
                socket.emit("leaveRoom", currentRoom);  // Notify server you're leaving the room
            }
            console.log(`Joining room: ${room}`);
            setCurrentRoom(room); // Update the current room state
            socket.emit("joinRoom", room)
        }
    };

    useEffect(() => {
        socket.on("display_ad", (data) => {
            //alert(data.message);
            setAdReceived(img);
            localStorage.setItem('adReceived', img);
        });

        socket.on("clear_ad", () => {
            localStorage.removeItem('adReceived');
            setAdReceived(null);
            console.log('LocalStorage cleared');
        });

        return () => {
            socket.off("display_ad");
            socket.off("clear_ad");
        };
    }, []);

    return (
        <div className="App">
            <input placeholder='TV Group' onChange={(event) => setRoom(event.target.value)}/>
            <button onClick={joinRoom}> Join Room</button>
            <img src={img} alt="Received Ad"/>
            {adReceived && <img src={adReceived} alt="Received Ad"/>}
        </div>
    )
}

export default DisplayAd;
