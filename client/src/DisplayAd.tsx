import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import img from './assets/react.svg';

var HOST = '' || 'localhost'
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
            socket.emit("request_current_ad", room);
        }
    };

    const goFullscreen = () => {
        const adElement = document.getElementById('ad-image');
        if (adElement && adElement.requestFullscreen) {
            adElement.requestFullscreen();
        }
    };

    useEffect(() => {
        socket.on("display_ad", (data) => {
            //alert(data.message);
            setAdReceived(data.message);
            console.log("Ad recieved: ", data)
            localStorage.setItem('adReceived', data.message);
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

    const App = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '50px',
        marginBottom: '200px',
    }

    const section = {
        height: '60px',
        margin: '20px',
    }

    const input = {
        height: '100%',
    } 

    const button = {
        height: '100%',
    }

    const ad = {
        width: '100%',
        maxWidth: '800px', // limit width on regular screen
        cursor: 'pointer',
    }

    return (
        <div className="App" style={App}>
            <div style={section}>
            <input style={input} placeholder='TV Group' onChange={(event) => setRoom(event.target.value)}/>
            <button style={button} onClick={joinRoom}> Join Room</button>
            </div>
            {adReceived ? (
                <>
                    <img
                        id="ad-image"
                        src={adReceived}
                        alt="Received Ad"
                        style={ad}
                        onClick={goFullscreen} // Fullscreen on image click
                    />
                    <button onClick={goFullscreen}>Go Fullscreen</button>
                </>
            ) : (<p>No advertisement received</p>)}
        </div>
    )
}

export default DisplayAd;
