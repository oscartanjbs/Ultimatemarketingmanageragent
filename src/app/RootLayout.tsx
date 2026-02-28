import { Outlet } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import DisclaimerDialog from "./components/DisclaimerDialog";

export default function RootLayout() {
  return (
    <AuthProvider>
      <DisclaimerDialog />
      <Outlet />
    </AuthProvider>
  );
}