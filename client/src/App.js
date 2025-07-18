// src/App.js
import React from 'react';
import SubjectList from './components/SubjectList';
import AttendanceReport from './components/AttendanceReport';

import './styles.css';
const App = () => {
  return (
    <div style={{ 
    backgroundColor: '#F3E5F5',
      padding: '30px', 
      minHeight: '100vh' 
    }}>
      <div  style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>Mark Attendance</h2>
        <SubjectList />
        
        <hr style={{ margin: '40px 0' }} />
        
        <h2 style={{ textAlign: 'center' }}>Attendance Report</h2>
        <div style={{backgroundColor: 'white', display: 'flex', justifyContent: 'center' }}>
          <AttendanceReport />
        </div>
      </div>
    </div>
  );
};

export default App;
