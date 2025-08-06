import React, { useState } from 'react';
import './styles/ViewUsersPage.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { AiOutlineDelete } from "react-icons/ai";
import Header from './Headerbs';
import { FaPlus, FaEye, FaEdit} from 'react-icons/fa';

const ViewUsersPage = () => {
  const navigate = useNavigate();

  const allUsers = [
    { id: 1, fullName: 'Priya Sharma', email: 'priya@example.com', registeredAt: '2024-06-10', lastLogin: '2025-08-01' },
    { id: 2, fullName: 'Rahul Verma', email: 'rahul@example.com', registeredAt: '2024-09-15', lastLogin: '2025-07-30' },
    { id: 3, fullName: 'Sneha Gupta', email: 'sneha@example.com', registeredAt: '2024-07-21', lastLogin: '2025-08-04' },
    { id: 4, fullName: 'Aman Singh', email: 'aman@example.com', registeredAt: '2024-05-10', lastLogin: '2025-07-25' },
    { id: 5, fullName: 'Neha Mehta', email: 'neha@example.com', registeredAt: '2024-11-01', lastLogin: '2025-08-03' },
  ];

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
const [userToEdit, setUserToEdit] = useState(null);

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    alert(`User "${userToDelete.fullName}" deleted!`);
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

const handleEditClick = (user) => {
  setUserToEdit(user);
  setShowEditModal(true);
};
  return (
    <div className="dashboard-wrapper">
      <Header />
      <div className="dashboard-body">
        <Sidebar isCollapsed={false} />
        <div className="main-content">
          <div className="user-details-container">
            <div className="user-details-header">
              <div className="heading-with-back">
                <h2>User Details</h2>
              </div>
              <button className="add-user-btn" onClick={() => navigate('/AddUserPage')}>
                <FaPlus /> Add User
              </button>
            </div>

            <table className="user-details-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Registered At</th>
                  <th>Last Login</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.registeredAt}</td>
                    <td>{user.lastLogin}</td>
                    <td>
                      <button className="action-icon view" onClick={() => handleViewClick(user)}><FaEye /></button>
                      <button className="action-icon delete" onClick={() => handleDeleteClick(user)}><AiOutlineDelete /></button>
                       <button className="action-icon edit" onClick={() => handleEditClick(user)}><FaEdit /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button disabled>&laquo; Prev</button>
              <span>Page 1 of 1</span>
              <button disabled>Next &raquo;</button>
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
     {showViewModal && selectedUser && (
  <div className="modal-overlay">
    <div className="modal-box view-form-box">
      <h3>User Information</h3>
      <form className="view-user-form">
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" value={selectedUser.fullName} readOnly />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" value={selectedUser.email} readOnly />
        </div>
        <div className="form-group">
          <label>Registered At</label>
          <input type="text" value={selectedUser.registeredAt} readOnly />
        </div>
        <div className="form-group">
          <label>Last Login</label>
          <input type="text" value={selectedUser.lastLogin} readOnly />
        </div>
        <div className="modal-buttons">
          <button type="button" className="confirm-btn" onClick={() => setShowViewModal(false)}>Close</button>
        </div>
      </form>
    </div>
  </div>
)}

      {/* Delete Modal */}
      {showDeleteModal && userToDelete && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirm Delete</h3>
            <p className="delete-par">Are you sure you want to delete <strong>{userToDelete.fullName}</strong>?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="confirm-btn"onClick={() => setShowDeleteModal(false)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && userToEdit && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>Edit User</h3>
      <form className="edit-user-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={userToEdit.fullName}
            onChange={(e) =>
              setUserToEdit({ ...userToEdit, fullName: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={userToEdit.email}
            onChange={(e) =>
              setUserToEdit({ ...userToEdit, email: e.target.value })
            }
          />
        </div>
        <div className="modal-buttons">
          <button
            className="submit-btn"
            onClick={(e) => {
              e.preventDefault();
              setShowEditModal(false); // dummy update
            }}
          >
            Update
          </button>
          <button
            className="cancel-btn"
            onClick={(e) => {
              e.preventDefault();
              setShowEditModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default ViewUsersPage;
