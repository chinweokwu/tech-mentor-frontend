import axios from 'axios';

const createAPI = () => {
  // const baseURL = 'http://localhost:5000/api/user/';
  const baseURL = 'https://pink-better-chimpanzee.cyclic.app/api/user/';

  const api = axios.create({
    baseURL,
    withCredentials: true,
  });

  return api;
};

const api = createAPI();

export default api;