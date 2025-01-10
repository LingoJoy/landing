import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

export const getToken = () =>
  localStorage.getItem("token");

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

instance.interceptors.request.use(
  async (config) => {
    const token = getToken();

    if (token) {
      setToken(token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// instance.interceptors.response.use(
//   response => response,
//   async error => {
//     if (error.response.status === 401) {
//       const newToken = await getToken();

//       if (newToken) {
//         setToken(newToken);
//         error.config.headers.Authorization = `Bearer ${newToken}`;
//       }
//       return instance(error.config);
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
