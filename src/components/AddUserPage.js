// AddUserPage.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Headerbs';
import './styles/AddUserPage.css';
import { FaArrowLeft } from 'react-icons/fa';
import './styles/Dashboard.css'; // For sidebar + header layout

const AddUserPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className="dashboard-container">
      <Sidebar isCollapsed={isCollapsed} />
      <div className="main-content">
        <Header toggleSidebar={toggleSidebar} />

        <div className="add-user-wrapper">
          <div className="add-user-card">
            <h2 className="form-title">
              <FaArrowLeft className="back-icon" onClick={() => window.history.back()} />
              Add New User
            </h2>
            <form className="add-user-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter full name" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label>Registered At</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Last Login</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <button type="submit" className="submit-btn">Create User</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddUserPage;
