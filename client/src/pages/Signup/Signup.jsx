import { useState } from "react";
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.id]: e.target.value,
    }));
  };
  console.log(formData);

  return (
    <main className="mx-auto  h-dvh max-w-7xl px-6 py-6 lg:px-6 -mt-14">
      <div className="py-16 m-12 justify-between gap-4 h-full ">
        <form
          className="  max-w-md min-w-96 m-auto flex flex-col gap-4 bg-white p-6 shadow-md  mb-0 px-8"
          action=""
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
          <section className="flex  gap-6">
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
          >
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
};

export default Signup;
