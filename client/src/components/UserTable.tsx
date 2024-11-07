import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface UserTableProps {
  userData: Array<{
    name: string;
    email: string;
    company: string;
    role: string;
    dateJoined: string;
  }>;
}

const UserTable: React.FC<UserTableProps> = ({ userData }) => {
  return (
    <div className="user-table-container">
      <table className="table table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Company</th>
            <th scope="col">Role</th>
            <th scope="col">Date Joined</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.company}</td>
              <td>{user.role}</td>
              <td>{user.dateJoined}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary">Edit</button>
                <button className="btn btn-sm btn-outline-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
    