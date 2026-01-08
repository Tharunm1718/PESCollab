import React from 'react';
import Sidebar from './components/dashboard_components/Sidebar';
import MainContent from './components/dashboard_components/MainContent'; // <-- UPDATED
import { GlobalEffects } from './components/dashboard_components/useInteractiveEffects';
import './Dashboard.css';

const DashboardPage = () => {
  return (
    <> 
      <GlobalEffects /> 
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <MainContent /> 
      </div>
    </>
  );
};

export default DashboardPage;