import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

function setAuthorization(token) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export { setAuthorization };
export default api;
