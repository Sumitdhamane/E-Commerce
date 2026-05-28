import {
  Navigate,
} from "react-router-dom";

import { useAuth }
from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({
  children,
}: Props) => {

  const {
    token,
    loading,
  } = useAuth();

  // Wait until auth loads
  if (loading) {

    return (

      <h1
        className="
          text-white
          text-3xl
          p-10
        "
      >
        Loading...
      </h1>

    );

  }

  // No Token
  if (!token) {

    return (
      <Navigate to="/login" />
    );

  }

  // Authorized
  return children;
};

export default ProtectedRoute;