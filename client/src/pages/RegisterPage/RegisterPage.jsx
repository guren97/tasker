import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../slices/usersApiSlice.js";
import { setCredentials } from "../../slices/authSlice.js";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label.jsx";

import { toast } from "sonner";

const RegisterPage = () => {
  // State for storing form data
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const { userInfo } = useSelector((state) => state.auth);

  // Hook for navigation
  const navigate = useNavigate();

  // Redux dispatch hook
  const dispatch = useDispatch();

  // Mutation hook for register API
  const [register] = useRegisterMutation();

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
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Call register API mutation
      const res = await register({ ...formData }).unwrap();

      // Dispatch action to set user credentials in Redux store
      dispatch(setCredentials({ ...res }));

      // Navigate to dashboard page on successful registration
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
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleRegister}
        className="bg-white w-96 border rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <div className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
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
            autoComplete="off"
          />
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit">Register</Button>

          {/* Link to login page */}
          <Link to="/login" className="text-sm font-semibold">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
