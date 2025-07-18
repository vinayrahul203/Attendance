
import React from 'react';
import API from '../api';

const subjects = ['Math', 'Science', 'English', 'History','Social'];

const SubjectList = () => {
  const markAttendance = async (subject, status) => {
  try {
    const res=await API.post('/attendance/mark', { subject, status });
    alert(res.data.message); 
  } catch (err) {
    console.error('Error marking attendance:', err.response?.data || err.message);
    alert('Failed to mark: ' + (err.response?.data?.message || err.message));
  }
};


  return (
    <div className="container">
      <h2>Mark Attendance</h2>
      {subjects.map((subject) => (
        <div className="subject-item" key={subject}>
          <span>{subject}</span>
          <div>
            <button onClick={() => markAttendance(subject, 'present')}>Present</button>{' '}
            <button onClick={() => markAttendance(subject, 'absent')} style={{ backgroundColor: '#dc3545' }}>
              Absent
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubjectList;
