/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/button";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./hooks/auth";
import Login from "./pages/Login";
import PrivateRoute from "./lib/PrivateRoute";
import ThemeToggle from "./components/ui/ThemeToggle";
import Favorites from "./pages/Favorites";

function Navbar() {
  const { token, logout } = useAuth();
  return (
    <div className="w-full flex gap-4 p-4 justify-center border-b mb-8 fixed bg-slate-900">
      <Button asChild variant="outline">
        <Link to="/">Home</Link>
      </Button>
      {token && (
        <Button asChild variant="outline">
          <Link to="/movies">Movies</Link>
        </Button>
      )}
      {token && (
        <Button asChild variant="outline">
          <Link to="/favorites">Favorites</Link>
        </Button>
      )}
      {token ? (
        <Button onClick={logout} variant="destructive">
          Logout
        </Button>
      ) : (
        <Button asChild variant="outline">
          <Link to="/login">Login</Link>
        </Button>
      )}
      <ThemeToggle />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/movies"
            element={
              <PrivateRoute>
                <Movies />
              </PrivateRoute>
            }></Route>

          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }></Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
