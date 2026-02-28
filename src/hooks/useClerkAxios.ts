/**
 * useClerkAxios
 * Attaches the current Clerk session JWT as a Bearer token to every
 * outgoing request made through the shared axios instance.
 *
 * Call this hook once inside a component that is always mounted while
 * the user is signed in (e.g. Layout).
 */
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import axiosInstance from "@/config/axios";

export function useClerkAxios() {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (isSignedIn) {
          const token = await getToken();
          if (token) {
            config.headers = config.headers ?? {};
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Clean up when the component unmounts or auth state changes
    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [getToken, isSignedIn]);
}
