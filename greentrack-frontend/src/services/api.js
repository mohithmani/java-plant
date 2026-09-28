import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Volunteer API
export const getVolunteers = () => API.get('/api/volunteers');
export const createVolunteer = (data) => API.post('/api/volunteers', data);
export const updateVolunteer = (id, data) => API.put(`/api/volunteers/${id}`, data);
export const deleteVolunteer = (id) => API.delete(`/api/volunteers/${id}`);

// Plantation Drive API
export const getDrives = () => API.get('/api/drives');
export const createDrive = (data) => API.post('/api/drives', data);
export const updateDrive = (id, data) => API.put(`/api/drives/${id}`, data);
export const deleteDrive = (id) => API.delete(`/api/drives/${id}`);

// Tree API
export const getTrees = () => API.get('/api/trees');
export const createTree = (data) => API.post('/api/trees', data);
export const updateTree = (id, data) => API.put(`/api/trees/${id}`, data);
export const deleteTree = (id) => API.delete(`/api/trees/${id}`);

// Check-In API
export const getCheckIns = () => API.get('/api/check-ins');
export const createCheckIn = (data) => API.post('/api/check-ins', data);
export const updateCheckIn = (id, data) => API.put(`/api/check-ins/${id}`, data);
export const deleteCheckIn = (id) => API.delete(`/api/check-ins/${id}`);

export default API;
