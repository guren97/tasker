import { useSelector } from "react-redux";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth || {});

  return (
    <>
      <section className="py-16 block lg:flex flex-col lg:align-middle lg:flex-row lg:justify-between lg:gap-16">
        <div className=" border rounded-md h-dvh md:w-6/12 lg:w-2/12 flex flex-col p-4 bg-white"></div>
      </section>
    </>
  );
};

export default Profile;
