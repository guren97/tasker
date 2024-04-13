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
  // State for storing form data
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { userInfo } = useSelector((state) => state.auth);

  // Hook for navigation
  const navigate = useNavigate();

  // Redux dispatch hook
  const dispatch = useDispatch();

  // Mutation hook for login API
  const [login] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.id]: e.target.value,
    }));
  };

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call login API mutation
      const res = await login({ ...formData }).unwrap();

      // Dispatch action to set user credentials in Redux store
      dispatch(setCredentials({ ...res }));

      // Navigate to dashboard page on successful login
      navigate("/dashboard");
    } catch (err) {
      let errorMessage = ""; // Default error message

      // Check if error response contains an 'error' field
      if (err && err.data && err.data.error) {
        errorMessage = err.data.error;
      }

      // Display error toast message
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

          {/* Link to register page */}
          <Link to="/register" className="text-sm font-semibold">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
