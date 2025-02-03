// import React, { useState } from 'react';
// import './AddUser.css';

// export default function AddUserPage() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     contact: '',
//     company: '',
//     password: '',
//     role: 'Admin'
//   });

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log('User Data:', formData);
//     // Add user submission logic here
//   };

//   return (
//     <div className="flex h-screen">
//       <aside className="w-20 bg-gray-800 text-white flex flex-col items-center py-4">
//         <div className="space-y-6">
//           <div className="w-8 h-8 bg-gray-600 rounded" />
//           <div className="w-8 h-8 bg-gray-600 rounded" />
//           <div className="w-8 h-8 bg-gray-600 rounded" />
//           <div className="w-8 h-8 bg-gray-600 rounded" />
//         </div>
//       </aside>

//       <main className="flex-1 bg-gray-100 p-8">
//         <h1 className="text-2xl font-semibold mb-6">Add Users</h1>

//         <form className="bg-white p-6 rounded shadow-md grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-gray-700">Name</label>
//             <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2 border rounded" required />
//           </div>

//           <div>
//             <label className="block text-gray-700">Email</label>
//             <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full mt-1 p-2 border rounded" required />
//           </div>

//           <div>
//             <label className="block text-gray-700">Contact No</label>
//             <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="w-full mt-1 p-2 border rounded" required />
//           </div>

//           <div>
//             <label className="block text-gray-700">Company</label>
//             <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full mt-1 p-2 border rounded" required />
//           </div>

//           <div>
//             <label className="block text-gray-700">Password</label>
//             <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full mt-1 p-2 border rounded" required />
//           </div>

//           <div>
//             <label className="block text-gray-700">Role</label>
//             <select name="role" value={formData.role} onChange={handleChange} className="w-full mt-1 p-2 border rounded">
//               <option value="Admin">Admin</option>
//               <option value="Operator">Operator</option>
//               <option value="Content Creator">Content Creator</option>
//             </select>
//           </div>

//           <div className="col-span-2 flex justify-end">
//             <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">Add User</button>
//           </div>
//         </form>
//       </main>
//     </div>
//   );
// }


import React, { useState } from 'react';
// import './AddUser.css';

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include' // for sending cookies
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const data = await response.json();
      console.log('Success:', data);
      
      // Clear form after success
      setFormData({
        name: '',
        email: '',
        contact: '',
        company: '',
        password: '',
        role: 'Admin'
      });
      
      alert('User created successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create user');
    }
  };

  return (
    <main className="bg-gray-100 p-8 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Add Users</h1>

      <form className="bg-white p-6 rounded shadow-md grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full mt-1 p-2 border rounded focus:border-teal-500 focus:ring focus:ring-teal-200" 
            required 
          />
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full mt-1 p-2 border rounded focus:border-teal-500 focus:ring focus:ring-teal-200" 
            required 
          />
        </div>

        <div>
          <label className="block text-gray-700">Contact No</label>
          <input 
            type="text" 
            name="contact" 
            value={formData.contact} 
            onChange={handleChange} 
            className="w-full mt-1 p-2 border rounded focus:border-teal-500 focus:ring focus:ring-teal-200" 
            required 
          />
        </div>

        <div>
          <label className="block text-gray-700">Company</label>
          <input 
            type="text" 
            name="company" 
            value={formData.company} 
            onChange={handleChange} 
            className="w-full mt-1 p-2 border rounded focus:border-teal-500 focus:ring focus:ring-teal-200" 
            required 
          />
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            className="w-full mt-1 p-2 border rounded focus:border-teal-500 focus:ring focus:ring-teal-200" 
            required 
          />
        </div>

        <div>
          <label className="block text-gray-700">Role</label>
          <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange} 
            className="w-full mt-1 p-2 border rounded focus:border-teal-500 focus:ring focus:ring-teal-200"
          >
            <option value="Admin">Admin</option>
            <option value="Operator">Operator</option>
            <option value="Content Creator">Content Creator</option>
          </select>
        </div>

        <div className="col-span-2 flex justify-end gap-4">
          <button 
            type="button" 
            onClick={() => {
              setFormData({
                name: '',
                email: '',
                contact: '',
                company: '',
                password: '',
                role: 'Admin'
              });
            }}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Clear
          </button>
          <button 
            type="submit" 
            className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Add User
          </button>
        </div>
      </form>
    </main>
  );
}