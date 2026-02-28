import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router";

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Create demo account if it doesn't exist
    const usersJson = localStorage.getItem("agentcy_users");
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    if (!users.find((u: any) => u.email === "demo@agentcy.com")) {
      users.push({
        id: "demo_user",
        name: "Demo User",
        email: "demo@agentcy.com",
        password: "demo123",
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("agentcy_users", JSON.stringify(users));
    }

    // Check if user is already logged in
    const storedUser = localStorage.getItem("agentcy_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get stored users
    const usersJson = localStorage.getItem("agentcy_users");
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Find user
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userToStore = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        createdAt: foundUser.createdAt,
      };
      localStorage.setItem("agentcy_user", JSON.stringify(userToStore));
      setUser(userToStore);
      return true;
    }

    return false;
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get existing users
    const usersJson = localStorage.getItem("agentcy_users");
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Check if email already exists
    if (users.some((u: any) => u.email === email)) {
      return false; // Email already registered
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password, // In production, this would be hashed
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("agentcy_users", JSON.stringify(users));

    // Auto-login after registration
    const userToStore = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.createdAt,
    };
    localStorage.setItem("agentcy_user", JSON.stringify(userToStore));
    setUser(userToStore);

    return true;
  };

  const logout = () => {
    localStorage.removeItem("agentcy_user");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}