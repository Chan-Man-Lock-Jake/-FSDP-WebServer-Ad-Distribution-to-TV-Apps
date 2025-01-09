import React from 'react';
import "./Dashboard.css"
import Sidebar from '../components/Sidebar/Sidebar';
import Socket from '../pages/Socket/socket'

const Dashboard: React.FC = () => {
    return (
        <div className='body'>
            <Sidebar/>
            <main>
            </main>
        </div>
    );
}

export default Dashboard;
