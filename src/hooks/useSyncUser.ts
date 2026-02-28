/**
 * useSyncUser
 * Calls POST /api/users/sync once per session after the user signs in.
 * This ensures a local MongoDB record exists for every Clerk user.
 */
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import axiosInstance from "@/config/axios";

export function useSyncUser() {
  const { userId, isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userId) return;

    axiosInstance
      .post("/users/sync")
      .then(() => {
        console.log("[useSyncUser] User synced to DB.");
      })
      .catch((err) => {
        // Log but don't block the UI — sync can be retried on next load
        console.warn(
          "[useSyncUser] Sync failed:",
          err?.response?.data ?? err.message,
        );
      });
  }, [isLoaded, isSignedIn, userId]);
}
