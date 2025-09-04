import type { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
