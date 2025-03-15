import { NEXT_COOKIE_KEY } from "@/constants/auth";
import axios from "axios";
import { cookies } from "next/headers";

const baseURL = process.env.API_BASE_URL;
const isServer = typeof window === "undefined";

const httpClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(async (config) => {
  let token;
  if (isServer) {
    const cookieStore = await cookies();
    token = cookieStore.get(NEXT_COOKIE_KEY)?.value || "";

    config.headers["Authorization"] = token;
  } else {
    token = localStorage.getItem(NEXT_COOKIE_KEY) || "";
    config.headers["Authorization"] = token;
  }

  return config;
});

// httpClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem(NEXT_COOKIE_KEY);
//       try {
//         const { data } = await httpClient.post("/auth/me", {
//           token: refreshToken,
//         });

//         localStorage.setItem(NEXT_COOKIE_KEY, data.accessToken);
//         httpClient.defaults.headers.common[
//           "Authorization"
//         ] = `${data.accessToken}`;
//         return httpClient(originalRequest);
//       } catch (err) {
//         // Handle token refresh error (e.g., redirect to login)
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default httpClient;
