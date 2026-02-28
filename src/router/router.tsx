import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router";
import { useEffect } from "react";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/layout";
import LandingPage from "@/components/landing/LandingPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";

function Root() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <TooltipProvider delayDuration={300}>
      <Outlet />
    </TooltipProvider>
  );
}

/** Redirect signed-in users away from landing to /app */
function LandingGuard() {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) return null;
  if (isSignedIn) return <Navigate to="/app" replace />;
  return <LandingPage />;
}

/** Protect /app — redirect unauthenticated users to sign-in */
function ProtectedApp() {
  return (
    <>
      <SignedIn>
        <Layout />
      </SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace />
      </SignedOut>
    </>
  );
}

function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground flex-col gap-4">
      <p className="text-6xl font-bold text-primary">404</p>
      <p className="text-lg text-muted-foreground">Page not found</p>
      <a href="/" className="text-sm text-primary underline underline-offset-4">
        Go home
      </a>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <LandingGuard /> },
      { path: "app", element: <ProtectedApp /> },
      { path: "sign-in/*", element: <SignInPage /> },
      { path: "sign-up/*", element: <SignUpPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
