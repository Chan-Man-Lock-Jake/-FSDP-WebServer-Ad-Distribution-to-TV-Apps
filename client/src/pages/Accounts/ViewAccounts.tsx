import React, { useState } from 'react';
import "./ViewAccounts.css";

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
      className={`px-4 py-2 rounded ${activeTab === value ? 'bg-teal-600 text-white' : 'bg-white'}`}
    >
      {label}
    </button>
  );

  const UserCard: React.FC<UserCardProps> = ({ user }) => (
    <div className="flex gap-4">
      <div className="w-1/4">
        <div className="bg-teal-600 text-white px-4 py-2 rounded">
          {user.name}
        </div>
      </div>
      <div className="w-3/4 bg-white rounded p-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <h3 className="font-medium mb-1">Name</h3>
            <p>{user.name}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Email</h3>
            <p>{user.email}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Contact No</h3>
            <p>{user.contactNo}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Projects</h3>
            {user.projects.map((project, index) => (
              <p key={index}>{project}</p>
            ))}
          </div>
          <div>
            <h3 className="font-medium mb-1">Date Joined</h3>
            <p>{user.dateJoined}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Last Login</h3>
            <p>{user.lastLogin}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <div className="bg-rose-50 rounded-lg shadow">
          <div className="p-4">
            <div className="flex gap-2 mb-6">
              <TabButton value="admins" label="Admins" />
              <TabButton value="operators" label="Operators" />
              <TabButton value="content-creators" label="Content Creators" />
            </div>
            <div className="h-screen">
              {users.map((user, index) => (
                <UserCard key={index} user={user} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;