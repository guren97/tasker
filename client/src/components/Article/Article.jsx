import { Link } from "react-router-dom";

const Article = () => {
  return (
    <section
      id="article"
      className="border shadow-sm md:w-full sm:w-full lg:w-full shadow-slate-200 rounded-md p-6 bg-gray-50 hover:bg-white transition duration-300 ease-in-out transform mb-4 overflow-hidden"
    >
      <section
        id="article_details"
        className="flex flex-col md:flex-row items-center justify-between "
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
          <div className="flex items-center justify-between mb-1 w-full md:w-3/4 lg:w-full">
            <span className="text-xs font-normal text-slate-600">
              Author: <span className="font-bold">Gwen</span>
            </span>
            <span className="text-xs font-normal text-slate-600 ">
              <span className="">April 14, 2024</span>
            </span>
          </div>
        </div>
      </section>

      <section id="article_content" className="py-1 mb-4">
        <p className="w-full mt-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio
          explicabo in similique a quaerat nisi qui deleniti molestiae sunt
          pariatur doloremque officiis reprehenderit quis, distinctio
          aspernatur, perferendis numquam soluta error.
        </p>
      </section>
      <section className="flex justify-end ">
        <div>
          <span className="text-xs">Tags: </span>
          <button className="  mb-2 px-2  py-1 border rounded-md text-xs hover:bg-gray-200">
            <span className="text-xs">category</span>
          </button>
        </div>
      </section>
    </section>
  );
};

export default Article;
