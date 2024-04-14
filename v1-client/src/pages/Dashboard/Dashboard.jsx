import Header from "@/components/Header/Header.jsx";
import CreateTask from "@/components/TasksComponents/createTask.jsx";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <section className="w-2/12 border h-dvh">right</section>
        <section className="w-6/12">
          <div className="w-full items-center">
            <CreateTask />
          </div>
        </section>
        <section>left</section>
      </div>
    </>
  );
};

export default Dashboard;
