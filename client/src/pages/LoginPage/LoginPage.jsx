import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice.js";
import { setCredentials } from "../../slices/authSlice.js";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label.jsx";

import { toast } from "sonner";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth || {});

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ ...formData }).unwrap();
      dispatch(setCredentials({ res }));
      navigate("/dashboard");
    } catch (err) {
      let errorMessage = ""; // Default error message
      if (err && err.data && err.data.error) {
        // If the error response contains an 'error' field
        errorMessage = err.data.error;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex bg-white items-center justify-center h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white border w-96 rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-8">Login</h2>
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="off" // Corrected autocomplete attribute
          />
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit">Sign In</Button>

          <Link to="/register" className="text-sm font-semibold">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
