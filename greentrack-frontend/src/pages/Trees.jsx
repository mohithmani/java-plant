import React, { useEffect, useState } from 'react';
import { getTrees, createTree, updateTree, deleteTree } from '../services/api';

const Trees = () => {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ species: '', location: '', datePlanted: '' });

  useEffect(() => {
    loadTrees();
  }, []);

  const loadTrees = async () => {
    try {
      setLoading(true);
      const res = await getTrees();
      setTrees(res.data);
    } catch (error) {
      console.error('Error fetching trees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ species: '', location: '', datePlanted: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (tree) => {
    setEditingId(tree.id);
    setFormData({
      species: tree.species || '',
      location: tree.location || '',
      datePlanted: tree.datePlanted || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tree?')) {
      try {
        await deleteTree(id);
        loadTrees();
      } catch (error) {
        console.error('Error deleting tree:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateTree(editingId, formData);
      } else {
        await createTree(formData);
      }
      setShowModal(false);
      loadTrees();
    } catch (error) {
      console.error('Error saving tree:', error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Trees</h1>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          + Add Tree
        </button>
      </div>

      {loading ? (
        <div className="empty-state">Loading trees...</div>
      ) : (
        <div className="table-container">
          {trees.length === 0 ? (
            <div className="empty-state">No trees found. Click Add Tree to record one.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Species</th>
                  <th>Location</th>
                  <th>Date Planted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trees.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.species}</td>
                    <td>{t.location}</td>
                    <td>{t.datePlanted || 'N/A'}</td>
                    <td>
                      <button className="btn btn-edit" onClick={() => handleOpenEdit(t)}>
                        Edit
                      </button>
                      <button className="btn btn-delete" onClick={() => handleDelete(t.id)}>
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
              {editingId ? 'Edit Tree Record' : 'Add New Tree Record'}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Species</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={formData.species}
                  onChange={(e) => setFormData({ ...formData, species: e.target.value })}
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
                <label>Date Planted</label>
                <input
                  type="date"
                  className="form-control"
                  required
                  value={formData.datePlanted}
                  onChange={(e) => setFormData({ ...formData, datePlanted: e.target.value })}
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

export default Trees;
