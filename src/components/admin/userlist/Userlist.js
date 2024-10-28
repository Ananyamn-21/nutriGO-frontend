

import React, { useState, useEffect } from "react";
import "./userlist.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
 
    fetch('http://localhost:8080/food/allusers') 
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const deleteUser = (id) => {
 
    fetch(`http://localhost:8080/food/user/delete/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
       
          setUsers(users.filter((user) => user._id !== id));
        } else {
          console.error('Failed to delete user');
        }
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  return (
    <div className="container">
      <h2>Manage Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4">No users available</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;

