import React, { useEffect, useState } from 'react';
import { getCheckIns, createCheckIn, updateCheckIn, deleteCheckIn } from '../services/api';

const CheckIns = () => {
  const [checkIns, setCheckIns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ checkinDate: '', status: 'ALIVE', remarks: '' });

  useEffect(() => {
    loadCheckIns();
  }, []);

  const loadCheckIns = async () => {
    try {
      setLoading(true);
      const res = await getCheckIns();
      setCheckIns(res.data);
    } catch (error) {
      console.error('Error fetching check-ins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ checkinDate: '', status: 'ALIVE', remarks: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (c) => {
    setEditingId(c.id);
    setFormData({
      checkinDate: c.checkinDate || '',
      status: c.status || 'ALIVE',
      remarks: c.remarks || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this check-in?')) {
      try {
        await deleteCheckIn(id);
        loadCheckIns();
      } catch (error) {
        console.error('Error deleting check-in:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateCheckIn(editingId, formData);
      } else {
        await createCheckIn(formData);
      }
      setShowModal(false);
      loadCheckIns();
    } catch (error) {
      console.error('Error saving check-in:', error);
    }
  };

  const getStatusBadgeClass = (status) => {
    if (!status) return 'badge';
    const s = status.toLowerCase();
    return `badge badge-${s}`;
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Check-Ins</h1>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          + Add Check-In
        </button>
      </div>

      {loading ? (
        <div className="empty-state">Loading check-ins...</div>
      ) : (
        <div className="table-container">
          {checkIns.length === 0 ? (
            <div className="empty-state">No check-ins found. Click Add Check-In to record one.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Check-In Date</th>
                  <th>Status</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {checkIns.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.checkinDate || 'N/A'}</td>
                    <td>
                      <span className={getStatusBadgeClass(c.status)}>
                        {c.status}
                      </span>
                    </td>
                    <td>{c.remarks}</td>
                    <td>
                      <button className="btn btn-edit" onClick={() => handleOpenEdit(c)}>
                        Edit
                      </button>
                      <button className="btn btn-delete" onClick={() => handleDelete(c.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              {editingId ? 'Edit Check-In Record' : 'Add New Check-In Record'}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Check-In Date</label>
                <input
                  type="date"
                  className="form-control"
                  required
                  value={formData.checkinDate}
                  onChange={(e) => setFormData({ ...formData, checkinDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-control"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="ALIVE">ALIVE</option>
                  <option value="HEALTHY">HEALTHY</option>
                  <option value="NEEDS_WATER">NEEDS_WATER</option>
                  <option value="POOR">POOR</option>
                  <option value="DEAD">DEAD</option>
                </select>
              </div>

              <div className="form-group">
                <label>Remarks</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckIns;
