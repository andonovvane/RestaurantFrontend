import axios from "axios";

const DEV_URL = "http://127.0.0.1:8000/";
const PROD_URL = "https://restaurant-app-test-4156e9523345.herokuapp.com/";

// Switch automatically depending on environment
export const API_BASE_URL =
    import.meta.env.MODE === "production" ? PROD_URL : DEV_URL;

export const api = axios.create({
    baseURL: API_BASE_URL,
});

// Separate axios instance ONLY for refresh
// No interceptors → prevents refresh-loop
const refreshClient = axios.create({
    baseURL: API_BASE_URL,
});

// Attach access token to all requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token && token !== "undefined" && token !== "null") {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
});


// Handle expired access tokens
api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        // Refresh ONLY when:
        // - 401 unauthorized
        // - First retry attempt
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const refresh = localStorage.getItem("refreshToken");

            if (!refresh) {
                console.warn("No refresh token — user must log in again.");
                return Promise.reject(error);
            }

            try {
                // Use standalone client: prevents interceptor loop
                const res = await refreshClient.post("/api/token/refresh/", {
                    refresh,
                });

                const newAccess = res.data.access;

                // Save new access token
                localStorage.setItem("accessToken", newAccess);

                // Attach new token
                originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

                // Retry original request
                return api(originalRequest);

            } catch (refreshError) {
                console.warn("Refresh token expired — logging out.");

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
