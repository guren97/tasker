import { useSelector } from "react-redux";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="py-16 flex flex-col lg:flex-row lg:justify-between lg:gap-16">
      Dashboard
      <p>Welcome {userInfo.username}</p>
    </div>
  );
};

export default Dashboard;
