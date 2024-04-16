import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/slices/usersApiSlice.js";
import { setCredentials } from "../../redux/slices/authSlice.js";
import { toast } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth || {});
  const [login] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login({ ...formData }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
      toast.success("Logged in successfully");
    } catch (err) {
      let errorMessage = "An error occurred";
      if (err && err.data && err.data.error) {
        errorMessage = err.data.error;
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto  h-dvh max-w-7xl px-6 py-6 lg:px-6 -mt-12">
      <div className="py-16 m-12 justify-between gap-4 h-full ">
        <form
          className=" max-w-md min-w-96 m-auto flex flex-col gap-4 bg-white p-6 shadow-md mt-6 mb-0 px-8"
          onSubmit={handleSubmit}
        >
          <section className="  p-2 text-center mt-2 rounded-sm">
            <h1 className="text-2xl">Login</h1>
          </section>
          <section className="w-full flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="w-full p-2 border  rounded-sm"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </section>
          <section className="w-full flex flex-col gap-2 placeholder:text-gray-300 mb-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="w-full p-2 border placeholder:text-gray-300"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
            />
          </section>
          <hr />
          <button
            className="border p-2 w-full sm:w-full md:w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white font-medium  rounded-sm"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
