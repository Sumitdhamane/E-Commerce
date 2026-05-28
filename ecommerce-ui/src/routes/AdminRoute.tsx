import {
  Navigate,
} from "react-router-dom";

import { useAuth }
from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
}

const AdminRoute = ({
  children,
}: Props) => {

  const {
    user,
    loading,
  } = useAuth();

  // Wait for auth loading
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

  // Not Admin
  if (
    user?.role !== "admin"
  ) {

    return (
      <Navigate to="/" />
    );

  }

  // Admin Access
  return children;
};

export default AdminRoute;