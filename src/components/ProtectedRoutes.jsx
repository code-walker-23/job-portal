/* eslint-disable react/prop-types */
import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();

  if (isLoaded && !isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  if (
    isLoaded &&
    user &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" />;
  }
  if (
    isLoaded &&
    user &&
    user?.unsafeMetadata?.role &&
    pathname === "/onboarding"
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoutes;
