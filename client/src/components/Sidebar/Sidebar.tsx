import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Navbar: React.FC = () => {
    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar')
        const toggleButton = document.getElementById('toggle-btn')

        sidebar?.classList.toggle('close')
        toggleButton?.classList.toggle('rotate')

        Array.from(sidebar?.getElementsByClassName('show') || []).forEach(li => {
            li.classList.remove('show')
            li.previousElementSibling?.classList.remove('rotate')
        })

        Array.from(sidebar?.getElementsByClassName('active') || []).forEach(li => {
            if (li == document.getElementById('dashboard')) return;
            li.classList.remove('active')
        })

        toggleActive
    }

    const toggleSubmenu = (button: HTMLElement) => {
        const sidebar = document.getElementById('sidebar')

        if (sidebar?.classList.contains('close')) {
            toggleSidebar()
        }
        button.nextElementSibling?.classList.toggle('show')
        button.classList.toggle('rotate')
    }

    const toggleActive = (li: HTMLElement) => {
        const sidebar = document.getElementById('sidebar')

        Array.from(sidebar?.getElementsByClassName('active') || []).forEach(li => {
            li.classList.remove('active')
        })

        li.classList.toggle('active')
    }

    return (
        <nav id="sidebar">
            <ul>
                <li className="logo">
                    <svg version="1.1" viewBox="0 0 2048 595" width="138" height="40" xmlns="http://www.w3.org/2000/svg">
                    <path transform="translate(425,196)" d="m0 0h50l8 7 13 17 14 18 10 13 8 10 10 13 13 16 12 16 11 14 21 27-1 5-47 47-8 7-32 32-8 7-39 39-8 7-16 16-3 1-171-1-9-11-12-16-14-18-15-20-10-13-13-17-5-7-1-3v-96l4 2 12 17 9 11 10 13 16 21 7 9 16 21 21 28 13 17 1 1h117l5-3 22-22h2l1-3 8-7 25-25 8-7 34-34-2-5-14-18-11-14-12-15-12-16-9-11-6-8-2-1h-23l-8 4-14 13-11 9-10 10-11 9-11 10-4 2-12-13-7-8-10-11-7-8-3-3 1-4 11-9 10-9 8-7 16-15 14-12 11-10 8-7 1-1z" fill="#FEFEFE"/>
                    <path transform="translate(346,102)" d="m0 0h171l5 5 9 11 12 16 26 34 10 13 15 20 2 5v93l-2 2-7-8-10-14-11-14-13-17-14-19-12-15-36-48-4-3h-117l-23 23-8 7-45 45-8 7-8 8-5 6-7 5 2 5 13 16 9 12 14 18 11 14 10 13 6 8 4 3 24-1 9-6 14-12 14-13 8-7 13-12 7-6 4 1 7 7 9 11 9 9 7 9 5 6-1 4-10 8-16 15-14 12-12 11-8 7-11 10-9 6-18 1-61 1-5-4-8-11-10-13-22-28-14-18-33-42-13-17-11-14-5-7 7-8 10-9 35-35 8-7 34-34 8-7 25-25 8-7 22-22z" fill="#FEFEFE"/>
                    <path transform="translate(1274,199)" d="m0 0h43l4 5 14 32 19 45 14 33 12 28 30 71 3 8v8l-4 6-7 2h-218l-5-5-2-5 2-10 9-20 4-6 3-1h152l-8-20-35-84-8-18-2-2-5 15-16 38-13 31-8 18-5 6h-30l-8-1-5-6-1-4 4-12 13-30 11-26 23-54 11-26 7-14z" fill="#FEFEFE"/>
                    <path transform="translate(1470,198)" d="m0 0h51l20 1 3 3 2 5 1 10v14l-2 9-3 3-3 1h-58l8 18 19 48 13 33 8 19 1 4 2-1 11-29 12-30 22-56 15-38 6-11 2-2h36l7 3 1 2v7l-5 15-24 60-15 37-11 27-17 42-14 34-5 9-3 3-7 1h-30l-6-5-8-18-15-37-19-47-18-44-28-70-2-6 1-9 5-4z" fill="#FEFEFE"/>
                    <path transform="translate(785,198)" d="m0 0 6 1 4 5 1 3v28l-2 5-5 3-16 5-9 6-4 8v9l5 6 16 8 29 8 24 6 22 7 14 6 14 9 10 9 7 10 4 11 2 10v13l-3 16-4 9-6 9-9 10-13 9-15 6-18 5-7 1h-10l-4-4-2-6v-24l2-7 4-3 21-6 9-5 5-6 2-5v-8l-3-6v-2l-30-12-43-11-23-7-16-8-11-7-9-9-8-14-3-9-1-6v-13l3-14 5-12 8-11 8-8 13-8 12-5 16-4z" fill="#FEFEFE"/>
                    <path transform="translate(948,199)" d="m0 0h33l7 3 1 1 1 132 2 19 4 11 7 11 9 8 21 10 4 4 1 11v12l-2 12-5 6h-12l-15-5-16-8-10-8-10-9-8-10-9-16-5-14-3-14-2-25v-106l1-19 4-5z" fill="#FEFEFE"/>
                    <path transform="translate(1111,199)" d="m0 0h34l5 3 1 3v140l-3 20-4 14-8 16-10 13-9 9-12 9-17 8-16 5h-8l-5-6-1-2-1-11v-15l1-7 6-5 19-10 7-6 7-11 3-7 2-11 1-12v-88l1-42 3-5z" fill="#FEFEFE"/>
                    <path transform="translate(1681,390)" d="m0 0h161l7 2 3 5 1 5v24l-2 7-6 3-106 1h-60l-5-5-2-4-1-11v-13l2-9 4-4z" fill="#FEFEFE"/>
                    <path transform="translate(1677,199)" d="m0 0h170l5 4 1 6v19l-1 11-1 3-7 2h-167l-3-3-2-4-1-8v-19l3-9z" fill="#FEFEFE"/>
                    <path transform="translate(1684,294)" d="m0 0h140l9 1 4 2 2 5v27l-2 7-3 3-3 1-84 1h-64l-7-2-4-6-1-3v-27l3-6 4-2z" fill="#FEFEFE"/>
                    <path transform="translate(714,351)" d="m0 0h34l3 3 6 17 5 8 8 6 21 9 5 4v31l-3 6-3 3h-12l-12-3-16-6-11-6-12-11-8-9-8-16-4-13-1-5v-12l5-5z" fill="#FEFEFE"/>
                    <path transform="translate(823,199)" d="m0 0h7l17 4 17 7 13 9 8 8 7 10 6 14 3 10v12l-5 6-5 2h-30l-5-5-8-18-5-5-24-12-3-4v-27l3-8z" fill="#FEFEFE"/>
                    </svg>
                    <button onClick={() => toggleSidebar()} id="toggle-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m480-340 180-180-57-56-123 123-123-123-57 56 180 180Zm0 260q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    </button>
                </li>
                <li id="dashboard" className="active" onClick={(event) => toggleActive(event.currentTarget)}>
                    <Link to="dashboard">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h240v-560H200v560Zm320 0h240v-280H520v280Zm0-360h240v-200H520v200Z"/></svg>
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <button onClick={(event) => toggleSubmenu(event.currentTarget)} className="dropdown-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-320h80q0-33-23.5-56.5T200-400v80Zm142 0h58q0-83-58.5-141.5T200-520v58q59 0 100.5 41.5T342-320Zm120 0h58q0-66-25-124.5t-68.5-102Q383-590 324.5-615T200-640v58q109 0 185.5 76.5T462-320ZM320-120v-80H160q-33 0-56.5-23.5T80-280v-480q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v480q0 33-23.5 56.5T800-200H640v80H320ZM160-280h640v-480H160v480Zm0 0v-480 480Z"/></svg>
                        <span>TV Groups</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>
                    </button>
                    <ul className="sub-menu">
                        <div>
                            <li onClick={(event) => toggleActive(event.currentTarget)}><Link to={"./view-tv-group"}>View Existing Groups</Link></li>
                            <li onClick={(event) => toggleActive(event.currentTarget)}><Link to={"./create-tv-group"}>Create New Group</Link></li>
                        </div>
                    </ul>
                </li>
                <li>
                    <button onClick={(event) => toggleSubmenu(event.currentTarget)} className="dropdown-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M468-240q-96-5-162-74t-66-166q0-100 70-170t170-70q97 0 166 66t74 162l-84-25q-13-54-56-88.5T480-640q-66 0-113 47t-47 113q0 57 34.5 100t88.5 56l25 84Zm48 158q-9 2-18 2h-18q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v18q0 9-2 18l-78-24v-12q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h12l24 78Zm305 22L650-231 600-80 480-480l400 120-151 50 171 171-79 79Z"/></svg>
                        <span>Ad Campaigns</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>
                    </button>
                    <ul className="sub-menu">
                        <div>
                            <li onClick={(event) => toggleActive(event.currentTarget)}><a>View Existing Campaigns</a></li>
                            <li onClick={(event) => toggleActive(event.currentTarget)}><Link to="create-ad-campaign">Create New Campaign</Link></li>
                        </div>
                    </ul>
                </li>
                <li>
                    <button onClick={(event) => toggleSubmenu(event.currentTarget)} className="dropdown-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M320-320h480v-400H320v400Zm0 80q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg>
                        <span>Advertisements</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>
                    </button>
                    <ul className="sub-menu">
                        <div>
                            <li onClick={(event) => toggleActive(event.currentTarget)}><Link to="view-advertisement">View Advertisements</Link></li>
                            <li onClick={(event) => toggleActive(event.currentTarget)}><Link to="create-advertisement">Create Advertisement</Link></li>
                        </div>
                    </ul>
                </li>
                <li>
                <button onClick={(event) => toggleSubmenu(event.currentTarget)} className="dropdown-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
                        <span>User Management</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>
                    </button>
                    <ul className="sub-menu">
                        <div>
                            <li onClick={(event) => toggleActive(event.currentTarget)}><a>View Existing Users</a></li>
                            <li onClick={(event) => toggleActive(event.currentTarget)}><a>Add/Modify User</a></li>
                        </div>
                    </ul>
                </li>
                <li>
                    <a className="logout-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                        <span>Logout</span>
                    </a> 
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
