import React from 'react';
import { Outlet } from 'react-router-dom';
import "./PrivateLayout.css"
import Sidebar from '../../components/Sidebar/Sidebar';

const Dashboard: React.FC = () => {
    return (
        <div className='body'>
            <Sidebar/>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}

export default Dashboard;
