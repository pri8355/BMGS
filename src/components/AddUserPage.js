// AddUserPage.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Headerbs';
import './styles/AddUserPage.css';
import './styles/Dashboard.css'; // for shared layout styles
import { FaArrowLeft } from 'react-icons/fa';

const AddUserPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} />

      {/* Main content area */}
      <div className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Page content */}
        <div className="add-user-wrapper">
          <div className="add-user-card">
            <h2 className="form-title">
              <FaArrowLeft
                className="back-icon"
                onClick={() => window.history.back()}
              />
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
                <button type="submit" className="submit-btn">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddUserPage;
