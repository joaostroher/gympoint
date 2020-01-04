import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

function setAuthorization(token) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export { setAuthorization };
export default api;
