import axios from "axios";

// Set base URL if needed
// axios.defaults.baseURL = "https://your-api-url.com"; // optional

// Add response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — 401");

      // 🔁 Optionally redirect to login or clear localStorage
      // window.location.href = '/login'; // or use your router
    }

    return Promise.reject(error); // Let the caller handle it too
  }
);

export default axios;
