import React, { useState } from 'react';
import './ViewAccounts.css'; 
interface User {
  name: string;
  email: string;
  contactNo: string;
  projects: string[];
  dateJoined: string;
  lastLogin: string;
  role: string;
}

interface TabButtonProps {
  value: string;
  label: string;
}

interface UserCardProps {
  user: User;
}

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('content-creators');
  const [users] = useState<User[]>([{
    name: 'Arthur McArpants',
    email: 'arthurmcarpants@email.com',
    contactNo: '12345678',
    projects: ['tasty campaign', 'shake shack adv1'],
    dateJoined: '20/5/24',
    lastLogin: '10/1/25 10:15am',
    role: 'Content Creator'
  }]);

  const TabButton: React.FC<TabButtonProps> = ({ value, label }) => (
    <button 
      onClick={() => setActiveTab(value)}
      className={`tab-button ${activeTab === value ? 'active' : ''}`}
    >
      {label}
    </button>
  );

  const UserCard: React.FC<UserCardProps> = ({ user }) => (
    <div className="user-card">
      <div className="user-card-header">
        {user.name}
      </div>
      <div className="user-card-body">
        <div className="user-info">
          <div>
            <h3>Name</h3>
            <p>{user.name}</p>
          </div>
          <div>
            <h3>Email</h3>
            <p>{user.email}</p>
          </div>
          <div>
            <h3>Contact No</h3>
            <p>{user.contactNo}</p>
          </div>
          <div>
            <h3>Projects</h3>
            {user.projects.map((project, index) => (
              <p key={index}>{project}</p>
            ))}
          </div>
          <div>
            <h3>Date Joined</h3>
            <p>{user.dateJoined}</p>
          </div>
          <div>
            <h3>Last Login</h3>
            <p>{user.lastLogin}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="tab-buttons">
            <TabButton value="admins" label="Admins" />
            <TabButton value="operators" label="Operators" />
            <TabButton value="content-creators" label="Content Creators" />
          </div>
        </div>
        <div className="user-list">
          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;