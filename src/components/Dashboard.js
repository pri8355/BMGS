import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Headerbs';
import './styles/Dashboard.css';
import StatsCard from './StatsCard';

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className="dashboard-container">
      <Sidebar isCollapsed={isCollapsed} />
      <div className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
        <Header toggleSidebar={toggleSidebar} />
        <div className="cards-container">
          <StatsCard title="Total Users" value="1,245" icon="FaUsers" />
          <StatsCard title="Revenue" value="$8,430" icon="FaDollarSign" />
          <StatsCard title="Orders" value="74" icon="FaBox" />
          <StatsCard title="Feedbacks" value="23" icon="FaComments" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
