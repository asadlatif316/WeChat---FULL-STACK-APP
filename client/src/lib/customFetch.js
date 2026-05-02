import axios from 'axios';

const customFetch = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:4200/api/v1'
      : '/api/v1',
  withCredentials: true,
});
export default customFetch;
