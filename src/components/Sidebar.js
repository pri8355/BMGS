import React, { useState } from 'react';
import {
  FaTachometerAlt,
  FaUsers,
  FaQuestionCircle,
  FaPlus,
  FaEye
} from 'react-icons/fa';
import './styles/Dashboard.css';

const Sidebar = ({ isCollapsed }) => {
  const [showQuestionSubmenu, setShowQuestionSubmenu] = useState(false);

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      {/* Always show BGMS text */}
      {/* <h2 className={`logo ${isCollapsed ? 'small-logo' : ''}`}>BGMS</h2> */}

      <ul className="menu-list">
        <li>
          <FaTachometerAlt />
          {!isCollapsed && <span>Dashboard</span>}
        </li>
        <li>
          <FaUsers />
          {!isCollapsed && <span>Users</span>}
        </li>

        <li
          onClick={() => setShowQuestionSubmenu(!showQuestionSubmenu)}
          style={{ cursor: 'pointer' }}
        >
          <FaQuestionCircle />
          {!isCollapsed && <span>Question</span>}
        </li>

        {!isCollapsed && showQuestionSubmenu && (
          <ul className="submenu">
            <li>
              <FaPlus /> <span>Add Question</span>
            </li>
            <li>
              <FaEye /> <span>View Question</span>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
