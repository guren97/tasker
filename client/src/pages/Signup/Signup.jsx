import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../redux/slices/usersApiSlice.js";
import { setCredentials } from "../../redux/slices/authSlice.js";
import { toast } from "sonner";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth || {});
  const [register] = useRegisterMutation();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await register({ ...formData }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
      toast.success("Registration successful");
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
    <main className="mx-auto  h-dvh max-w-7xl px-6 py-6 lg:px-6 -mt-16">
      <div className=" justify-between gap-4  ">
        <form
          className="max-w-md min-w-96 m-auto flex flex-col gap-4 bg-white p-6 shadow-md  mb-0 px-8 mt-16"
          onSubmit={handleSubmit}
        >
          <section className="  p-2 text-center mt-2 rounded-sm">
            <h1 className="text-2xl">Sign up</h1>
          </section>
          <section className="w-full flex flex-col gap-2">
            <label htmlFor="login">Username</label>
            <input
              id="username"
              className="w-full p-2 border  rounded-sm"
              type="text"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
            />
          </section>
          <section className="block lg:flex gap-6">
            <section className="w-full flex flex-col gap-2">
              <label htmlFor="login">First Name</label>
              <input
                id="first_name"
                className="w-full p-2 border  rounded-sm"
                type="text"
                placeholder="first name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </section>
            <section className="w-full flex flex-col gap-2">
              <label htmlFor="login">Last Name</label>
              <input
                id="last_name"
                className="w-full p-2 border  rounded-sm"
                type="text"
                placeholder="last name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </section>
          </section>
          <section className="w-full flex flex-col gap-2">
            <label htmlFor="login">Email</label>
            <input
              id="email"
              className="w-full p-2 border  rounded-sm"
              type="text"
              placeholder="email"
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
              placeholder="password"
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
            {loading ? "Registering user..." : "Registration successful"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Signup;
