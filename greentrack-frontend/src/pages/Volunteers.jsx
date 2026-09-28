import React, { useEffect, useState } from 'react';
import { getVolunteers, createVolunteer, updateVolunteer, deleteVolunteer } from '../services/api';

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    loadVolunteers();
  }, []);

  const loadVolunteers = async () => {
    try {
      setLoading(true);
      const res = await getVolunteers();
      setVolunteers(res.data);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: '', email: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (volunteer) => {
    setEditingId(volunteer.id);
    setFormData({ name: volunteer.name || '', email: volunteer.email || '' });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this volunteer?')) {
      try {
        await deleteVolunteer(id);
        loadVolunteers();
      } catch (error) {
        console.error('Error deleting volunteer:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateVolunteer(editingId, formData);
      } else {
        await createVolunteer(formData);
      }
      setShowModal(false);
      loadVolunteers();
    } catch (error) {
      console.error('Error saving volunteer:', error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Volunteers</h1>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          + Add Volunteer
        </button>
      </div>

      {loading ? (
        <div className="empty-state">Loading volunteers...</div>
      ) : (
        <div className="table-container">
          {volunteers.length === 0 ? (
            <div className="empty-state">No volunteers found. Click Add Volunteer to create one.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((v) => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.name}</td>
                    <td>{v.email}</td>
                    <td>
                      <button className="btn btn-edit" onClick={() => handleOpenEdit(v)}>
                        Edit
                      </button>
                      <button className="btn btn-delete" onClick={() => handleDelete(v.id)}>
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
              {editingId ? 'Edit Volunteer' : 'Add New Volunteer'}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

export default Volunteers;
