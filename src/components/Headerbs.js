import React, { useState } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import './styles/Dashboard.css'; 

const Header = ({ toggleSidebar }) => {
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleUserPopup = () => {
    setShowUserPopup(prev => !prev);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    setShowUserPopup(false);
  };

  return (
    <div className="headers">
      <div className="left-section">
        <h3>BGMS</h3>
        <FaBars className="icon menu-icon" onClick={toggleSidebar} />
      </div>

      <div className="right-section">
    

        {/* User Icon and Popup */}
        <div className="user-icon-wrapper">
          <FaUserCircle className="icon user-icon" onClick={toggleUserPopup} />
          {showUserPopup && (
            <div className="user-popup professional">
              <div className="user-info">
                <div className="avatar-circle">
                  <FaUserCircle className="popup-user-avatar" />
                </div>
                <div className="user-details">
                  <span className="user-name">Admin</span>
                </div>
              </div>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;