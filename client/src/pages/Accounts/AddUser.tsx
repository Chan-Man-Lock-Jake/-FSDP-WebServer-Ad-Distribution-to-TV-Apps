import React, { useState } from 'react';
import './AddUser.css';

export default function AddUserPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    company: '',
    password: '',
    role: 'Admin'
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('User Data:', formData);
    // Add user submission logic here
  };

  return (
    <div className="flex h-screen">
      <aside className="w-20 bg-gray-800 text-white flex flex-col items-center py-4">
        <div className="space-y-6">
          <div className="w-8 h-8 bg-gray-600 rounded" />
          <div className="w-8 h-8 bg-gray-600 rounded" />
          <div className="w-8 h-8 bg-gray-600 rounded" />
          <div className="w-8 h-8 bg-gray-600 rounded" />
        </div>
      </aside>

      <main className="flex-1 bg-gray-100 p-8">
        <h1 className="text-2xl font-semibold mb-6">Add Users</h1>

        <form className="bg-white p-6 rounded shadow-md grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2 border rounded" required />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full mt-1 p-2 border rounded" required />
          </div>

          <div>
            <label className="block text-gray-700">Contact No</label>
            <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="w-full mt-1 p-2 border rounded" required />
          </div>

          <div>
            <label className="block text-gray-700">Company</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full mt-1 p-2 border rounded" required />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full mt-1 p-2 border rounded" required />
          </div>

          <div>
            <label className="block text-gray-700">Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full mt-1 p-2 border rounded">
              <option value="Admin">Admin</option>
              <option value="Operator">Operator</option>
              <option value="Content Creator">Content Creator</option>
            </select>
          </div>

          <div className="col-span-2 flex justify-end">
            <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">Add User</button>
          </div>
        </form>
      </main>
    </div>
  );
}
