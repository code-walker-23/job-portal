import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/Landing";
import OnBoarding from "./pages/OnBoarding";
import Job from "./pages/Job";
import JobListing from "./pages/JobListing";
import PostJob from "./pages/PostJob";
import SavedJobs from "./pages/SavedJobs";
import MyJobs from "./pages/MyJobs";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoutes from "./components/ProtectedRoutes";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoutes>
            <OnBoarding />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoutes>
            <JobListing />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoutes>
            <Job />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/post-jobs",
        element: (
          <ProtectedRoutes>
            <PostJob />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoutes>
            <SavedJobs />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoutes>
            <MyJobs />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
