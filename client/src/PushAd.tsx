// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// var HOST = '' || 'localhost'
// const socket = io(`http://${HOST}:3000/`);

// const PushAd: React.FC = () => {
//     const [room, setRoom] = useState("");

//     const pushAd = () => {
//         socket.emit("push_ad", {message: "Advertisement", room});
//         console.log(`Pushing to room: ${room}`);
//     };

//     const clearLocalStorage = () => {
//         socket.emit("push_clear_ad");
//     };

//     // useEffect(() => {
//     //     socket.on("receive_message", (data) => {
//     //         console.log(`Ad Received`);
//     //         alert(data.message);
//     //     });

//     //     return () => {
//     //         socket.off("receive_message");
//     //     };
//     // }, []);

//     return (
//         <div className="App">
//             <input placeholder='TV Group' onChange={(event) => setRoom(event.target.value)}/>
//             <button onClick={pushAd}>Push Advertisement</button>
//             <button onClick={clearLocalStorage}>Clear Storage</button>
//         </div>
//     )
// }

// export default PushAd;
