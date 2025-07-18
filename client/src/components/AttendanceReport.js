import React, { useEffect, useState } from 'react';
import API from '../api';


const AttendanceReport = () => {
  const [report, setReport] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await API.get('/attendance/report');
        setReport(res.data);
      } catch (err) {
        console.error('Failed to fetch report:', err);
      }
    };
    fetchReport();
  }, []);

  const fetchHistory = async (subject) => {
    try {
      const res = await API.get(`/attendance/history/${subject}`);
      setHistory(res.data);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  return (
    <div>
      <h2>Attendance Report</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Total Days</th>
            <th>Present</th>
            <th>Absent</th>
            <th>Percentage</th>
            <th>History</th>
          </tr>
        </thead>
        <tbody>
          {report.map((item, index) => (
            <tr key={index}>
              <td>{item.subject}</td>
              <td>{item.total}</td>
              <td>{item.present}</td>
              <td>{item.absent}</td>
              <td>{((item.present / item.total) * 100).toFixed(2)}%</td>
              <td>
                <button onClick={() => fetchHistory(item.subject)}>View History</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* History Section */}
      {history.length > 0 && (
        <div>
          <h3>History for {history[0].subject}</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record, index) => (
                <tr key={index}>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceReport;
