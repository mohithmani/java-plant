import React, { useEffect, useState } from 'react';
import { getVolunteers, getDrives, getTrees, getCheckIns } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    volunteers: 0,
    drives: 0,
    trees: 0,
    checkIns: 0,
  });

  const [recentTrees, setRecentTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [vRes, dRes, tRes, cRes] = await Promise.all([
        getVolunteers(),
        getDrives(),
        getTrees(),
        getCheckIns(),
      ]);

      setStats({
        volunteers: vRes.data.length,
        drives: dRes.data.length,
        trees: tRes.data.length,
        checkIns: cRes.data.length,
      });

      setRecentTrees(tRes.data.slice(-5).reverse());
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="empty-state">Loading Dashboard...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">GreenTrack Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Volunteers</h3>
          <div className="count">{stats.volunteers}</div>
        </div>

        <div className="stat-card">
          <h3>Plantation Drives</h3>
          <div className="count">{stats.drives}</div>
        </div>

        <div className="stat-card">
          <h3>Trees Planted</h3>
          <div className="count">{stats.trees}</div>
        </div>

        <div className="stat-card">
          <h3>Total Check-Ins</h3>
          <div className="count">{stats.checkIns}</div>
        </div>
      </div>

      <div className="table-container">
        <div style={{ padding: '1rem 1.2rem', fontWeight: 'bold', borderBottom: '1px solid var(--border-color)' }}>
          Recently Planted Trees
        </div>
        {recentTrees.length === 0 ? (
          <div className="empty-state">No trees planted yet.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Species</th>
                <th>Location</th>
                <th>Date Planted</th>
              </tr>
            </thead>
            <tbody>
              {recentTrees.map((tree) => (
                <tr key={tree.id}>
                  <td>{tree.id}</td>
                  <td>{tree.species}</td>
                  <td>{tree.location}</td>
                  <td>{tree.datePlanted || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
