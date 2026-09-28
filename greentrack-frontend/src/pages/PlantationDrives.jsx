import React, { useEffect, useState } from 'react';
import { getDrives, createDrive, updateDrive, deleteDrive } from '../services/api';

const PlantationDrives = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', location: '', driveDate: '' });

  useEffect(() => {
    loadDrives();
  }, []);

  const loadDrives = async () => {
    try {
      setLoading(true);
      const res = await getDrives();
      setDrives(res.data);
    } catch (error) {
      console.error('Error fetching drives:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: '', location: '', driveDate: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (drive) => {
    setEditingId(drive.id);
    setFormData({
      name: drive.name || '',
      location: drive.location || '',
      driveDate: drive.driveDate || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this drive?')) {
      try {
        await deleteDrive(id);
        loadDrives();
      } catch (error) {
        console.error('Error deleting drive:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDrive(editingId, formData);
      } else {
        await createDrive(formData);
      }
      setShowModal(false);
      loadDrives();
    } catch (error) {
      console.error('Error saving drive:', error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Plantation Drives</h1>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          + Add Drive
        </button>
      </div>

      {loading ? (
        <div className="empty-state">Loading drives...</div>
      ) : (
        <div className="table-container">
          {drives.length === 0 ? (
            <div className="empty-state">No drives found. Click Add Drive to create one.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Drive Name</th>
                  <th>Location</th>
                  <th>Drive Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {drives.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.location}</td>
                    <td>{d.driveDate || 'N/A'}</td>
                    <td>
                      <button className="btn btn-edit" onClick={() => handleOpenEdit(d)}>
                        Edit
                      </button>
                      <button className="btn btn-delete" onClick={() => handleDelete(d.id)}>
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
              {editingId ? 'Edit Plantation Drive' : 'Add New Plantation Drive'}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Drive Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Drive Date</label>
                <input
                  type="date"
                  className="form-control"
                  required
                  value={formData.driveDate}
                  onChange={(e) => setFormData({ ...formData, driveDate: e.target.value })}
                />
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

export default PlantationDrives;
