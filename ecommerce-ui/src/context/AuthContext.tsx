import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {

  email: string;

  role: string;
}

interface AuthContextType {

  user: User | null;

  token: string | null;

  loading: boolean;

  login: (
    token: string,
    user: User
  ) => void;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({
  children,
}: Props) => {

  const [token, setToken] =
    useState<string | null>(null);

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  // Load Auth From localStorage
  useEffect(() => {

    const savedToken =
      localStorage.getItem("token");

    const savedUser =
      localStorage.getItem("user");

    if (savedToken && savedUser) {

      setToken(savedToken);

      setUser(
        JSON.parse(savedUser)
      );

    }

    setLoading(false);

  }, []);

  // Login
  const login = (
    token: string,
    user: User
  ) => {

    setToken(token);

    setUser(user);

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

  };

  // Logout
  const logout = () => {

    setToken(null);

    setUser(null);

    localStorage.removeItem("token");

    localStorage.removeItem("user");

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );
};

// Custom Hook
export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }

  return context;
};