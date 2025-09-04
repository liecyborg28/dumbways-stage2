/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      login("token_abc");
      navigate("/products");
    } else {
      setErrorMsg("username atau password salah!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white dark:bg-zinc-900 p-6 rounded shadow flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-5">Login</h1>
        <div className="w-full mb-3">
          <Label className="mb-1" htmlFor="username">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <Label className="mb-1" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMsg && <p>{errorMsg}</p>}
        <Button className="mt-5 w-full" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
