import Article from "../../components/Article/Article.jsx";
import { IoFilter } from "react-icons/io5";

const Home = () => {
  return (
    <div className="py-16 flex flex-col lg:flex-row lg:justify-between lg:gap-8">
      <section id="article_section" className="lg:w-3/4">
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
      </section>
      <section className="lg:w-1/4 border shadow-sm h-dvh bg-gray-50 rounded-md p-4">
        <h1 className="text-sm font-bold mb-3 flex justify-left items-center align-middle gap-2 border-b">
          <span>
            <IoFilter />
          </span>{" "}
          Filter
        </h1>

        <nav>
          <button
            to="/"
            className=" mb-1 px-2 py-1 rounded-sm text-xs hover:bg-gray-200"
          >
            filter btn
          </button>
          <button
            to="/"
            className=" mb-1 px-2 py-1 rounded-sm text-xs hover:bg-gray-200"
          >
            filter btn
          </button>
          <button
            to="/"
            className=" mb-1 px-2 py-1  rounded-sm text-xs hover:bg-gray-200"
          >
            filter btn
          </button>
        </nav>
      </section>
    </div>
  );
};

export default Home;
