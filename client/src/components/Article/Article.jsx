import { Link } from "react-router-dom";

const Article = () => {
  return (
    <section
      id="article"
      className="border shadow-sm md:w-full sm:w-full lg:w-4/6   shadow-slate-200 rounded-md p-6 bg-gray-50 hover:bg-white transition duration-300 ease-in-out transform mb-4 overflow-hidden"
    >
      <div
        id="article_details"
        className="flex flex-col md:flex-row items-center justify-between"
      >
        <div className="border-b w-full">
          <div className="flex-col-4">
            {" "}
            <Link to="/article" className="text-gray-700 hover:text-gray-950">
              <h1 className="text-normal font-medium text-blue-800  mb-1">
                Article Title
              </h1>
            </Link>
          </div>
          <div className="flex items-center justify-between mb-2  w-full md:w-3/4 lg:w-full">
            <span className="text-xs font-normal text-slate-600">
              Author: <span className="font-bold">Gwen</span>
            </span>
            <span className="text-xs font-normal text-slate-600 ">
              <span className="">April 14, 2024</span>
            </span>
          </div>
        </div>
      </div>

      <p className="w-full mt-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio
        explicabo in similique a quaerat nisi qui deleniti molestiae sunt
        pariatur doloremque officiis reprehenderit quis, distinctio aspernatur,
        perferendis numquam soluta error.
      </p>
    </section>
  );
};

export default Article;
