import { useState, useEffect } from "react"; // Import React and useState
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCreateMutation } from "@/slices/taskApiSlice.js";
import { setTaskDetails } from "@/slices/taskSlice.js";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label.jsx";

import { toast } from "sonner";

const CreateTask = () => {
  // Rename the function to start with an uppercase letter

  const [formData, setFormData] = useState({ title: "", description: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [create] = useCreateMutation();

  useEffect(() => {
    if (!userInfo) {
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
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      // Call login API mutation
      const res = await create({ ...formData }).unwrap();
      // Dispatch action to set user credentials in Redux store
      dispatch(setTaskDetails({ ...res }));
      toast.success("Task created successfully");
    } catch (err) {
      let errorMessage = ""; // Default error message
      if (err && err.data && err.data.error) {
        errorMessage = err.data.error;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <div className="flex bg-white items-center justify-center ">
        <form
          onSubmit={handleAddTask}
          className="bg-white border w-96 rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-8">Create Task</h2>
          <div className="mb-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="description">Content</Label>
            <textarea
              className="flex h-10 w-full  rounded-sm border border-input bg-background px-3 py-2  text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:border-slate-900  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit">Create Task</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask; // Export the component
